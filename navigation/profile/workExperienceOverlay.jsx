import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox'
import DropDownPicker from 'react-native-dropdown-picker';
import Styles from '../../styles';
import {profileStyles} from './profileStyles'
import { AddContentButton, SaveButton, CancelButton, TextInputImmutable, CheckBoxImmutable } from './profileMisc';
import { getUserData } from '../../utils/asyncstorage_utils';
import { CalendarSelection } from './calendarSelection';
import { postUserData } from '../../utils/asyncstorage_utils';

export const WorkExperienceOverlay = (props) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [dataList, setDataList] = useState([])

    const toggleModalCallback = () => {
        setModalVisible(!modalVisible)
    }

    const saveDataToList = (data) => {
        setModalVisible(false)

        let uniqId = Date.now()
        data['uniqId'] = uniqId
        let newList = [...dataList, data]
        updateDataList(newList)
    }

    const updateDataList = (newDataList) => {
        console.log("UPDATING DATALIST")

        setDataList(newDataList)
        getUserData(props.user.id).then((user) => {
            if(user)
            {
                user.additionalEducation = newDataList
                props.user.additionalEducation = newDataList
                postUserData(user)
            }
        })
    }

    const closeModal = () => {
        updateDataList(dataList)
        setModalVisible(false)
    }

    const deleteFromDataList = (uniqId) => {
        let tmp = dataList 
        tmp = tmp.filter((obj) => {
            return obj.uniqId !== uniqId
        })
        updateDataList(tmp)
    }

    useEffect(() => {
        setDataList(props.user.additionalEducation)
    }, [])

    return(
        <View style={profileStyles.dropdownModalContainer}>
            <Text style={{fontSize: 22}}>LISÄÄ KOULUTUS</Text>
                <View
                    style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginVertical: 5,
                    }}
                />
                {dataList.map((val, idx) => {
                    return(
                        <WorkExperienceOverlayImmutable 
                            key={idx}
                            data={val}
                            deleteFromDataList={deleteFromDataList}
                        />
                    )
                })}

                <AddContentButton title="LISÄÄ KOULUTUS" callback={toggleModalCallback}/>
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
                        <WorkExperienceModal
                            closeModal={closeModal}
                            saveDataToList={saveDataToList}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const WorkExperienceOverlayImmutable = (props) => {
    return(
        <View style={profileStyles.overlayPopupContainer}>
            <View style={Styles.row2}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginHorizontal: 10
                    }}>

                    <TouchableOpacity style={profileStyles.deleteButton} onPress={() => props.deleteFromDataList(props.data.uniqId)}>
                        <Text style={{color: 'white'}}>POISTA</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <View style={profileStyles.inputFieldsContainerLeft}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            Koulutus 
                        </Text>
                        <TextInputImmutable text={props.data.education}/>
                    </View>

                </View>
                <View style={profileStyles.inputFieldsContainerLeft}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            Kuvaus 
                        </Text>
                        <TextInputImmutable text={props.data.educationDesc} long={true}/>
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

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            Kesto (PV)
                        </Text>
                        <TextInputImmutable text={props.data.edLength}/>
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


export const WorkExperienceModal = (props) => {

    const [education, setEducation] = useState("")
    const [educationDesc, setEducationDesc] = useState("")
    const [continuesSelected, setContinuedSelected] = useState(false)
    const [school, setSchoolName] = useState("")
    const [startDate, setStartDate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    const [edLength, setEdLength] = useState("")

    const handleSave = () => {
        // Pass the degree data as object into the parent
        let educationData = {
            'education': education,
            'educationDesc': educationDesc,
            'startDate': startDate,
            'endDate': endDate,
            'continues': continuesSelected,
            'edLength': edLength,
        }

        let educationMockData = {
            'education': 'Työturvallisuuskortti',
            'educationDesc': 'Työturvallisuuskoulutus sisältää koulutusta mahdollisista työturvallisuuteen liittyvistä riskeistä ja käytännöistä',
            'startDate': "3.9.2021",
            'endDate': "20.7.2024",
            'continues': true,
            'edLength': 10,
        }

        props.saveDataToList(educationMockData)

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

        props.saveDataToList(degreeData)
    }

    const handleCancel = () => {
        props.closeModal()
    }

    return(
        <View style={profileStyles.overlayPopupContainer}>
            <View style={Styles.row2}>
                <Text style={{fontSize: 24}}>LISÄÄ KOULUTUS</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginVertical: 5,
                }}
            />
                <View style={profileStyles.inputFieldsContainerLeft}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KOULUTUS 
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Koulutus..."
                            onChangeText={(u) => {setEducation(u)}}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KUVAUS 
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputFieldLong}
                            placeholder="Kuvaus..."
                            onChangeText={(u) => {setEducationDesc(u)}}
                            underlineColorAndroid="transparent"
                        />
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
                <View style={profileStyles.inputFieldsContainerLeft}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KESTO (PV) 
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Kesto..."
                            onChangeText={(u) => {setEdLength(u)}}
                            underlineColorAndroid="transparent"
                        />
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