import React, {useEffect, useState, useRef} from 'react';
import {Text, View,  TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {profileStyles} from './profileStyles'

import {getUserData, postUserData} from '../../utils/asyncstorage_utils';
import {CalendarSelection} from './calendarSelection';

export const PersonalInfo = (props) => {

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [isGenderOpen, setGenderOpen] = useState(false)
    const [genderSelection, setGenderSelection] = useState(null)
    const [genderItems, setGenderItems] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'},
        {label: 'Rather not say', value: 'null'},
    ]);

    const [birthDate, setBirthDate] = useState(new Date());
    const birthDateDialogRef = useRef(0);
    const modalRef = useRef(null);

    useEffect(() => {
        getUserData(props.user.id).then((val) => updateProfileFieldValuesFromObj(val))
    }, [])

    useEffect(() => {
        if(!isGenderOpen && genderSelection != null)
        {
            updateProfileObj()
        }
    }, [isGenderOpen])


    const updateProfileObj = () => {
        getUserData(props.user.id).then((user) => {
            if(user)
            {
                user.basicInfo.lastName = lastName
                user.basicInfo.firstName = firstName 
                user.basicInfo.gender = genderSelection
                user.basicInfo.birthDate = birthDate 
                user.basicInfo.phoneNumber = phoneNumber 
                postUserData(user)
            }
        })
    }

    const updateProfileFieldValuesFromObj = (userObj) => {
        setLastName(userObj.basicInfo.firstName)
        setFirstName(userObj.basicInfo.lastName)
        setGenderSelection(userObj.basicInfo.gender)
        setBirthDate(userObj.basicInfo.birthDate)
        setPhoneNumber(userObj.basicInfo.phoneNumber)
    }

    return(
        <View style={profileStyles.dropdownModalContainer}>
            <Text>HENKILÖTIEDOT</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            SUKUNIMI*
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Sukunimi..."
                            value={lastName}
                            onChangeText={(u) => {setLastName(u)}}
                            underlineColorAndroid="transparent"
                            onEndEditing={() => updateProfileObj()}
                        />
                    </View>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            ETUNIMET/ETUNIMI*
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Etunimet..."
                            value={firstName}
                            onChangeText={(p) => {setFirstName(p)}}
                            underlineColorAndroid="transparent"
                            onEndEditing={() => updateProfileObj()}
                        />
                    </View>
                </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            SYNTYMÄAIKA
                        </Text>
                        <CalendarSelection
                            placeholder="PP.KK.VVVV"
                            onValueChange={(p) => {setBirthDate(p); updateProfileObj()}}
                        />
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            SUKUPUOLI
                        </Text>
                        <DropDownPicker
                            style={profileStyles.profileInputField}
                            open={isGenderOpen}
                            value={genderSelection}
                            items={genderItems}
                            setOpen={setGenderOpen}
                            setValue={setGenderSelection}
                            setItems={setGenderItems}
                        >
                            <Text style={{color: 'grey'}}>
                                 SUKUPUOLI 
                            </Text>
                        </DropDownPicker>
                    </View>
                </View>
            <Text>YHTEYSTIEDOT</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            MATKAPUHELIN
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputFieldLong}
                            placeholder="MATKAPUHELIN NRO."
                            value={phoneNumber}
                            onChangeText={(p) => {setPhoneNumber(p)}}
                            underlineColorAndroid="transparent"
                            onEndEditing={() => updateProfileObj()}
                        />
                    </View>
                    </View>
        </View>
    )
}