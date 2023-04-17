
import React, {useEffect, useState} from 'react';
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storeValue, getValue, clearStorage} from '../utils/asyncstorage_utils';
import Styles from '../styles';

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    inputFieldsContainer: {
        marginBottom: 10,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: 100,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        width: '80%',
        backgroundColor: '#AEE8D6',
        color: '#424242',
        borderWidth: 1,
        borderRadius: 10,
        maxHeight: 50,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AEE8D6',
        width: '50%',
        minHeight: 50,
        borderRadius: 10,
        borderWidth: 1,
    },
    loginIcon:{
        color: 'blue',
        fontSize: 32,
    },
    recoverIcon: {
        color: 'blue',
        fontSize: 32,
    },
    newUserIcon: {
        color: 'blue',
    },
})


export default function LoginScreen({userdataCallback}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        //TODO:: CHECK LOGIN VALUES IF THEY'RE CORRECT / FOUND IN LOCAL STORAGE AND RETURN USER ID
        userdataCallback({username: username, password: password})
    }

    return(
        <View style={loginStyles.container}>
            <View style={Styles.row}>
                <Text style={ Styles.titleLarge }>
                    Kirjaudu Profiiliisi 
                </Text>
            </View>
            <View style={Styles.row}>
                <Text style={{fontSize: 16}}>
                     Jos olet jo rekisteröitynyt{'\n'}
                     työnhakijaksi/sijaiseksi Kuntarekryyn{'\n'}
                     kirjaudu syöttämällä{'\n'}
                     käyttäjätunnuksesi ja salasanasi alla{'\n'}
                     oleviin kenttiin{'\n'}
                </Text>
            </View>
            <View style={Styles.row}>
                <Text style={{textDecorationLine: 'underline', fontSize: 16}} onPress={() => console.log("Ohjevideo PRESSED")}>
                    Jos käyttäjätunnus tai salasana on{'\n'}
                    hukassa, katso tästä ohjevideo{'\n'}
                </Text>
            </View>

            <View style={Styles.row}>
                <Text style={{textDecorationLine: 'underline', fontSize: 16}} onPress={() => console.log("Kuntarekry vinkit PRESSED")}>
                    Lue täältä vinkkejä Kuntarekryn käyttöön
                </Text>
            </View>
            <View style={Styles.row}>
                <Text style={{fontSize: 22}}>
                    Kirjaudu Sisään
                </Text>
            </View>

            <View style={loginStyles.inputFieldsContainer}>
                <TextInput
                    style={loginStyles.input}
                    placeholder="Käyttäjätunnus..."
                    onChangeText={(u) => {setUsername(u)}}
                    underlineColorAndroid="transparent"
                />
                <View style={{flex:0.2}}/>
                <TextInput
                    style={loginStyles.input}
                    placeholder="Salasana..."
                    onChangeText={(p) => {setPassword(p)}}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={Styles.centeredRow}>
                <TouchableOpacity style={loginStyles.loginContainer} onPress={handleLogin}>
                    <Icon style={loginStyles.loginIcon} name="lock" size={20} color="#000"/>
                    <View style={{paddingLeft: 10}}/>
                    <Text style={{fontSize: 22}}>
                        Kirjaudu
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.centeredRow}>
                <Icon style={loginStyles.recoverIcon} name="key" size={20} color="#000"/>
                <Text style={{color: 'blue'}} onPress={() => console.log("UNOHDITKO PRESSED")}>
                    UNOHDITKO TUNNUKSEN{'\n'}
                    TAI SALASANAN?
                </Text>
            </View>
            <View style={Styles.centeredRow}>
                <Icon style={loginStyles.newUserIcon} name="user" size={20} color="#000"/>
                <Text style={{color: 'blue'}} onPress={() => console.log("UUSI HAKIJA")}>
                    UUSI HAKIJA
                </Text>
            </View>
        </View>
    )
}