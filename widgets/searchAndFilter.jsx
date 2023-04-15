import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../utils/Search_utils'
import Styles, { Colors } from '../styles';
import { storeValue, getValue } from '../utils/asyncstorage_utils';
import Geolocation from '../geolocation';
import FilterOverlay from '../navigation/filterOverlay'
import { TitleRow, PlaceholderText, ButtonComponent } from './layoutDefaultWidgets';

const styles = StyleSheet.create({
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
  },
  sortAndFilterContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  filterButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
})

/**
 * SEARCH FIELD
 * 
 * Field with text input for search terms, geolocation widget, and button
 */

const SearchField = ({ searchFunc, searchStringFunc, updatePastSearches, searchString, showPastSearches, filterRef}) => {
  const navigator = useNavigation();
  const [searchText, setSearchText] = useState(searchString)

  useEffect(() => {
    if (searchString != "") {
      setSearchText(searchString);
    }
  },[searchString])

  return(
    <View style={ [ Styles.row2, { height: 55, paddingHorizontal: 5 } ] }>
      <View style={ [ Styles.border, styles.searchField ] }>
        <View style={ [ Styles.row2, {paddingHorizontal: 5} ] }>
          <View style={ [ Styles.alignCenter, {flex: 1,} ] } >
            <Icon name="search" size={ 20 } color={ Colors.darkMain } />
          </View>
          <View style={ { flex: 9 } }>
            <TextInput
              style={ { color: Colors.greyDark, overflow: 'hidden' } }
              placeholder='Esim. Opettaja'
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
        onPress={ async () => {
          await updatePastSearches(searchText);
          onSearchButtonPress('SearchResults', navigator, searchFunc, searchString, showPastSearches, filterRef);
        } }
      >
        <Text style={ { color: Colors.lightMain, fontSize: 16 } }>HAE</Text>
      </TouchableOpacity>
    </View>
  )
}

const onSearchButtonPress = async (target, navigator, searchFunc, searchString, showPastSearches, filterRef) => {
  if (!showPastSearches) {
    let values = {"searchString": searchString}
    if ((filterRef.current != {}) && (filterRef.current != null) && (filterRef.current != undefined) && (Object.keys(filterRef.current).length > 0)) {
      values['filtersBool'] = true
    } else {
      values['filtersBool'] = false
    }
    values['searchResults'] = await searchFunc();
    navigator.setParams(values)
  } else {
    if (target) {
      try {
        let values = {"searchString": searchString}
        if ((filterRef.current != {}) && (filterRef.current != null) && (filterRef.current != undefined) && (Object.keys(filterRef.current).length > 0)) {
          values['filtersBool'] = true
        } else {
          values['filtersBool'] = false
        }
        values['searchResults'] = await searchFunc();
        navigator.navigate(target, values)
      } catch (error) {
        console.log(error);
      }
    }
  }
}

/**
 * PAST SEARCHES
 * 
 * Element with interactive buttons for past search terms
 */

const PastSearches = ({ pastSearches, searchEngine, updatePastSearches, filterRef }) => {
  const [pastSearchButtons, setPastSearchButtons] = useState([])
  const navigator = useNavigation();

  useEffect(() => {
    setPastSearchButtons(
      pastSearches.map((terms, i) => 
        <PastSearchButton 
          terms={ terms } 
          navigator={ navigator } 
          searchEngine={ searchEngine }
          updatePastSearches={ updatePastSearches }
          key={ i }
          filterRef = {filterRef}
        />
      )
    )
  }, [pastSearches])

  return(
    <View style={[ styles.column ]}>
      <TitleRow size={ 24 } title={ 'Olit kiinnostunut näistä' } />
      { pastSearches.length === 0 
      ?
        <PlaceholderText text={ 'Ei aiempia hakuja.' } />
      :  
        <View style={[Styles.alignCenter, { width: '100%' }]}>
          { pastSearchButtons }
        </View>
      }
    </View>
  )
}

// Button for re-running past search terms
const PastSearchButton = ({ terms, navigator, searchEngine, updatePastSearches, filterRef }) => (
  <ButtonComponent 
    title={ terms }
    buttonFunction={
      () => {
        updatePastSearches(terms)
        onPastSearchButtonPress(navigator, searchEngine, terms, updatePastSearches, filterRef)
      }
    }
    containerStyles={ { width: '100%' } }
    buttonStyles={ { width: '90%' } }
  />
)

const onPastSearchButtonPress = async (navigator, searchEngine, terms, filterRef) => {
  try {
    console.log(terms)
    let values = {"searchString": terms}
    if ((filterRef.current != {}) && (filterRef.current != null) && (filterRef.current != undefined) && (Object.keys(filterRef.current).length > 0)) {
      values['filtersBool'] = true
    } else {
      values['filtersBool'] = false
    }
    values['searchResults'] = await searchEngine.searchDatabase(terms);
    navigator.navigate('SearchResults', values)
  } catch (error) {
    console.log(error);
  }
}

/**
 * FILTER BUTTON
 * 
 * Button to trigger search filter overlay
 */

