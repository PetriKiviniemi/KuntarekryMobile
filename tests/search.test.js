import Search from '../utils/Search_utils';
import { API_URL } from '../apiurl';
import { storeValue, getValue } from '../utils/asyncstorage_utils';

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

test('Test searching', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    //Empty search
    let search1 = await database.searchDatabase("")
    expect(search1.length).toBe(jobAds.length)

    //Undefined search
    let search2 = await database.searchDatabase()
    expect(search2.length).toBe(jobAds.length)

}, 30000);

test('Test searching 2', async () => {
    let database = await createDatabase()
    let jobAds =  database.returnJobAds()

    //Regular single search
    let search3 = await database.searchDatabase("Helsinki")
    expect(search3.length).toBeGreaterThanOrEqual(1)
    expect(search3.length).toBeLessThanOrEqual(jobAds.length)

    //Double search
    let search4 = await database.searchDatabase("Helsinki Vakinainen")
    expect(search4.length).toBeGreaterThanOrEqual(1)
    expect(search4.length).toBeLessThanOrEqual(jobAds.length)
    expect(search4.length).toBeLessThan(search3.length)

    //Triple search
    let search5 = await database.searchDatabase("Helsinki Vakinainen Sairaanhoitaja")
    expect(search5.length).toBeGreaterThanOrEqual(1)
    expect(search5.length).toBeLessThanOrEqual(jobAds.length)
    expect(search5.length).toBeLessThan(search4.length)

}, 30000);

test('Test filtering', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Empty filter
    let search1 = await database.searchDatabase("", {})
    expect(search1.length).toBe(jobAds.length)

    //Undefined filter
    let search2 = await database.searchDatabase("")
    expect(search2.length).toBe(jobAds.length)

    //Example filter
    let search3 = await database.searchDatabase("", {"location":["Oulu", "Helsinki"], "employmentType":["Vakinainen"]})
    expect(search3.length).toBeGreaterThanOrEqual(1)
    expect(search3.length).toBeLessThanOrEqual(jobAds.length)
}, 20000);

test('Test searching and filtering', async () => {
    let database = await createDatabase()
    let jobAds = database.returnJobAds()

    //Search and filter
    let search = await database.searchDatabase("Sairaanhoitaja", {"location":["Oulu", "Helsinki"], "employmentType":["Vakinainen"]})
    expect(search.length).toBeGreaterThanOrEqual(1)
    expect(search.length).toBeLessThanOrEqual(jobAds.length)

    let search2 = await database.searchDatabase("", {"thereIsNoFilterNamedThis":["test"]})
    expect(search.length).toBeGreaterThanOrEqual(0)

}, 20000);

test('Test getJobs with timestamp', async () => {
    let database = await createDatabase()

    let results1 = await database.getJobs(1586713108)

    expect(results1).toBeNull()
}, 20000);



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


}, 20000);

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



}, 20000);

test('Test fetching jobs with timestamp', async () => {
    let database = await createDatabase()
    const timestampDate = Date.now();
    let databaseFetchedJobAds = await database.getJobs(timestampDate)
    expect(databaseFetchedJobAds).toBeNull()
}, 20000);

test('Test database clearing', async () => {
    let database = await createDatabase()
    expect(() => {
        database.clearStoredDatabase()
    }).not.toThrow()
}, 20000);

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

}, 20000);

test('Test database storing', async () => {
    let database = await createDatabase()
    expect(() => {
        database.storeDatabase()
    }).not.toThrow()
}, 20000);

test('Test past searches', async () => {
    let database = await createDatabase()
    await storeValue(["Helsinki"], "pastSearches")
    await database.createJobRecommendations()

    let jobR = await getValue("recommendations")
    expect(jobR.length).toBeGreaterThanOrEqual(1)

}, 20000);