import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        maxHeight: 160,
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

const onButtonPress = (target, navigator) => {
    console.log('2nd', navigator)
    try{
        navigator.navigate(target)
    } catch(error){
        console.log(error);
    }
}

const ButtonComponent = ({title, target}) => {
    const navigator = useNavigation();

    return(
        <View style={[styles.advancedSearchButtonContainer]}>
            <Button 
                style={[styles.advancedSearchButton]} 
                title={title}
                onPress={() => onButtonPress(target, navigator)} 
            />
        </View>
    )
}

export default function HomeScreen() {
    const [searchString, setSearchString] = useState("")
    //const navigator = useNavigation();

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
                        <Button style={[styles.searchButton]} title="Hae">
                        </Button>
                    </View>
                </View>
                <View style={[styles.advancedSearchButtonContainer]}>
                    <Button style={[styles.advancedSearchButton]} title="Tarkenna hakua"
                    ></Button>
                </View>
                <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} />
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
