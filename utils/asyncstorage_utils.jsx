import AsyncStorage from '@react-native-async-storage/async-storage';

//Stores data in AsyncStorage
export const storeValue = async (value, key) => {
    try{
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true
    }
    catch (e) {
        console.log("Encoutered error while storing data to the storage. Error: " + e)
        return false
    }
};

//Get data from AsyncStorage
//Returns the data in object form
export const getValue = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        if (jsonValue != null) {
            return JSON.parse(jsonValue);
        } else {
            console.log("No data found at key: " + key);
            return null;
        }
    } catch(e) {
        console.log("Encountered error while getting data from storage. Error: " + e);
    }
};

//Removes data from the storage based on a kye
export const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log("Encountered error removing data from storage. Error: " + e);
    }
}

//Clears all data in the storage
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear().then(console.log("Storage cleared"));
    } catch (e) {
        console.log("Encountered error while clearing the data storage. Error: " + e);
    }
};

//User data format::
/*
{
    id: String,
    loginInfo: {
        username: String,
        password: String (hashed)
    },
    basicInfo: {
        lastName: String,
        firstName: String,
        birthDate: String,
        gender: String (Could be enum),
        phoneNumber: String,
    }
    degrees: [
        {
            id: Integer,
            isHighest: Boolean,
            school: String,
            degreeName: String,
            degreeProgress: String (Could be enum),
            degreeStage: String (Could be enum),
            startDate: String,
            endDate: String,
            continues: Boolean
        }
    ],
    additionalEducation: [
        {
            TODO:: define
        }
    ],
    workExperience: [
        {
            TODO:: define
        }
    ]
}
*/

export const createNewUser = async (loginInfo) => {
    let newUserObj = {
        id: Date.now().toString(),
        loginInfo: {
            username: loginInfo.username,
            password: loginInfo.password
        },
        basicInfo: {
            lastName: null,
            firstName: null,
            birthDate: null,
            gender: null,
            phoneNumber: null,
            location: null,
            workField: null,
        },
        degrees: [],
        additionalEducation: [],
        workExperience: []
    }
    let res = await postUserData(newUserObj)
    if(!res)
        return false
    return newUserObj.id
}

export const postUserData = async (userObj) => {
    //Fetch the existing users list or create it if it doesn't exist
    let users_list = await getAllUsers()
    let result = true
    //Try to find existing user
    for(let i = 0; i < users_list.length; i++)
    {
        let user = users_list[i]
        if(user && user.id == userObj.id)
        {
            //User found, remove the user and push the latest version to array
            users_list.splice(i, 1)
        }
    }
    users_list.push(userObj)
    result = await storeValue(users_list, "users")

    return result
}

export const patchUserData = async (partlyData) => {
    //TODO:: Maybe implement
}

export const getAllUsers = async() => {
    let users_list = await getValue("users")
    if(!users_list)
    {
        let users = []
        result = await storeValue(users, "users")
        users_list = []
    }

    return users_list
}

export const getUserData = async (id) => {
    //In real database implementation you could not fetch all of the users
    //But this is only for demoing purpose

    let all_users = await getAllUsers()
    for(let i = 0; i < all_users.length; i++)
    {
        let user = all_users[i]
        if(user &&
            user.id == id)
        {
            return user
        }
    }
    return null
}

export const loginUser = async (loginData) => {
    try{
        let all_users = await getAllUsers()
        for(let i = 0; i < all_users.length; i++)
        {
            let user = all_users[i]
            if(user &&
               user.loginInfo.username == loginData.username &&
               user.loginInfo.password == loginData.password
            )
            {
                return user
            }
        }
        return null
    } catch (e) {
        console.log("Encountered error while fetching from the data storage. Error: " + e);
    }
}