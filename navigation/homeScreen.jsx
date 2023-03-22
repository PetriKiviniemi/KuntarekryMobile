import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../utils/Search_utils'
import Styles, { Colors } from '../styles';
import dummySearchResults from './dummySearchResults';
import { storeValue, getValue } from '../utils/asyncstorage_utils';

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  searchField: {
    backgroundColor: Colors.accentMain,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    flex: 0.85,
    paddingVertical: 10
  },
  searchButtonField: {
    backgroundColor: Colors.accentBright,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderTopColor: Colors.darkMain,
    borderBottomColor: Colors.darkMain,
    borderRightColor: Colors.darkMain,
    borderLeftColor: Colors.accentBright,
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  advancedSearchButtonContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advancedSearchButton: {
    backgroundColor: Colors.accentMain,
    padding: 10,
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
    <View style={ contStyle }>
      <TouchableOpacity 
        style={ [buttonStyle, Styles.border] } 
        onPress={() => onButtonPress(target, navigator, values)}
      >
        <Text style={Styles.buttonLabel}>{ title }</Text>
      </TouchableOpacity>
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
    <View style={ [styles.column] }>
      <TitleRow size={16} title={'Avoimet'} />
      <TitleRow size={24} title={'Työpaikat'} />
      <TitleRow size={16} title={'5000+ avointa paikkaa'} />
    </View>
  </View>
)

const onSearchButtonPress = async (target, navigator, searchFunc) => {
  if (target) {
    try {
      let values = await searchFunc();
      navigator.navigate(target, values)
    } catch (error) {
      console.log(error);
    }
  }
}

const SearchField = ({ searchFunc, searchStringFunc, updatePastSearches }) => {
  const navigator = useNavigation();

  return(
    <View style={ [ Styles.row2, { height: 55 } ] }>
      <View style={ [ Styles.border, styles.searchField ] }>
        <View style={ [ Styles.row2, {paddingHorizontal: 5} ] }>
          <View style={ [ styles.alignCenter, {flex: 1,} ] } >
            <Icon name="search" size={20} color={Colors.darkMain} />
          </View>
          <View style={ { flex: 9 } }>
            <TextInput
              style={ { color: Colors.greyDark, overflow: 'hidden' } }
              placeholder="Esim. lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas"
              onChangeText={ (searchString) => searchStringFunc(searchString) }
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={ styles.searchButtonField } 
        onPress={ () => { onSearchButtonPress('SearchResults', navigator, searchFunc);
                          updatePastSearches(); }
                }
      >
        <Text style={ { color: Colors.lightMain, fontSize: 16 } }>HAE</Text>
      </TouchableOpacity>
    </View>
  )
}

const onPastSearchButtonPress = async (navigator, searchEngine, terms) => {
  try {
    let values = await searchEngine.searchDatabase(terms);
    navigator.navigate('SearchResults', values)
  } catch (error) {
    console.log(error);
  }
}

const PastSearchButton = ({ terms, navigator, searchEngine }) => (
  <TouchableOpacity
    onPress={ () => onPastSearchButtonPress(navigator, searchEngine, terms) }
    style={ [Styles.border, styles.advancedSearchButton, styles.alignCenter, {marginTop: 5, width: '90%'}] }
  >
    <Text>{ terms }</Text>
  </TouchableOpacity>
)

const PastSearches = ({ pastSearches, searchEngine }) => {
  const navigator = useNavigation();

  const renderPastSearches = () => {
    return pastSearches.map((terms, i) => 
        <PastSearchButton terms={terms} navigator={navigator} searchEngine={searchEngine} key={i}/>
      )
  }

  return(
    <View style={[styles.column]}>
      <TitleRow size={24} title={'Olit kiinnostunut näistä'} />
      <View style={[styles.alignCenter, { width: '100%' }]}>
        { renderPastSearches() }
      </View>
    </View>
  )
}

export default function HomeScreen() {
  const [searchString, setSearchString] = useState("")
  const [searchEngine, setSearchEngine] = useState(null)
  const [pastSearches, setPastSearches] = useState([])
  //const [searchResults, setSearchResults] = useState(undefined)

  useEffect(() => {
    setSearchEngine(new Search())
    fetchPastSearches()
  }, []);

  const fetchPastSearches = async () => {
    let past = await getValue('pastSearches')
  
    if (past) setPastSearches(past)
  }

  const searchJobAdvertisements = async () => {
    return (await searchEngine.searchDatabase(searchString));
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
    //searchEngine.multiSearch('Riihimäki Henkilöstöpäällikkö');
    //searchEngine.multiSearch('Riihimäki')
  }

  const updatePastSearches = async () => {
    if (searchString) {
      let newString = searchString.trim()
      let newSearches = pastSearches.slice()

      // Remove past instances of new search
      let index = newSearches.indexOf(newString);
      if (index > -1) newSearches.splice(index, 1)

      newSearches.unshift(newString)

      if (newSearches.length > 5) newSearches.pop()

      setPastSearches(newSearches)
      await storeValue(newSearches, 'pastSearches')
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container]} behavior='height'>
      <TitleSection />
      <View style={{margin: 8}}>
        <TitleRow size={24} title={'Hae työpaikkoja'} />
        <SearchField 
          searchFunc={ searchJobAdvertisements } 
          searchStringFunc={ setSearchString }
          updatePastSearches={ updatePastSearches }
        />
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <ButtonComponent title={'Tarkenna hakua'} target={null} values={null} type={'search'} />
          <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} values={dummySearchResults} type={'search'} />
          {/* DEV STUFF DO NOT REMOVE MIGHT NEED IN THE FUTURE
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
        </View>
      </View>
      <PastSearches pastSearches={pastSearches} searchEngine={searchEngine} />
    </KeyboardAvoidingView>
  );
}