const FilterButton = ({ title, buttonFunction, values, filterRef }) => {
  let contStyle, buttonStyle;
  contStyle = styles.filterButtonContainer
  buttonStyle = styles.filterButton

  return (
    <View style={ contStyle }>
      <TouchableOpacity 
        style={ buttonStyle } 
        onPress={() => buttonFunction(values)}
      >
        <View style={[ Styles.alignCenter, { paddingHorizontal: 2, paddingTop: 5 } ]}>
          <Icon
            name ={ Object.keys(filterRef.current).length > 0 ? 'check-square-o' : null }
            size = { 15 }
            color={ Colors.accentBlue }
          />
        </View>
        <Text style={{color: Colors.accentBlue}}>{ title }</Text>
        <View style = {{paddingLeft: 8}}>
          <Icon name = "filter" size = {25} color={Colors.accentBlue}></Icon>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const SortButton = ({setSortType}) => {
  const sortTypeNameList = ["Osuvimmat", "Uusin ensin", "Hakuaika päättyy", "Sijainti"]
  const internalSortNameList = ["accurate", "newestFirst", "byEndDate", "location"]

  const [sortTypeName, setSortTypeName] = useState(sortTypeNameList[0])
  
  let contStyle, buttonStyle;
  contStyle = styles.sortButtonContainer
  buttonStyle = styles.sortButton


  const cycleSortType = () => {
    let index = sortTypeNameList.indexOf(sortTypeName)
    if (index >= 3) {
      index = 0
    } else {
      index = index + 1;
    }
    setSortTypeName(sortTypeNameList[index]);
    setSortType(internalSortNameList[index])
  }

  return (
    <View style={ contStyle }>
      <TouchableOpacity 
        style={ buttonStyle } 
        onPress={() => cycleSortType()}
        activeOpacity={0.6}
      >
        <View style = {{paddingRight: 8}}>
          <Icon name = "sort" size = {25} color={Colors.accentBlue}></Icon>
        </View>
        <Text style={{color: Colors.accentBlue}}>{ sortTypeName }</Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * SEARCH AND FILTER
 * 
 * Element with search bar, filter button and optionally past searches
 */

//showPastSearches determines if past searches are shown
const searchAndFilter = ({ showPastSearches, showSortButton , newSearchString, setSortType}) => {
  const [searchString, setSearchString] = useState("")
  const [searchEngine, setSearchEngine] = useState(null)
  const [pastSearches, setPastSearches] = useState([])
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [pastSearchVisibility, setPastSearchVisibility] = useState(false)
  const [sortButtonVisibility, setSortButtonVisibility] = useState(false)

  const filterRef = useRef({});

  const isFocused = useIsFocused();

  const toggleFilterModal = () => {
    setFilterModalVisibility(!filterModalVisibility);
  }
  
  const setFilter = (filter) => {
    filterRef.current = filter;
  }

  const loadFilter = useCallback(async () => {
    const filterLoadValue = await getValue('filter');
    if ((filterLoadValue != null) && (!filterLoadValue != undefined)) {
      filterRef.current = filterLoadValue;
    } else {
      filterRef.current = {}
    }
  }, [])

  useEffect(() => {
    setSearchEngine(new Search())
    if (showPastSearches) {
      setPastSearchVisibility(true)
    }
    if (showSortButton) {
      setSortButtonVisibility(true)
    }
  }, []);

  useEffect(() => {
    fetchPastSearches()
    loadFilter()
  }, [isFocused])

  useEffect(() => {
    if (newSearchString) {
      setSearchString(newSearchString)
    }
  }, [newSearchString])

  const fetchPastSearches = useCallback(async () => {
    let past = await getValue('pastSearches')

    if (past) setPastSearches(past)
  }, [])

  const searchJobAdvertisements = async () => {
    let filters = filterRef.current;
    if (filters != null) {
      return (await searchEngine.searchDatabase(searchString, filters));
    } else {
      return (await searchEngine.searchDatabase(searchString));
    }
  }

  const updatePastSearches = async (terms) => {
    let newString = terms.trim()

    if (newString.length === 0) return
  
    let newSearches = await getValue('pastSearches') || []

    // Remove past instances of new search
    let index = newSearches.indexOf(newString);
    if (index > -1) newSearches.splice(index, 1)

    newSearches.unshift(newString)

    if (newSearches.length > 5) newSearches.pop()

    setPastSearches(newSearches)
    await storeValue(newSearches, 'pastSearches')
  }

  return (
    <View style={{ paddingBottom: 5 }}>
      <SearchField 
        searchFunc={ searchJobAdvertisements } 
        searchStringFunc={ setSearchString }
        updatePastSearches={ updatePastSearches }
        searchString = { searchString }
        showPastSearches = { showPastSearches }
        filterRef = {filterRef}
      />
      <View style={styles.sortAndFilterContainer}>
        { sortButtonVisibility ? 
          <SortButton setSortType = {setSortType}/>
          : <View></View> 
        }
        <FilterButton
          title={'Tarkenna hakua'}
          buttonFunction={toggleFilterModal}
          values ={null}
          filterRef={ filterRef }
        />
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
                    onPress={() => { setClearTrigger(true) }}
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
      { pastSearchVisibility ? 
        <PastSearches 
          pastSearches={ pastSearches } 
          searchEngine={ searchEngine }
          updatePastSearches={ updatePastSearches }
          filterRef = {filterRef}
        /> 
        : null }
    </View>
  );
}

export default searchAndFilter;