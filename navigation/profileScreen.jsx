import React, {useEffect, useState} from 'react';
import {Text, View, Button, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storeValue, getValue, clearStorage} from '../utils/asyncstorage_utils';
import LoginScreen from './loginScreen';

export default function ProfileScreen({ navigation }) {
    //All the different userprofile things, add more if necessary
    //TODO Ponder if one big object is better
    const [name, setName] = useState("Matti Meikäläinen");
    const [address, setAdress] = useState("Peräkuja 22");
    const [county, setCounty] = useState("Oulu");
    const [region, setRegion] = useState("Pohjois-pohjanmaa");
    const [postalArea, setPostalArea] = useState("90100");

    //TODO: Store preferences for work? 
    const [workPreferences, setWorkPreferences] = useState({type1: "Temp1", type2: "Temp2"});

    //Input states
    const [nameInput, onChangeNameInput] = useState('');
    const [countyInput, onChangeCountyInput] = useState('');
    const [addressInput, onChangeAddressInput] = useState('');
    const [regionInput, onChangeRegionInput] = useState('');
    const [postalInput, onChangePostalInput] = useState('');

    //Start state
    const [loggedIn, setLoggedIn] = useState(false)

    const getUserDataFromLogin = async (data) => {
        setLoggedIn(true)
        user_data = await getValue(data['username'])
        if(user_data)
        {
            setName(user_data['username'])
            setCounty(user_data['county'])
            setAdress(user_data['address'])
            setRegion(user_data['region'])
            setPostalArea(user_data['postalArea'])
        }
    }

    if(!loggedIn)
        return <LoginScreen userdataCallback={getUserDataFromLogin}/>
    return (
        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: 'white'}}>
            <Text 
                style={{ fontSize: 26, fontWeight: 'bold'}}>Profile Screen
            </Text>
            <Icon name={"user"} size={60} style = {{padding: 10}}/>
            <TextInput style = {styles.textInput}
                placeholder = {name}
                value = {nameInput}
                onChangeText = {onChangeNameInput}
                onSubmitEditing = {async () => {setName(nameInput); storeValue(nameInput, "name")}}
            ></TextInput>
          </View>

          <View style={{flex: 3, backgroundColor: 'azure' }}>
            <View style={{flexDirection: 'column', justifyContent: "flex-start"}}>
                <View style = {styles.inputAndIconContainer}>
                    <TextInput style = {styles.textInput}
                        placeholder = {county}
                        value = {countyInput}
                        onChangeText = {onChangeCountyInput}
                        onSubmitEditing = {async() => {setCounty(countyInput); storeValue(countyInput, "county")}}
                    ></TextInput>
                    <Icon name={"pencil"} size={20} style = {{padding: 15}}/>
                </View>
                <View style = {styles.inputAndIconContainer}>
                    <TextInput style = {styles.textInput}
                        placeholder = {address}
                        value = {addressInput}
                        onChangeText = {onChangeAddressInput}
                        onSubmitEditing = {() => {setAdress(addressInput); storeValue(addressInput, "address")}}
                    ></TextInput>                    
                    <Icon name={"pencil"} size={20} style = {{padding: 15}}/>
                </View>
                <View style = {styles.inputAndIconContainer}>
                    <TextInput style = {styles.textInput}
                        placeholder = {region}
                        value = {regionInput}
                        onChangeText = {onChangeRegionInput}
                        onSubmitEditing = {() => {setRegion(regionInput); storeValue(regionInput, "region")}}
                    ></TextInput>
                    <Icon name={"pencil"} size={20} style = {{padding: 15}}/>
                </View>
                <View style = {styles.inputAndIconContainer}>
                    <TextInput style = {styles.textInput}
                        placeholder = {postalArea}
                        value = {postalInput}
                        onChangeText = {onChangePostalInput}
                        onSubmitEditing = {() => {setPostalArea(postalInput); storeValue(postalInput, "postalArea")}}
                    ></TextInput>                    
                    <Icon name={"pencil"} size={20} style = {{padding: 15}}/>
                </View>
            </View>

            <Button onPress={async ()=> {
                    console.log(await getValue('name'))
                    console.log(await getValue('county'))
                    console.log(await getValue('address'))
                    console.log(await getValue('region'))
                    console.log(await getValue('postalArea'))
                }} title = "Console log values">
            </Button>
            <Button onPress={()=>{
                    clearStorage()
                }} title = "Clear storage">
            </Button>   

            <Button onPress={() => setLoggedIn(false)} title="Logout">
            </Button>

          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    information: {
        padding: 10,
        fontSize: 15,
    },
    textInput: {
        padding: 12,
        fontSize: 15,
        textDecorationLine: "underline"
    },
    inputAndIconContainer: {
        flexDirection: "row", 
        borderColor: "gray", 
        borderWidth: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
});