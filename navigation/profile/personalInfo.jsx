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

    const [location, setLocation] = useState("")

    const [isWorkFieldOpen, setWorkFieldOpen] = useState(false)
    const [workFieldSelection, setWorkFieldSelection] = useState(null)
    const [workField, setWorkField] = useState([
        {label: 'Hallinto-ja toimistotyö', value: 'Hallinto-ja toimistotyö'},
        {label: 'Opetus- ja kulttuuriala', value: 'Opetus- ja kulttuuriala'},
        {label: 'Sosiaaliala', value: 'Sosiaaliala'},
        {label: 'Tekninen ala', value: 'Tekninen ala'},
        {label: 'Terveydenhuoltoala', value: 'Terveydenhuoltoala'},
        {label: 'Vapaaehtoistyö', value: 'Vapaaehtoistyö'},
    ])

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

    useEffect(() => {
        if(!isWorkFieldOpen && workFieldSelection != null)
        {
            updateProfileObj()
        }
    })


    const updateProfileObj = () => {
        getUserData(props.user.id).then((user) => {
            if(user)
            {
                user.basicInfo.lastName = lastName
                user.basicInfo.firstName = firstName 
                user.basicInfo.gender = genderSelection
                user.basicInfo.birthDate = birthDate 
                user.basicInfo.phoneNumber = phoneNumber 
                user.basicInfo.location = location
                user.basicInfo.workField = workFieldSelection 
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
        setLocation(userObj.basicInfo.location)
        setWorkFieldSelection(userObj.basicInfo.workFieldSelection)
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

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KUNTA
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Kunta..."
                            value={location}
                            onChangeText={(p) => {setLocation(p)}}
                            underlineColorAndroid="transparent"
                            onEndEditing={() => updateProfileObj()}
                        />
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            ALA 
                        </Text>
                        <DropDownPicker
                            style={profileStyles.profileInputField}
                            open={isWorkFieldOpen}
                            value={workFieldSelection}
                            items={workField}
                            setOpen={setWorkFieldOpen}
                            setValue={setWorkFieldSelection}
                            setItems={setWorkField}
                        >
                            <Text style={{color: 'grey'}}>
                                ALA
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