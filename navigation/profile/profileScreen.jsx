import React, {useEffect, useState} from 'react';
import {Text, View, Button, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import Styles from '../../styles';
import {profileStyles} from './profileStyles'

import {getValue, loginUser, createNewUser} from '../../utils/asyncstorage_utils';
import LoginScreen from '../loginScreen';
import {DropdownMenu} from './dropdownMenu';
import {DegreeOverlay} from './degreeOverlay';
import {PersonalInfo} from './personalInfo'
import { AdditionalEducationOverlay } from './additionalEducationOverlay';
import { WorkExperienceOverlay } from './workExperienceOverlay';
import {ProfileTab} from './profileTab'
import {WorkTab} from './workTab'

const ProfileNavBar = (props) => {
    return(
            <View style={Styles.row2}>
                <View style={profileStyles.profileTabContainer}>
                <TouchableOpacity
                    style={profileStyles.profileTabLeft}
                    onPress={() => props.switchToTab("profile")}
                >
                    <Text style={{fontSize: 24}}>
                        Profiili
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={profileStyles.profileTabRight}
                    onPress={() => props.switchToTab("work")}
                >
                    <Text style={{fontSize: 24}}>
                        Työt
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
    )
}

export default function ProfileScreen({navigation}) {
    //Start state
    const [loggedIn, setLoggedIn] = useState(false)
    
    //User data
    const [currentUser, setCurrentUser] = useState(null)

    const [currentTab, setCurrentTab] = useState("profile")

    useEffect(() => {
        //Disable a specific console error. The hierarchy of the components is correct
        //But it throws an error
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        //Fetch mock user
        //Mock data
        let loginData = {
            username: "Seitteman",
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

    const switchToTab = (tabName) => {
        setCurrentTab(tabName)
    }


    if(!loggedIn)
        return <LoginScreen userdataCallback={getUserDataFromLogin}/>
    return(
        <View style={{flex: 1, paddingTop: 50}}>
            <ProfileNavBar switchToTab={switchToTab}/>
            {currentTab == 'profile' ? <ProfileTab currentUser={currentUser}/> : <WorkTab currentUser={currentUser}/>}
            <Button onPress={() => setLoggedIn(false)} title="Logout"/>
        </View>
    )
}