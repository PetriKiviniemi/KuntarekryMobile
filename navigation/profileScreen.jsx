import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Button, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity, ScrollView, Touchable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox'
import {DatePicker} from "react-native-common-date-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Styles from '../styles';

import {storeValue, getValue, clearStorage} from '../utils/asyncstorage_utils';
import LoginScreen from './loginScreen';

const CalendarSelection = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString())

    const selectDate = (data) => {
        setModalVisible(false)
        setSelectedDate(data)
        props.onValueChange(data)
    }

    return(
        <View style={Styles.row2}>
            <TouchableOpacity
                style={profileStyles.profileInputField}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={{color: 'grey'}}>
                    {selectedDate}
                </Text>
                <Icon 
                    style={{fontSize: 16}}
                    name="calendar"
                    color="#000"
                />
            </TouchableOpacity>
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
                        <DatePicker 
                            confirm={(date) => selectDate(date)}
                            cancel={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const DropdownMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <View style={profileStyles.dropdownContainer}>
            <TouchableOpacity 
                style={profileStyles.profileDropdown}
                onPress={() => setIsOpen(!isOpen)}
            >
                <View style={profileStyles.profileDropdownButtonWrapper}>
                    <View
                    style={profileStyles.profileDropdownButton}
                    >
                        <View
                        style={{
                            backgroundColor: '#AEE8D6',
                            alignItems: 'center',
                            justifyContent: 'center', 
                            borderRadius: 1000,
                        }}
                        >
                            <Icon 
                                style={profileStyles.dropdownIcon}
                                name="check"
                                size={20}
                                color="#000"
                            />
                        </View>
                        <Text style={{marginHorizontal: 10, fontSize: 18}}>{props.title}</Text>
                    </View>
                    <Icon
                        style={profileStyles.dropdownIcon}
                        name="caret-right"
                    />
                </View>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />

                {isOpen?
                (
                    props.content
                ) : null
                }
            </TouchableOpacity>
        </View>
    )
}

const PersonalInfoModal = () => {

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")

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

    const onBDSelectorPress = (el) => {
        if(!birthDate || birthDate == null)
        {
            setBirthDate(new Date())
        }

       // birthDateDialogRef.current.open({
       //     date: birthDate,
       //     maxDate: new Date()
       // })
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
                            onChangeText={(u) => {setLastName(u)}}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            ETUNIMET/ETUNIMI*
                        </Text>
                        <TextInput
                            style={profileStyles.profileInputField}
                            placeholder="Etunimet..."
                            onChangeText={(p) => {setFirstName(p)}}
                            underlineColorAndroid="transparent"
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
                        <TouchableOpacity
                            style={profileStyles.profileInputFieldLong}
                        >
                            <Text style={{color: 'grey'}}>
                                MATKAPUHELIN NRO.
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
        </View>
    )
}

const AddContentButton = (props) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: '#0094FF',
                flexDirection: 'row',
                margin: 10,
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 200,
                borderRadius: 10,
            }}
            onPress={() => props.callback()}
        >
            <Icon 
                style={{fontSize: 16}}
                name="plus"
                color='white'
            />
            <Text style={{fontSize: 16, padding: 10}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const SaveButton = (props) => {
    return(
        <View style={profileStyles.saveButton}>
            <TouchableOpacity
            style={profileStyles.centeredButton}
            onPress={props.onPressCallback}
            >
                <Icon
                    style={{fontSize: 18}}
                    name='save'
                    color='black'
                />
                <Text style={{paddingHorizontal: 5}}>TALLENNA</Text>
            </TouchableOpacity>
        </View>
    )
}

const CancelButton = (props) => {
    return(
        <View
        style={profileStyles.cancelButton}
        >
            <TouchableOpacity
            style={profileStyles.centeredButton}
            onPress={props.onPressCallback}
            >
                <Text>PERUUTA</Text>
            </TouchableOpacity>
        </View>
    )
}

const DegreeOverlay = () => {

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
        setDegreeList([...degreeList, degreeData])
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const deleteDegreeOverlay = (uniqId) => {
        let tmp = degreeList
        tmp = tmp.filter((obj) => {
            return obj.uniqId !== uniqId
        })
        setDegreeList(tmp)
    }

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

                {degreeList.map((val, idx) => {
                    return(
                        <DegreeOverlayImmutable data={val} deleteDegreeOverlay={deleteDegreeOverlay}/>
                    )
                })}

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
                        <DegreeOverlayPopup closeModal={closeModal} saveDegreeInfo={saveDegreeInfo}/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const TextInputImmutable = (props) => {
    return(
        <View>
            <View style={profileStyles.profileInputField}>
                <Text>{props.text}</Text>
            </View>
        </View>
    )
}

const CheckBoxImmutable = (props) => {
    return(
        <View style={{height: 30, width: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            {props.value ? <Icon
                style={{fontSize: 24}}
                name="check"
                color="#000"
             /> : <View/>}
        </View>
    )
}

const DegreeOverlayImmutable = (props) => {

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

const DegreeOverlayPopup = (props) => {

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
            'continues': false 
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
                    content={<PersonalInfoModal/>}
                />
                <DropdownMenu
                    title="TUTKINNOT"
                    content={<DegreeOverlay/>}
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

const profileStyles = StyleSheet.create({
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
    },
    profileTabContainer: {
        flex: 1,
        width: '50%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profileTabLeft: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#0094FF',
    },
    profileTabRight: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#8BBAAB',
    },
    profileTextField: {
        marginHorizontal: 20,
        paddingTop: 20,
        fontSize: 15,
    },
    dropdownsWrapper: {
        flexDirection: 'column',
    },
    dropdownsContainer: {
        flexDirection: 'column',
    },
    dropdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    profileDropdown: {
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    profileDropdownButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDropdownButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownIcon: {
        fontSize: 30,
        margin: 8,
    },
    profileDropdownModalContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    profileInputField: {
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxWidth: 150,
        maxHeight: 40,
        fontSize: 12,
        overflow: 'visible',
    },
    profileInputFieldLong: {
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 300,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    inputFieldsContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputFieldWrapper: {
        maxHeight: 80,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minHeight: 80,
    },
    centeredView: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',

        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    overlayPopupContainer: {
    },
    dropdownModalContainer: {
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    checkbox: {
        margin: 2,
    },
    saveButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AEE8D6',
        borderRadius: 5,
    },
    cancelButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3EB3CA',
        borderRadius: 5,
    },
    deleteButton: {
        borderWidth: 1,
        maxWidth: 130,
        minWidth: 130,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dc143c',
        borderRadius: 5,
    },
    centeredButton: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});