import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Button, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox'
import {DatePicker} from "react-native-common-date-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Styles from '../../styles';
import {profileStyles} from './profileStyles'
import { AddContentButton, SaveButton, CancelButton, TextInputImmutable, CheckBoxImmutable } from './profileMisc';
import { getUserData } from '../../utils/asyncstorage_utils';
import { CalendarSelection } from './calendarSelection';
import { postUserData } from '../../utils/asyncstorage_utils';


export const DegreeOverlay = (props) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [degreeList, setDegreeList] = useState([])

    const addDegreeCallback = () => {

        setModalVisible(!modalVisible)

    }

    const saveDegreeInfo = (degreeData) => {
        setModalVisible(false)

        //TODO:: OVERWRITE EXISTING DEGREE DATA
        //BY UNIQ ID
        //ADD EDIT BUTTON TO DEGREE DATA

        let uniqId = Date.now()
        degreeData['uniqId'] = uniqId
        let newList = [...degreeList, degreeData]
        updateDegreeData(newList)
    }

    const updateDegreeData = (degreeList) => {
        //Fetch the current user
        console.log("UPDATING DEGREE LIST")
        setDegreeList(degreeList)
        getUserData(props.user.id).then((user) => {
            if(user)
            {
                //Post latest user data to db
                user.degrees = degreeList
                //Update the props.user
                //Not sure if this is smart since I don't know the statefulness of the props items
                props.user.degrees = degreeList
                postUserData(user)
            }
        })
    }

    const closeModal = () => {
        updateDegreeData(degreeList)
        setModalVisible(false)
    }

    const deleteDegreeOverlay = (uniqId) => {
        let tmp = degreeList
        tmp = tmp.filter((obj) => {
            return obj.uniqId !== uniqId
        })
        updateDegreeData(tmp)
    }

    useEffect(() => {
        //Load the degreeList from async storage
        if(props.user.degrees != undefined)
            setDegreeList(props.user.degrees)
    }, [])

    return(
        <View style={profileStyles.dropdownModalContainer}>
            <Text style={{fontSize: 22}}>LISÄÄ TUTKINTO</Text>

                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginVertical: 5,
                    }}
                />

                {degreeList != undefined ? degreeList.map((val, idx) => {
                    return(
                        <DegreeOverlayImmutable key={idx} data={val} deleteDegreeOverlay={deleteDegreeOverlay}/>
                    )
                }) : null}

                <AddContentButton title="LISÄÄ TUTKINTO" callback={addDegreeCallback}/>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={profileStyles.centeredView}>
                    <View style={profileStyles.modalView}>
                        <DegreeModal 
                            closeModal={closeModal}
                            saveDegreeInfo={saveDegreeInfo}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const DegreeOverlayImmutable = (props) => {

    return(
        <View style={profileStyles.overlayPopupContainer}>
            <View style={Styles.row2}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: 10
                    }}>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{paddingRight: 5, fontSize: 14}}>TÄMÄ ON YLIN TUTKINTONI</Text>
                        <CheckBoxImmutable value={props.data.isHighest}/>
                    </View>
                    <TouchableOpacity style={profileStyles.deleteButton} onPress={() => props.deleteDegreeOverlay(props.data.uniqId)}>
                        <Text style={{color: 'white'}}>POISTA</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            OPPILAITOS
                        </Text>
                        <TextInputImmutable text={props.data.school}/>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            TUTKINTONIMIKE 
                        </Text>
                        <TextInputImmutable text={props.data.degreeName}/>
                    </View>
                </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            VALMIUSASTE (%)
                        </Text>
                        <TextInputImmutable text={props.data.degreeProgress}/>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KOULUTUSTASO 
                        </Text>
                        <TextInputImmutable text={props.data.degreeStage}/>
                    </View>
                </View>
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            ALOITUSPVM.
                        </Text>
                        <TextInputImmutable text={props.data.startDate}/>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            PÄÄTTYMISPVM.
                        </Text>
                        <TextInputImmutable text={props.data.endDate}/>
                        <View style={profileStyles.checkBoxContainer}>
                            <Text style={{paddingRight: 5, fontSize: 14}}>Jatkuu edelleen</Text>
                            <CheckBoxImmutable value={props.data.continues}/>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginVertical: 5,
                    }}
                />
        </View>
    )
}

