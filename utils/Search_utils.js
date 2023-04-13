import Fuse from 'fuse.js'
import { getValue, storeValue, removeValue } from './asyncstorage_utils'

const { API_URL } = require('../apiurl');

//GENERAL TODO
//Refine search parameters
//Add edgeguarding
//General testing
//Refactor dumb programming away
//Verify updates actually work
//Refactor to use only one data source (only use this.database or this.latestjobads?)

//Class for searching job advertisements, includes filtering
export default class Search {

    #defaultOptions = {
        // isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        // includeMatches: false,
        findAllMatches: true,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.1, // 0 = exact match, 1 = no match
        // distance: 100,
        useExtendedSearch: true,
        // ignoreLocation: true,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 2,

        //Default keys
        keys: [
            'title',
            'organization',
            'profitCenter',
            'jobDesc',
            'employment',
            'employmentType',
            'taskArea',
            'location',
            'region',
            'taskArea',
            'language'
        ]
    }

    //Constructor
    constructor() {
        console.log("---------------\nStarting to create a new search engine!" )
        //Start of construction for timing purposes
        this.startTime = Date.now();
        //Database for the search-index
        this.database = null;
        //Filtered database
        this.filteredDatabase = null;
        //Timestamp for the latest API query
        this.timestamp = null;
        //Index
        this.index = null;
        //Latest list of job advertisements
        this.latestJobAdvertisements = null;
        //Current applied filters
        this.currentFilters = null;
        //Initialize database
        this.initializeDatabase();
    }

    //Intializes the database, first checks if a stored database exists, if it does not, creates a new one based on an API query
    async initializeDatabase() {
        try {
            let importedIndex = await this.loadIndexFromStorage();
            if (importedIndex == null) {
                let data = await this.getJobs();
                await this.newDatabase(data);
            } else {
                await this.newImportedDatabase(importedIndex);
            }
            console.log("Database initialized!")
            //Store database after it has been created to save
            this.storeDatabase();
            //Create job recommendations to favourites tab
            this.createJobRecommendations()

            let stopTime = Date.now()
            let timeDifference = stopTime - this.startTime;
            console.log("Took " + timeDifference + " milliseconds to create the database.")
            console.log("New search engine created!\n---------------")
        } catch (e) {
            console.error(e)
        }
    }

    //Create new database based on data, data is in form of array of objects
    async newDatabase(data) { 
        this.database = new Fuse(data, this.#defaultOptions)
    }

    //Create new database based on an imported data
    async newImportedDatabase(importedIndex) {
        console.log("Creating a database based on an imported index!");
        try {
            this.latestJobAdvertisements = await this.loadJobAdsFromStorage();
            this.timestamp = await this.loadTimestampFromStorage();
            let parsedIndex = Fuse.parseIndex(importedIndex)
            //Do this to update the latestJobAdvertisements variable
            await this.getJobs(this.timestamp);
            this.database = new Fuse(this.latestJobAdvertisements, this.#defaultOptions, parsedIndex);
        } catch (e) {
            console.error("Error while creating an imported database: " + e);
        }
    }

    //Return jobs in array form from API (optionally pass timestamp to query with it)
    getJobs = async (queryTimestamp) => {
        try {
            let dataArray = []
            let response = "";
            if (queryTimestamp == undefined) {
                response = await fetch(API_URL);
            } else {
                const timestampDate = new Date(queryTimestamp);
                let ISOformatTimestamp = timestampDate.toISOString().slice(0,19)
                let APIQuery = API_URL + "&timestamp=" + ISOformatTimestamp
                console.log("API Query is: " + APIQuery)
                response = await fetch(APIQuery);
            }
            const data = await response.json();

            //Timestamp when the query was made, add two hours to make GMT + 2. Currently does not account for daylight saving time.
            this.timestamp = Date.now() + 7200000;
            console.log("Timestamp after API query is: " + this.timestamp);

            let jobAdvertisementObject = data.jobAdvertisements

            if (jobAdvertisementObject != undefined) {
                jobAdvertisementObject.forEach(element => {
                    let jobAd = element.jobAdvertisement
                    jobAd['urlType'] = element.publication.url;
                    jobAd['visibility'] = element.publication.visibility;
                    if ((element.link != undefined) && (element.link.url != undefined)) {
                        jobAd['link'] = element.link.url; 
                    } else {
                        jobAd['link'] = "No link provided."; 
                    }
                    dataArray.push(jobAd);
                });
                if (queryTimestamp != undefined) {
                    this.latestJobAdvertisements = this.latestJobAdvertisements.concat(dataArray);
                    return null;
                } else {
                    this.latestJobAdvertisements = dataArray;
                }
                return dataArray;
            } else {
                console.log("No job ads found after timestamp!");
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };

    //Multi search, query is a string with spaces between, it is then split into
    //Checking for duplicates done in a crude way, maybe fix later?
    async searchDatabase(query, filters) {
        if (query == undefined) {
            query = ""
        }
        console.log("----------\nPefroming a search!\nQuery is: " + query + "\nFilters are: " + JSON.stringify(filters) + "\n----------")

        let results = null;
        const keyList = this.#defaultOptions.keys;

        //Create filters
        const filterList = await this.filterDatabase(filters);

        //Remove whitespaces on string end and start
        let trimmedQuery = query.trim();
        if (query != "") {
            const searchTerms = trimmedQuery.split(" ");

            //Start and end search
            let fullSearchObjectEndStart = {'$and':[]};
            //Add filters to search
            for (const value of filterList) {
                fullSearchObjectEndStart['$and'].push(value);
            }

            for (const searchTerm of searchTerms) {
                let searchObject = {'$or':[]};
                for (const key of keyList) {
                    let searchObject2 = {}
                    let searchObject3 = {}
                    searchObject2[key] = searchTerm  + "$";
                    searchObject3[key] = "^" + searchTerm;
                    searchObject['$or'].push(searchObject2);
                    searchObject['$or'].push(searchObject3);
                }
                fullSearchObjectEndStart['$and'].push(searchObject);
            }
    
            //Regular fuzzy search
            let fullSearchObjectFuzzy = {'$and':[]};
            //Add filters to search
            for (const value of filterList) {
                fullSearchObjectFuzzy['$and'].push(value);
            }

            for (const searchTerm of searchTerms) {
                let searchObject = {'$or':[]};
                for (const key of keyList) {
                    let searchObject2 = {}
                    searchObject2[key] = searchTerm;
                    searchObject['$or'].push(searchObject2);
                }
                fullSearchObjectFuzzy['$and'].push(searchObject);
            }
    
            //Do the actual searches
            let results1 = this.database.search(fullSearchObjectEndStart);
            let results2 = this.database.search(fullSearchObjectFuzzy);
            
            //Make deep copies for duplicate deletion
            let results1Copy = JSON.parse(JSON.stringify(results1));
            let results2Copy = JSON.parse(JSON.stringify(results2));
    
            //Delete duplicates
            for (const result of results1Copy) {
                delete result.refIndex;
                delete result.score;
                let resultAsString = JSON.stringify(result)
                for (const[index, result2] of results2Copy.entries()) {
                    delete result2.refIndex;
                    delete result2.score;
                    let result2AsString = JSON.stringify(result2)
                    if (resultAsString == result2AsString) {
                        results2.splice(index, 1);
                        results2Copy.splice(index, 1);
                    }
                }
            }
    
            //Combine results, fuzzy search results at the end
            results = results1.concat(results2);

        } else {
            if (filterList.length > 0) {
                let pureFilterObject = {'$and':[]};
                for (const value of filterList) {
                    pureFilterObject['$and'].push(value);
                }
                console.log(JSON.stringify(pureFilterObject))
                results = this.database.search(pureFilterObject);
            } else {
                console.log("No search terms given and no filters given, returning all job ads!");
                //Return all jobs
                console.log("Amount of results found: " + this.latestJobAdvertisements.length);
                let formattedResults = [];
                for (const job of this.latestJobAdvertisements) {
                    let jobAdvertisement = {};
                    jobAdvertisement['jobAdvertisement'] = job;
                    formattedResults.push(jobAdvertisement);
                }
                //console.log(JSON.stringify(this.latestJobAdvertisements, null,2));
                return (formattedResults);
            }
        }
        
        console.log("Amount of results found: " + results.length);

        let formattedResults = [];
        //Format results into the proper form
        for (let result of results) {
            let jobAdvertisement = {};
            jobAdvertisement['jobAdvertisement'] = result.item;
            formattedResults.push(jobAdvertisement);
        }
        return (formattedResults);
    }

    //Filter database, returns list of filters to be added to the search
    //Filters in form of {filtertype1: ["filterstring1", "filterstring2"], filtertype2....} 
    //Example {"location":["Oulu", "Helsinki"], "employmentType":["Vakinainen"]}
    async filterDatabase(filters) {
        let filterList = []

        if (filters && (filters != null)) {
            for (const [key, filter] of Object.entries(filters)) {
                //console.log(`${key}: ${filter}`);            
                switch(key) {
                    //Start-end searching
                    case "location":
                        filterList.push(await this.handleFilterCreation(filter,key,"start-end"));
                        break;
        
                    //Start-end searching
                    case "region":
                        filterList.push(await this.handleFilterCreation(filter,key,"start-end"));
                        break;
                    
                    //Strict searching
                    case "language":
                        filterList.push(await this.handleFilterCreation(filter,key,"include"));
                        break;
                    
                    //Strict searching
                    case "employment":
                        filterList.push(await this.handleFilterCreation(filter,key,"include"));
                        break;                
        
                    //Include searching
                    case "employmentType":
                        filterList.push(await this.handleFilterCreation(filter,key,"include"));
                        break;
                    
                    //Include searching
                    case "taskArea":
                        filterList.push(await this.handleFilterCreation(filter,key,"include"));
                        break;
            
                    //Defaults to start-end searching
                    default:
                        filterList.push(await this.handleFilterCreation(filter,key,"start-end"));
                        break;
                    
                }
            }
        }
        return filterList;
    }

    //Formats filters for the search, can be expanded if needed
    async handleFilterCreation(filter, key, type) {
        let filterObject = {};
        let filterList = [];
        switch(type) {
            case "start-end":
                for (const filterValue of filter) {
                    let filterValueObject1 = {};
                    let filterValueObject2 = {};
                    filterValueObject1[key] = "^" + filterValue;
                    filterValueObject2[key] = filterValue + "$";
                    filterList.push(filterValueObject1);
                    filterList.push(filterValueObject2);
                }
                filterObject['$or'] = filterList;
                break;
            
            case "strict":
                for (const filterValue of filter) {
                    let filterValueObject1 = {};
                    filterValueObject1[key] = "=" + filterValue;
                    filterList.push(filterValueObject1);
                }
                filterObject['$or'] = filterList;
                break;
            
            case "include":
                for (const filterValue of filter) {
                    let filterValueObject1 = {};
                    filterValueObject1[key] = "'" + filterValue;
                    filterList.push(filterValueObject1);
                }
                filterObject['$or'] = filterList;
                break;
    

            default:
                for (const filterValue of filter) {
                    let filterValueObject1 = {};
                    let filterValueObject2 = {};
                    filterValueObject1[key] = "^" + filterValue;
                    filterValueObject2[key] = filterValue + "$";
                    filterList.push(filterValueObject1);
                    filterList.push(filterValueObject2);
                }
                filterObject['$or'] = filterList;
                break;
        }
        return (filterObject);
    }

    async createJobRecommendations() {
        let pastSearches = await getValue('pastSearches')
        const sizeOfRecommendations = 10
        if(pastSearches) {
            let results = []
            for (keyWord of pastSearches) {
                let jobDescriptions = await this.searchDatabase(keyWord)
                results = results.concat(jobDescriptions)
            }
            // Shuffle the recommendations
            results.sort(function(){return 0.5 - Math.random()})

            // Limit the number of recommendations
            if (results.length > sizeOfRecommendations) {
                results = results.slice(0, sizeOfRecommendations)
            }
            storeValue(results, 'recommendations')
        }
    }

    //Return job ads used in the database
    returnJobAds() {
        return this.latestJobAdvertisements;
    }

    //Remove all stored data related to the database
    async clearStoredDatabase() {
        console.log("Removing datbase from storage!");
        removeValue('index');
        removeValue('latestTimestamp');
        removeValue('jobAds')
    }

    //Add entries in list form, does not update index though. Only updates the list that was used to create the index.
    //TODO, make update index
    async addEntries(entryList) {
        this.database.add(entryList)
    }

    //Load index from storage
    async loadIndexFromStorage() {
        try {
            let index = await getValue('index');
            return JSON.parse(index);
        } catch (e) {
            console.log("Could not load index. Error: " + e)
        }
    }

    //Load the latest list of job advertiesements from storage
    async loadJobAdsFromStorage() {
        try {
            let jobAds = await getValue('jobAds');
            return JSON.parse(jobAds);
        } catch (e) {
            console.log("Could not load job ads. Error: " + e)
        }
    }

    //Load the latest timestamp  from storage
    async loadTimestampFromStorage() {
        try {
            let latestTimestamp = await getValue('latestTimestamp');
            return JSON.parse(latestTimestamp);
        } catch (e) {
            console.log("Could not load timestamp. Error: " + e)
        }
    }

    //Exports index to storage, also exports the latest API call and timestamp
    storeDatabase() {
        console.log("Storing database.")
        if (this.database != null) {
            const index = this.database.getIndex()
            let JSONIndex = JSON.stringify(index.toJSON())
            storeValue(JSONIndex, 'index');
            if (this.latestJobAdvertisements != null) {
                let JSONJobAds = JSON.stringify(this.latestJobAdvertisements)
                storeValue(JSONJobAds, 'jobAds')
            }
            if (this.timestamp != null) {
                storeValue(this.timestamp, 'latestTimestamp')
            }  
        } else {
            console.error("No database to store!");
        }
    }
};