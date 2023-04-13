import { storeValue, getValue, removeValue, clearStorage, createNewUser, postUserData, getAllUsers, getUserData, loginUser} from '../utils/asyncstorage_utils';

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

//Test file for the asyncstorage_utils functions
test('Test storeValue, getValue and removeValue', async () => {
    expect(async () => {
        await storeValue("test1", "test1")
    }).not.toThrow()

    let result = await getValue("test1")
    expect(result).toBe("test1")

    await removeValue("test1")
    let result3 = await getValue("test1")
    expect(result3).toBeNull()

}, 10000);

test('Test clearStorage', async () => {
    await storeValue("test1", "test1")
    await storeValue("test2", "test2")

    await clearStorage()

    let result1 = await getValue("test1")
    let result2 = await getValue("test2")

    expect(result1).toBeNull()
    expect(result2).toBeNull()
}, 10000);

test('Test postUserData, getAllUsers and getUserData', async () => {
    let id = await createNewUser({"username":"test3","password":"test4"})

    let user = await getUserData(id)
    expect(user.id).toBe(id)

    let user2 = await getUserData(1234567890)
    expect(user2).toBeNull()

    let result = await postUserData(user)
    expect(result).toBe(true)

    let allUsers = await getAllUsers()

    expect(allUsers.length).toBe(1)

}, 10000);

test('Test createNewUser', async () => {
    let testDate = Date.now()

    await sleep(1000)

    let id = await createNewUser({"username":"test1","password":"test2"})

    let id_int = parseInt(id)

    expect(id_int).toBeGreaterThan(testDate)


}, 10000);

test('Test loginUser', async () => {
    let id = await createNewUser({"username":"test5","password":"test6"})
    let user = await getUserData(id)

    let loginUserData = await loginUser({"username":"test5","password":"test6"})

    expect(loginUserData).toEqual(user)

    let loginUserData2 = await loginUser({"username":"thereisno","password":"userlikethis"})

    expect(loginUserData2).toBeNull()
}, 10000);