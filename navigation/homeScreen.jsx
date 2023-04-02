import React, { useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../utils/Search_utils'
import Styles, { Colors } from '../styles';
import dummySearchResults from './dummySearchResults';
import { storeValue, getValue } from '../utils/asyncstorage_utils';
import Geolocation from '../geolocation';
import FilterOverlay from './filterOverlay'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ScrollView } from 'react-native-web';

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
  },
  filterModalContent: {
    flex: 1,
    margin: 25,
    backgroundColor: 'white',
    borderRadius: 20,
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
  filterClearButton: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: Colors.accentMain,
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

const NonNavigatingButtonComponent = ({ title, buttonFunction, values}) => {
  let contStyle, buttonStyle;
  contStyle = styles.advancedSearchButtonContainer
  buttonStyle = styles.advancedSearchButton

  return (
    <View style={ contStyle }>
      <TouchableOpacity 
        style={ [buttonStyle, Styles.border] } 
        onPress={() => buttonFunction(values)}
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

const SearchField = ({ searchFunc, searchStringFunc, updatePastSearches, searchString}) => {
  const navigator = useNavigation();
  const [searchText, setSearchText] = useState(searchString)

  useEffect(() => {
    if (searchString != "") {
      setSearchText(searchString);
    }
  },[searchString])

  return(
    <View style={ [ Styles.row2, { height: 55 } ] }>
      <View style={ [ Styles.border, styles.searchField ] }>
        <View style={ [ Styles.row2, {paddingHorizontal: 5} ] }>
          <View style={ [ Styles.alignCenter, {flex: 1,} ] } >
            <Icon name="search" size={20} color={Colors.darkMain} />
          </View>
          <View style={ { flex: 9 } }>
            <TextInput
              style={ { color: Colors.greyDark, overflow: 'hidden' } }
              placeholder='Esim. lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas'
              onChangeText={ (searchString) => {
                setSearchText(searchString)
                searchStringFunc(searchString)
              } }
              underlineColorAndroid="transparent"
              value={ searchText }
            />
          </View>
          <View style={ [ Styles.alignCenter, {flex: 1,} ] } >
            <Geolocation callback={ (text) => {
              setSearchText(text)
              searchStringFunc(text)
            } } />
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={ styles.searchButtonField } 
        onPress={ () => {
          onSearchButtonPress('SearchResults', navigator, searchFunc);
          updatePastSearches();
        } }
      >
        <Text style={ { color: Colors.lightMain, fontSize: 16 } }>HAE</Text>
      </TouchableOpacity>
    </View>
  )
}

const onPastSearchButtonPress = async (navigator, searchEngine, terms, updatePastSearches) => {
  try {
    let values = await searchEngine.searchDatabase(terms);
    navigator.navigate('SearchResults', values)
    await updatePastSearches()
  } catch (error) {
    console.log(error);
  }
}

const PastSearchButton = ({ terms, navigator, searchEngine, setSearchString, updatePastSearches }) => (
  <TouchableOpacity
    onPress={ () => {
      setSearchString(terms)
      onPastSearchButtonPress(navigator, searchEngine, terms, updatePastSearches)
    } }
    style={ [Styles.border, styles.advancedSearchButton, Styles.alignCenter, {marginTop: 5, width: '90%'}] }
  >
    <Text>{ terms }</Text>
  </TouchableOpacity>
)

const PlaceholderText = () => (
  <View style={{ alignSelf: 'center', paddingTop: 5 }}>
    <Text style={{ color: Colors.grey, fontStyle: 'italic', fontSize: 16 }}>
      Ei aiempia hakuja.
    </Text>
  </View>
)

const PastSearches = ({ pastSearches, searchEngine, setSearchString, updatePastSearches }) => {
  const navigator = useNavigation();

  const renderPastSearches = () => {
    return pastSearches.map((terms, i) => 
        <PastSearchButton 
          terms={ terms } 
          navigator={ navigator } 
          searchEngine={ searchEngine }
          setSearchString={ setSearchString }
          updatePastSearches={ updatePastSearches }
          key={ i }
        />
      )
  }

  return(
    <View style={[styles.column]}>
      <TitleRow size={24} title={'Olit kiinnostunut näistä'} />
      { pastSearches.length === 0 ?
        <PlaceholderText />
      : null }
      <View style={[Styles.alignCenter, { width: '100%' }]}>
        { renderPastSearches() }
      </View>
    </View>
  )
}

export default function HomeScreen() {
  const [searchString, setSearchString] = useState("")
  const [searchEngine, setSearchEngine] = useState(null)
  const [pastSearches, setPastSearches] = useState([])
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(false);

  const filterRef = useRef({});

  const toggleFilterModal = () => {
    setFilterModalVisibility(!filterModalVisibility);
  }
  
  const setFilter = (filter) => {
    filterRef.current = filter;
    console.log(filterRef.current)
  }

  useEffect(() => {
    setSearchEngine(new Search())
    fetchPastSearches()
  }, []);

  const fetchPastSearches = async () => {
    let past = await getValue('pastSearches')
  
    if (past) setPastSearches(past)
  }

  const searchJobAdvertisements = async () => {
    //let filters = await getValue("filter");
    let filters = filterRef.current;
    if (filters != null) {
      return (await searchEngine.searchDatabase(searchString, filters));
    } else {
      return (await searchEngine.searchDatabase(searchString));
    }
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
    //let results = await searchEngine.searchDatabase("Helsinki",{'employmentType':["Osa-aikatyö"]});
    let results = await searchEngine.searchDatabase("",{'employment':["Osa-aikatyö"]});
    console.log(JSON.stringify(results, null,2));
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
          searchString = {searchString}
        />
        <View style={{alignItems: 'center', justifyContent: 'center',}}>
          {/*<ButtonComponent title={'Tarkenna hakua'} target={'Filters'} values={null} type={'search'} />*/}
          <NonNavigatingButtonComponent title={'Tarkenna hakua'} buttonFunction={toggleFilterModal} values ={null}/>
          <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} values={dummySearchResults} type={'search'} />


          {/*For testing onboarding*/}
          <ButtonComponent title={'Onboardingiin'} target={'OnBoarding'} values={null} type={null}/>
          

          {/*DEV STUFF DO NOT REMOVE MIGHT NEED IN THE FUTURE */}
          <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 10}} >
              <Button title="Resetoi tallennus"
              onPress={() => {clearDatabase()}}
              ></Button>
          </View>
        </View>
        <View>
          <Modal 
            animationType="slide"
            transparent={true}
            visible={filterModalVisibility}
            onRequestClose={() => {
              setFilterModalVisibility(!filterModalVisibility);
            }}
          >
            <View style = {styles.filterModalContent}>
                <View style = {{flex: 13, paddingVertical: 10, paddingTop: 10}}>
                  <FilterOverlay clearTrigger = {clearTrigger} setFilter = {setFilter} setClearTrigger = {setClearTrigger}></FilterOverlay>
                </View>
                <View style = {{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style = {styles.filterClearButton}
                        onPress={() => {
                          setClearTrigger(true);
                      }}
                  >
                      <Text style = {Styles.h3}>Poista rajaukset</Text>
                  </TouchableOpacity>
                  <View style = {{flex: 1}}></View>
                  <TouchableOpacity
                    style = {{
                      marginLeft: "auto",
                      marginRight: 5,
                      height: "100%",
                    }}
                    onPress={() => setFilterModalVisibility(!filterModalVisibility)}
                    >
                      <Icon 
                        name = {"check-circle"} 
                        size={63}
                        style = {{color: Colors.accentBright}}
                      />
                  </TouchableOpacity>
                </View>
            </View>
          </Modal>
        </View>
      </View>
      <PastSearches 
        pastSearches={ pastSearches } 
        searchEngine={ searchEngine }
        setSearchString={ setSearchString }
        updatePastSearches={ updatePastSearches }
      />
    </KeyboardAvoidingView>
  );
}