export const DegreeModal = (props) => {

    const [isDegreeProgressOpen, setDegreeProgressOpen] = useState(false)
    const [degreeProgresSelection, setDegreeProgresSelection] = useState(null)
    const [degreeProgressItems, setDegreeProgressItems] = useState([
        {label: '25%', value:'25%'},
        {label: '50%', value:'50%'},
        {label: '75%', value:'75%'},
        {label: '100%', value:'100%'}
    ]);

    const [isDegreeStageOpen, setDegreeStageOpen] = useState(false)
    const [degreeStageSelection, setDegreeStageSelection] = useState(false)
    const [degreeStageItems, setDegreeStageItems] = useState([
        {label: 'Highschool degree', value: 'Highschool'},
        {label: 'Bachelor\' degree', value: 'Bachelor\'s'},
        {label: 'Master\' degree', value: 'Masters\'s'},
        {label: 'Doctoral degree', value: 'Doctoral'},
    ])

    const [continuesSelected, setContinuedSelected] = useState(false)
    const [isHighestDegree, setIsHighestDegree] = useState(false)
    const [school, setSchoolName] = useState("")
    const [degreeName, setDegreeName] = useState("")
    const [startDate, setStartDate] = useState(false)
    const [endDate, setEndDate] = useState(false)

    const handleSave = () => {
        // Pass the degree data as object into the parent
        let degreeData = {
            'isHighest': isHighestDegree,
            'school': school,
            'degreeName': degreeName,
            'degreeProgress': degreeProgresSelection,
            'degreeStage': degreeStageSelection,
            'startDate': startDate,
            'endDate': endDate,
            'continues': continuesSelected
        }

        //For testing purposes
        let degreeMockData = {
            'isHighest': true,
            'school': "Oulun yliopisto",
            'degreeName': "Luonnontieteiden kandidaatti",
            'degreeProgress': "100%",
            'degreeStage': "Bachelor's degree",
            'startDate': "3.9.2021",
            'endDate': "20.7.2024",
            'continues': true 
        }

        props.saveDegreeInfo(degreeMockData)
        return

        //Nullcheck all
        if(
            school === "" ||
            degreeName === "" ||
            startDate === false ||
            endDate === false ||
            degreeStageSelection === false ||
            degreeProgresSelection === false
        )
        {
            //Display error prompt
            return
        }

        props.saveDegreeInfo(degreeData)
    }

    const handleCancel = () => {
        props.closeModal()
    }

    return(
        <View style={profileStyles.overlayPopupContainer}>
            <View style={Styles.row2}>
                <Text style={{fontSize: 24}}>LISÄÄ TUTKINTO</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginVertical: 5,
                }}
            />
            <View style={Styles.row2}>
                <CheckBox
                    value={isHighestDegree}
                    onValueChange={setIsHighestDegree}
                    style={profileStyles.checkbox}
                />
                <Text>TÄMÄ ON YLIN TUTKINTONI</Text>
            </View>
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            OPPILAITOS
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Oppilaitos..."
                            onChangeText={(u) => {setSchoolName(u)}}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            TUTKINTONIMIKE 
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Tutkinto..."
                            onChangeText={(p) => {setDegreeName(p)}}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            VALMIUSASTE (%)
                        </Text>
                        <DropDownPicker
                            style={profileStyles.profileInputField}
                            open={isDegreeProgressOpen}
                            value={degreeProgresSelection}
                            items={degreeProgressItems}
                            setOpen={setDegreeProgressOpen}
                            setValue={setDegreeProgresSelection}
                            setItems={setDegreeProgressItems}
                        >
                            <Text style={{color: 'grey'}}>
                                 Valmiusaste...
                            </Text>
                        </DropDownPicker>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KOULUTUSTASO 
                        </Text>
                        <DropDownPicker
                            style={profileStyles.profileInputField}
                            open={isDegreeStageOpen}
                            value={degreeStageSelection}
                            items={degreeStageItems}
                            setOpen={setDegreeStageOpen}
                            setValue={setDegreeStageSelection}
                            setItems={setDegreeStageItems}
                        >
                            <Text style={{color: 'grey'}}>
                                 Koulutustaso...
                            </Text>
                        </DropDownPicker>
                    </View>
                </View>
                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            ALOITUSPVM.
                        </Text>
                        <CalendarSelection
                            placeholder="PP.KK.VVVV"
                            onValueChange={setStartDate}
                        />
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            PÄÄTTYMISPVM.
                        </Text>
                        <CalendarSelection
                            placeholder="PP.KK.VVVV"
                            onValueChange={setEndDate}
                        />
                        <View style={profileStyles.checkBoxContainer}>
                            <CheckBox
                            value={continuesSelected}
                            onValueChange={setContinuedSelected}
                            style={profileStyles.checkbox}
                            />
                            <Text style={profileStyles.checkboxText}>Jatkuu edelleen</Text>
                        </View>
                    </View>
                </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <CancelButton onPressCallback={handleCancel}/>
                    </View>
                    <View style={profileStyles.inputFieldWrapper}>
                        <SaveButton onPressCallback={handleSave}/>
                    </View>
                </View>

        </View>
    )
}