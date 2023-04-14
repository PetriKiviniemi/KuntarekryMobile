import Search from '../utils/Search_utils';
import { storeValue, getValue } from '../utils/asyncstorage_utils';

//Test file for Search_utils class

//Use this just to avoid problems with the Search object construction not completeting itself before tests
createDatabase = async () => {
    let database = new Search()
    await database.initializeDatabase()
    return database;
}

test('Test construction', async () => {
    let database = await createDatabase()
    expect(database).not.toBeNull()

}, 10000);

test('Test searching empty', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    let searchResult = await database.searchDatabase("")
    expect(searchResult.length).toBe(jobAds.length)

}, 10000);

test('Test searching undefined', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    //Undefined search
    let searchResult = await database.searchDatabase()
    expect(searchResult.length).toBe(jobAds.length)

}, 10000);

test('Test searching single term', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    //Regular single search
    let searchResult = await database.searchDatabase("Helsinki")
    expect(searchResult.length).toBeGreaterThanOrEqual(1)
    expect(searchResult.length).toBeLessThanOrEqual(jobAds.length)

}, 10000);

test('Test searching double term', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    let compareSearch = await database.searchDatabase("Helsinki")

    //Double search
    let searchResult = await database.searchDatabase("Helsinki Vakinainen")
    expect(searchResult.length).toBeGreaterThanOrEqual(1)
    expect(searchResult.length).toBeLessThanOrEqual(jobAds.length)
    expect(searchResult.length).toBeLessThan(compareSearch.length)

}, 10000);

test('Test searching triple term', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    let compareSearch = await database.searchDatabase("Helsinki Vakinainen")

    //Triple search
    let searchResult = await database.searchDatabase("Helsinki Vakinainen Sairaanhoitaja")
    expect(searchResult.length).toBeGreaterThanOrEqual(1)
    expect(searchResult.length).toBeLessThanOrEqual(jobAds.length)
    expect(searchResult.length).toBeLessThan(compareSearch.length)

}, 10000);

test('Test filtering empty filter', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Empty filter
    let searchResult = await database.searchDatabase("", {})
    expect(searchResult.length).toBe(jobAds.length)

}, 10000);

test('Test filtering undefined filter', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Undefined filter
    let searchResult = await database.searchDatabase("")
    expect(searchResult.length).toBe(jobAds.length)

}, 10000);

test('Test filtering example filter', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Example filter
    let searchResult = await database.searchDatabase("", {"location":["Oulu", "Helsinki"], "employmentType":["Vakinainen"]})
    expect(searchResult.length).toBeGreaterThanOrEqual(1)
    expect(searchResult.length).toBeLessThanOrEqual(jobAds.length)

}, 10000);

test('Test searching and filtering', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Search and filter
    let searchResult = await database.searchDatabase("Sairaanhoitaja", {"location":["Oulu", "Helsinki"], "employmentType":["Vakinainen"]})
    expect(searchResult.length).toBeGreaterThanOrEqual(1)
    expect(searchResult.length).toBeLessThanOrEqual(jobAds.length)

}, 10000);

test('Test filtering with nonexistent results', async () => {
    let database = await createDatabase()

    let searchResult = await database.searchDatabase("", {"thereIsNoFilterNamedThis":["test"]})
    expect(searchResult.length).toBeGreaterThanOrEqual(0)

}, 10000);

test('Test getJobs with timestamp', async () => {
    let database = await createDatabase()
    let results1 = await database.getJobs(1586713108)

    expect(results1).toBeNull()

}, 10000);


test('Test handleFilterCreation', async () => {
    let database = await createDatabase()

    //Start-end
    let result1 = await database.handleFilterCreation(["filterTest"],"keyTest","start-end")
    expect(result1).toEqual({'$or':[{'keyTest':"^filterTest"},{'keyTest':"filterTest$"}]})

    //Strict
    let result2 = await database.handleFilterCreation(["filterTest"],"keyTest","strict")
    expect(result2).toEqual({'$or':[{'keyTest':"=filterTest"}]})

    //Include
    let result3 = await database.handleFilterCreation(["filterTest"],"keyTest","include")
    expect(result3).toEqual({'$or':[{'keyTest':"'filterTest"}]})

    //Default
    let result4 = await database.handleFilterCreation(["filterTest"],"keyTest","test")
    expect(result4).toEqual({'$or':[{'keyTest':"^filterTest"},{'keyTest':"filterTest$"}]})

}, 10000);

test('Test filterDatabase', async () => {
    let database = await createDatabase()

    let result1 = await database.filterDatabase({
        "location":["Oulu"], 
        "employmentType":["Vakinainen"],
        "region":["Pohjanmaa"],
        "language":["FI_fi"],
        "employment":["Vuorotyö"],
        "taskArea":["Sariaanhoito"],
        "test":["Test"],
    })

    expect(result1).toEqual([
       {'$or':[{'location':"^Oulu"},{'location':"Oulu$"}]},
       {'$or':[{'employmentType':"'Vakinainen"}]},
       {'$or':[{'region':"^Pohjanmaa"},{'region':"Pohjanmaa$"}]},
       {'$or':[{'language':"'FI_fi"}]},
       {'$or':[{'employment':"'Vuorotyö"}]},
       {'$or':[{'taskArea':"'Sariaanhoito"}]},
       {'$or':[{'test':"^Test"},{'test':"Test$"}]},
    ])

}, 10000);

test('Test fetching jobs with timestamp', async () => {
    let database = await createDatabase()
    const timestampDate = Date.now();
    let databaseFetchedJobAds = await database.getJobs(timestampDate)
    expect(databaseFetchedJobAds).toBeNull()

}, 10000);

test('Test database clearing', async () => {
    let database = await createDatabase()

    expect(() => {
        database.clearStoredDatabase()
    }).not.toThrow()

}, 10000);

test('Test database loading', async () => {
    let database = await createDatabase()

    expect(() => {
        database.loadIndexFromStorage()
    }).not.toThrow()

    expect(() => {
        database.loadJobAdsFromStorage()
    }).not.toThrow()

    expect(() => {
        database.loadTimestampFromStorage()
    }).not.toThrow()

}, 10000);

test('Test database storing', async () => {
    let database = await createDatabase()

    expect(() => {
        database.storeDatabase()
    }).not.toThrow()

}, 10000);

test('Test past searches', async () => {
    let database = await createDatabase()
    await storeValue(["Helsinki"], "pastSearches")
    await database.createJobRecommendations()
    let jobR = await getValue("recommendations")
    
    expect(jobR.length).toBeGreaterThanOrEqual(1)

}, 10000);