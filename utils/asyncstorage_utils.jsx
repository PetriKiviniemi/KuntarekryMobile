import AsyncStorage from '@react-native-async-storage/async-storage';

//Stores data in AsyncStorage
export const storeValue = async (value, key) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("Encountered error while storing data. Error: " + e);
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