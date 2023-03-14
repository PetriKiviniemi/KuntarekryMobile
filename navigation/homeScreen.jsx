import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../utils/Search_utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    row: {
        marginLeft: 8,
        marginBottom: 20,
        marginTop: 10,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    searchSectionContainer: {
        marginLeft: 8,
        marginBottom: 20,
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxHeight: 210,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 20,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: 'transparent',
        color: '#424242',
        overflow: 'hidden',
    },
    buttonContainer: {
        flex: 1,
        marginRight: 20,
        maxWidth: 50,
    },
    searchButton: {
        padding: 10,
    },
    advancedSearchButtonContainer: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    advancedSearchButton: {
        fontSize: 32,
    },
    filterSectionContainer: {
        flex: 1,
    },
    filterSection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterSectionRow: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    filterButtonContainer: {
        minWidth: 150,
    },
    filterButton: {
    }
})

const onButtonPress = (target, navigator, values) => {
    console.log('2nd', navigator)
    try{
        //console.log(values)
        navigator.navigate(target, values)
    } catch(error){
        console.log(error);
    }
}

const ButtonComponent = ({title, target, values}) => {
    const navigator = useNavigation();

    return(
        <View style={[styles.advancedSearchButtonContainer]}>
            <Button 
                style={[styles.advancedSearchButton]} 
                title={title}
                onPress={() => onButtonPress(target, navigator, values) } 
            />
        </View>
    )
}

export default function HomeScreen() {
    const [searchString, setSearchString] = useState("")
    const [searchEngine, setSearchEngine] = useState(null)
    const [searchResults, setSearchResults] = useState(undefined)
    //const navigator = useNavigation();
    
    useEffect(() => {
        setSearchEngine(new Search())
    }, []);

    const searchJobAdvertisements = async () => {
        setSearchResults(await searchEngine.searchDatabase(searchString))
    }

    //Command for developent, do not remove
    const storeDatabase = async () => {
        searchEngine.storeDatabase()
    }
    
    //Command for developent, do not remove
    const clearDatabase = async () => {
        searchEngine.clearStoredDatabase()
    }

    //Command for developent, do not remove
    const test = async () => {
        searchEngine.test()
    }

    return (
        <KeyboardAvoidingView style={[styles.container]} behavior='height'>
            <View style={[styles.row]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    Kuntarekry 
                </Text>
            </View>
            <View style={[styles.row]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    Avoimet
                </Text>

                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Työpaikat 
                </Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    5000+ avointa paikkaa 
                </Text>
            </View>
            <View style={[styles.searchSectionContainer]}>
                <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                    Hae työpaikkoja
                </Text>
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Esim. lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas"
                        onChangeText={(searchString) => {setSearchString(searchString)}}
                        underlineColorAndroid="transparent"
                    />
                    <View style={[styles.buttonContainer]}>
                        <Button style={[styles.searchButton]} title="Hae"
                        onPress={() => {searchJobAdvertisements()}}
                        >
                        </Button>
                    </View>
                </View>
                <View style={[styles.advancedSearchButtonContainer]}>
                    <Button style={[styles.advancedSearchButton]} title="Tarkenna hakua"
                    ></Button>
                </View>
                {/* //DEV STUFF DO NOT REMOVE MIGHT NEED IN THE FUTURE
                <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 10}} >
                    <Button title="Tallennus testi"
                    onPress={() => {storeDatabase()}}
                    ></Button>
                    <Button title="Resetoi tallennus"
                    onPress={() => {clearDatabase()}}
                    ></Button>
                    <Button title="TEST"
                    onPress={() => {test()}}
                    ></Button>
                </View> */}
                <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} values = {searchResults} />
            </View>

            <View style={[styles.filterSectionContainer]}>
                <Text style={{fontSize: 24, marginStart: 20}}>
                    Rajaa paikkoja nopeasti
                </Text>
                <View style={[styles.filterSection]}>
                    <View style={[styles.filterSectionRow]}>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Kesätyö"></Button>
                        </View>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Keikkatyö"></Button>
                        </View>
                    </View>

                    <View style={[styles.filterSectionRow]}>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Työpaikka"></Button>
                        </View>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Harjoittelu"></Button>
                        </View>
                    </View>

                    <View style={[styles.filterSectionRow]}>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Avoinhaku"></Button>
                        </View>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Työkokeilu"></Button>
                        </View>
                    </View>

                    <View style={[styles.filterSectionRow]}>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Anonyymi"></Button>
                        </View>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Virkasuhde"></Button>
                        </View>
                    </View>

                    <View style={[styles.filterSectionRow]}>
                        <View style={[styles.filterButtonContainer]}>
                            <Button style={[styles.filterButton]} title="Oppisopimus"></Button>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
