import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Button, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox'
import {DatePicker} from "react-native-common-date-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Styles from '../../styles';
import {profileStyles} from './profileStyles'

import {storeValue, getValue, clearStorage, loginUser, createNewUser, getUserData, postUserData} from '../../utils/asyncstorage_utils';
import LoginScreen from '../loginScreen';
import {CalendarSelection} from './calendarSelection';
import {DropdownMenu} from './dropdownMenu';
import {DegreeOverlay} from './degreeOverlay';
import { AddContentButton, SaveButton, CancelButton, TextInputImmutable, CheckBoxImmutable } from './profileMisc';
import {PersonalInfo} from './personalInfo'

export default function ProfileScreen({ navigation }) {
    //Start state
    const [loggedIn, setLoggedIn] = useState(false)
    
    //User data
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        //Disable a specific console error. The hierarchy of the components is correct
        //But it throws an error
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        //Fetch mock user
        //Mock data
        let loginData = {
            username: "Jarmo",
            password: "Salasana"
        }

        console.log("Logging in user...")
        loginUser(loginData).then((res) => {
            if(!res)
            {
                console.log("User not found... Creating a new one")
                createNewUser(loginData).then((new_id) => 
                {
                    if(new_id != false)
                    {
                        console.log("New user created with id: ", new_id)
                        setCurrentUser(new_id)
                    }
                })
            }
            else
            {
                console.log("User already existed, userId: ", res)
                setCurrentUser(res)
            }
        })
    }, [])


    //TODO:: Replace with some real login function
    const getUserDataFromLogin = async (data) => {
        setLoggedIn(true)
        let user_data = await getValue(data['username'])
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
        <View style={{flex: 1, paddingTop: 50}}>

            <View style={Styles.row2}>
                <View style={profileStyles.profileTabContainer}>
                <TouchableOpacity style={profileStyles.profileTabLeft}>
                    <Text style={{fontSize: 24}}>
                        Profiili
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileStyles.profileTabRight}>
                    <Text style={{fontSize: 24}}>
                        Työt
                    </Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.row2}>
                <Text style={profileStyles.profileTextField}>
                    Omaa hakijaprofiiliasi voit käyttää pohjana työhakemuksissasi.
                    Oman profiilisi tiedot eivät näy työnantajalle,
                    he näkevät vain heille lähetetyt työhakemukset.
                </Text>
                <Text style={profileStyles.profileTextField}>
                    Jos päivität perustietojasi
                    (nimi, syntymäaika, sukupuoli, puhelin, sähköposti),
                    ne päivittyvät automaattisesti kaikille aikaisemmin jättämillesi hakemuksille.
                </Text>
                <Text style={profileStyles.profileTextField}>
                    Mikäli päivität profiilissasi tutkinnot,
                    lisä- ja täydennyskoulutus ja työkokemustietoja,
                    ne eivät päivity automaattisesti aikaisemmin jätetyille hakemuksille.
                </Text>
            </View>

            <ScrollView style={profileStyles.dropdownsContainer}>
            <View style={profileStyles.dropdownsWrapper}>

                <DropdownMenu
                    title="PERUSTIEDOT"
                    content={<PersonalInfo user={currentUser}/>}
                />
                <DropdownMenu
                    title="TUTKINNOT"
                    content={<DegreeOverlay user={currentUser}/>}
                />

                <DropdownMenu
                    title="LISÄ- JA TÄYDENNYSKOULUTUS"
                    content={<AddContentButton title="LISÄÄ KOULUTUS"/>}
                />

                <DropdownMenu
                    title="TYÖKOKEMUS"
                    content={<AddContentButton title="LISÄÄ TYÖKOKEMUS"/>}
                />
            </View>
            </ScrollView>

            <Button onPress={() => setLoggedIn(false)} title="Logout">
            </Button>

        </View>
    );
}
