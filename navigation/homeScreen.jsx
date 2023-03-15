import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../utils/Search_utils'
import Styles, { Colors } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  column: {
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
    backgroundColor: Colors.accentMain,
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
    color: Colors.greyDark,
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
  if (target) {
    try {
      navigator.navigate(target, values)
    } catch (error) {
      console.log(error);
    }
  }
}

const ButtonComponent = ({ title, target, values, type }) => {
  const navigator = useNavigation();
  let contStyle, buttonStyle;
  if (type === 'search') {
    contStyle = styles.advancedSearchButtonContainer
    buttonStyle = styles.advancedSearchButton
  } else {
    contStyle = styles.filterButtonContainer
    buttonStyle = styles.filterButton
  }

  return (
    <View style={contStyle}>
      <Button
        style={buttonStyle}
        title={title}
        color={Colors.accentMain}
        onPress={() => onButtonPress(target, navigator, values)}
      />

    </View>
  )
}

const QuickFilterSection = () => (
  <View style={[styles.filterSectionContainer]}>
    <View style={{ marginStart: 20 }}>
      <TitleRow size={24} title={'Rajaa paikkoja nopeasti'} />
    </View>
    <View style={[styles.filterSection]}>
      <View style={[styles.filterSectionRow]}>
        <ButtonComponent title={'Kesätyö'} target={null} values={null} type={'filter'} />
        <ButtonComponent title={'Keikkatyö'} target={null} values={null} type={'filter'} />
      </View>
      <View style={[styles.filterSectionRow]}>
        <ButtonComponent title={'Työpaikka'} target={null} values={null} type={'filter'} />
        <ButtonComponent title={'Harjoittelu'} target={null} values={null} type={'filter'} />
      </View>
      <View style={[styles.filterSectionRow]}>
        <ButtonComponent title={'Avoinhaku'} target={null} values={null} type={'filter'} />
        <ButtonComponent title={'Työkokeilu'} target={null} values={null} type={'filter'} />
      </View>
      <View style={[styles.filterSectionRow]}>
        <ButtonComponent title={'Anonyymi'} target={null} values={null} type={'filter'} />
        <ButtonComponent title={'Virkasuhde'} target={null} values={null} type={'filter'} />
      </View>
      <View style={[styles.filterSectionRow]}>
        <ButtonComponent title={'Oppisopimus'} target={null} values={null} type={'filter'} />
      </View>
    </View>
  </View>
)

const TitleRow = ({ size, title }) => (
  <Text style={{ fontSize: size }}>
    {title}
  </Text>
)

const TitleSection = () => (
  <View>
    <View style={[styles.column]}>
      <TitleRow size={16} title={'Kuntarekry'} />
    </View>
    <View style={[styles.column]}>
      <TitleRow size={16} title={'Avoimet'} />
      <TitleRow size={24} title={'Työpaikat'} />
      <TitleRow size={16} title={'5000+ avointa paikkaa'} />
    </View>
  </View>
)

export default function HomeScreen() {
  const [searchString, setSearchString] = useState("")
  const [searchEngine, setSearchEngine] = useState(null)
  const [searchResults, setSearchResults] = useState(undefined)

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
      <TitleSection />
      <View style={[styles.searchSectionContainer]}>
        <TitleRow size={24} title={'Hae työpaikkoja'} />
        <View style={[styles.searchSection, Styles.border]}>
          <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Esim. lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas"
            onChangeText={(searchString) => { setSearchString(searchString) }}
            underlineColorAndroid="transparent"
          />
          <View style={[styles.buttonContainer]}>
            <Button
              style={[styles.searchButton]}
              title="Hae"
              color={Colors.accentBright}
              onPress={() => { searchJobAdvertisements() }}
            >
            </Button>
          </View>
        </View>
        <ButtonComponent title={'Tarkenna hakua'} target={null} values={null} type={'search'} />
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
        <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} values={searchResults} type={'search'} />
      </View>
      <QuickFilterSection />
    </KeyboardAvoidingView>
  );
}
