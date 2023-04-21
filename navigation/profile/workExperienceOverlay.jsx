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
                user.workExperience = newDataList
                props.user.workExperience = newDataList
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
        if (props.user.workExperience) {
            setDataList(props.user.workExperience)
        }
    }, [])

    return(
        <View style={profileStyles.dropdownModalContainer}>
            <Text style={{fontSize: 22}}>LISÄÄ TYÖKOKEMUS</Text>
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

                <AddContentButton title="LISÄÄ TYÖKOKEMUS" callback={toggleModalCallback}/>
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

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <CheckBoxImmutable value={props.data.isLatestExp}/>
                        <Text style={{paddingHorizontal: 10, fontSize: 14}}>VIIMEISIN TYÖKOKEMUKSENI</Text>
                    </View>
                    <TouchableOpacity style={profileStyles.deleteButton} onPress={() => props.deleteFromDataList(props.data.uniqId)}>
                        <Text style={{color: 'white'}}>POISTA</Text>
                    </TouchableOpacity>
                </View>
            </View>

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            TYÖNANTAJA
                        </Text>
                        <TextInputImmutable text={props.data.boss}/>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            TEHTÄVÄNIMIKE 
                        </Text>
                        <TextInputImmutable text={props.data.workTitle}/>
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

                <View style={profileStyles.inputFieldsContainerLeft}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            Kuvaus
                        </Text>
                        <TextInputImmutable text={props.data.workDesc} long={true} tall={true}/>
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


    const [isLatestExp, setIsLatestExp] = useState(false)
    const [boss, setBoss] = useState("")
    const [workTitle, setWorkTitle] = useState("")
    const [workDesc, setWorkDesc]= useState("")
    const [startDate, setStartDate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    const [continuesSelected, setContinuedSelected] = useState(false)

    const handleSave = () => {
        // Pass the degree data as object into the parent
        let workExpData = {
            'isLatestExp': isLatestExp,
            'boss': boss,
            'workTitle': workTitle,
            'workDesc': workDesc,
            'startDate': startDate,
            'endDate': endDate,
            'continues': continuesSelected,
        }

        let workExpMockData= {
            'isLatestExp': true,
            'boss': "MaailmanParasTyönantaja",
            'workTitle': "Rakennustyömaasiivoaja",
            'workDesc': "Siivoilin rakennustyömaan pihaa",
            'startDate': "3.9.2021",
            'endDate': "20.7.2024",
            'continues': true,
        }

        props.saveDataToList(workExpMockData)

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
                <Text style={{fontSize: 24}}>LISÄÄ TYÖKOKEMUS</Text>
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
                    value={isLatestExp}
                    onValueChange={setIsLatestExp}
                    style={profileStyles.checkbox}
                />
                <Text>TÄMÄ ON TÄMÄN HETKINEN / VIIMEISIN TYÖKOKEMUKSENI</Text>
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
                            TYÖNANTAJA
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Työnantaja..."
                            onChangeText={(u) => {setBoss(u)}}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            TEHTÄVÄNIMIKE
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Tehtävänimike..."
                            onChangeText={(p) => {setWorkTitle(p)}}
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

                <View style={profileStyles.inputFieldsContainer}>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            KUVAUS 
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputFieldLongTall}
                            placeholder="Kuvaus..."
                            onChangeText={(u) => {setWorkDesc(u)}}
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