import React, {useEffect, useState} from 'react';
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles';
import {storeValue, getValue, clearStorage} from '../utils/asyncstorage_utils';
import LoginScreen from './loginScreen';

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
                        <TouchableOpacity
                            style={profileStyles.profileInputField}
                        >
                            <Text style={{color: 'grey'}}>
                                PP.KK.VVVV
                            </Text>
                            <Icon 
                                style={{fontSize: 16}}
                                name="calendar"
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={profileStyles.inputFieldWrapper}>
                        <Text>
                            SUKUPUOLI
                        </Text>
                        <TouchableOpacity
                            style={profileStyles.profileInputField}
                        >
                            <Text style={{color: 'grey'}}>
                                 SUKUPUOLI 
                            </Text>
                        </TouchableOpacity>
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

            <View style={profileStyles.dropdownsContainer}>
            <View style={profileStyles.dropdownsWrapper}>
                <DropdownMenu
                    title="PERUSTIEDOT"
                    content={<PersonalInfoModal/>}
                />
                <DropdownMenu
                    title="TUTKINNOT"
                    content={<AddContentButton title="LISÄÄ TUTKINTO"/>}
                />
                <DropdownMenu
                    title="LISÄ- JA TÄYDENNYSKOULUTUS"
                    content={<AddContentButton title="LISÄÄ TUTKINTO"/>}
                />
                <DropdownMenu
                    title="TYÖKOKEMUS"
                    content={<AddContentButton title="LISÄÄ TUTKINTO"/>}
                />
            </View>
            </View>

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
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxWidth: 150,
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
        padding: 10,
        justifyContent: 'space-around',
    }
});