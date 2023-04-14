import { storeValue, getValue, removeValue, clearStorage, createNewUser, postUserData, getAllUsers, getUserData, loginUser} from '../utils/asyncstorage_utils';

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

//Test file for the asyncstorage_utils functions

test('Test storeValue', async () => {
    expect(async () => {
        await storeValue("testValue", "testValue")
    }).not.toThrow()

}, 10000);

test('Test getValue', async () => {
    await storeValue("testValue", "testValue")

    let result = await getValue("testValue")
    expect(result).toBe("testValue")

}, 10000);

test('Test removeValue', async () => {
    await storeValue("testValue", "testValue")

    await removeValue("testValue")
    let result = await getValue("testValue")
    expect(result).toBeNull()

}, 10000);


test('Test clearStorage', async () => {
    await storeValue("testValue1", "testValue1")
    await storeValue("testValue2", "testValue2")

    await clearStorage()

    let result1 = await getValue("testValue1")
    let result2 = await getValue("testValue2")

    expect(result1).toBeNull()
    expect(result2).toBeNull()
}, 10000);

test('Test getAllUsers', async () => {
    await createNewUser({"username":"getAllUsers_username","password":"getAllUsers_password"})
    let allUsers = await getAllUsers()
    expect(allUsers.length).toBe(1)

}, 10000);

test('Test postUserData', async () => {
    let id = await createNewUser({"username":"postUserData_username","password":"postUserData_password"})

    let user = await getUserData(id)
    let result = await postUserData(user)

    expect(result).toBe(true)

}, 10000);

test('Test getUserData', async () => {
    let id = await createNewUser({"username":"getUserData_username","password":"getUserData_password"})

    let user = await getUserData(id)
    expect(user.id).toBe(id)

    let user2 = await getUserData(1234567890)
    expect(user2).toBeNull()

}, 10000);

test('Test createNewUser', async () => {
    let testDate = Date.now()

    await sleep(1000)

    let id = await createNewUser({"username":"createNewUser_username","password":"createNewUser_password"})

    let id_int = parseInt(id)

    expect(id_int).toBeGreaterThan(testDate)

}, 10000);

test('Test loginUser', async () => {
    let id = await createNewUser({"username":"loginUser_username","password":"loginUser_password"})
    let user = await getUserData(id)

    let loginUserData = await loginUser({"username":"loginUser_username","password":"loginUser_password"})

    expect(loginUserData).toEqual(user)

    let loginUserData2 = await loginUser({"username":"thereisno","password":"userlikethis"})

    expect(loginUserData2).toBeNull()
    
}, 10000);