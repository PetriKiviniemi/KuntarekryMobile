import Fuse from 'fuse.js'
import { getValue, storeValue, removeValue } from './asyncstorage_utils'

const { API_URL } = require('../apiurl');

//GENERAL TODO
//If an database exists, do a new query based on timestamp
//Filters
//Refine search parameters
//Add edgeguarding
//General testing
//TODO: Timestamp currently in UTC, fix to GMT+2
//Refactor dumb programming away
//Multi search, aka perform multiple searches and compare results to create final results
//Verify updates actually work
//Refactor to use only one data source



//Class for searching job advertisements, includes filtering
export default class Search {

    #defaultOptions = {
        // isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.1, // 0 = exact match, 1 = no match
        // distance: 100,
        // useExtendedSearch: false,
        //ignoreLocation: true, //Location disabled for the jobDesc field
        //ignoreFieldNorm: false,
        // fieldNormWeight: 2,

        //Default keys
        keys: [
            'title',
            'organization',
            //'jobDesc', //Should this be here?
            'employment',
            'employmentType',
            'location',
            'region',
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
            //console.log(importedIndex)
            if (importedIndex == null) {
                let data = await this.getJobs();
                await this.newDatabase(data);
            } else {
                await this.newImportedDatabase(importedIndex);
            }
            console.log("Database initialized!")
            //Store database after it has been created to save
            this.storeDatabase();
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

    //Update database
    //TODO: Determine if entries in the API have been deleted, then delete those entries in the internal database
    async updateDatabase() {

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
                    return;
                } else {
                    this.latestJobAdvertisements = dataArray;
                }
                return dataArray;
            } else {
                console.log("No job ads found after timestamp!");
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    //OLD Search database, query is in string form
    async oldSearchDatabase(query) {
        const results = this.database.search(query)
        //console.log(JSON.stringify(results, null, 2));
        console.log("Amount of results found: " + results.length);

        let formattedResults = [];
        //Format results into the proper form
        for (let result of results) {
            let jobAdvertisement = {};
            jobAdvertisement['jobAdvertisement'] = result.item;
            //Add refId for key purposes
            //jobAdvertisement['jobAdvertisement']['refId'] = result.refIndex;
            formattedResults.push(jobAdvertisement);
        }
        return (formattedResults);
    }

    //Multi search, query is a string with spaces between, it is then split into 
    async searchDatabase(query) {
        const searchTerms = query.split(" ");
        let fullSearchObject = {'$and':[]};
        let keyList = this.#defaultOptions['keys'];
        for (const searchTerm of searchTerms) {
            let searchObject = {'$or':[]};
            for (const key of keyList) {
                let searchObject2 = {}
                searchObject2[key] = searchTerm;
                searchObject['$or'].push(searchObject2);
            }
            fullSearchObject['$and'].push(searchObject);
        }
        const results = this.database.search(fullSearchObject)
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

    //Filter database TODO, need to know how filters will work
    //Filters in form of {filtertype1: ["filterstring1", "filterstring2"], filtertype2....}
    async filterDatabase(filters) {

    }
    
    //Remove entry from database based on indices
    async removeEntry(indexList) {
        for (const index of indexList) {
            this.database.removeAt(index);
        }
    }

    //Remove all stored data related to the database
    async clearStoredDatabase() {
        console.log("Removing datbase from storage!");
        removeValue('index');
        removeValue('latestTimestamp');
        removeValue('jobAds')
    }

    //Add entries in list form
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

    async test() {
        storeValue(1678782647000, 'latestTimestamp')
    }
};