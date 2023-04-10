import React, { useState, useCallback, useLayoutEffect, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import JobAdvertisementSummary from '../widgets/jobAdvertisementSummary';
import GoBackButton from '../widgets/goBackButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles, { Colors } from '../styles';

import SearchAndFilter from '../widgets/searchAndFilter';

const browseStyle = {
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 20,
  alignSelf: 'flex-start',
  marginHorizontal: '1%',
  marginBottom: 6,
  minWidth: '33%',
  textAlign: 'center',
}

const getBrowseIconElem = (iconName, iconColor) => (
  <View style={{ alignSelf: 'center', paddingHorizontal: 10 }}>
    <Icon
      name={ iconName } 
      size={ 20 } 
      color={ iconColor }
    />
  </View>
)

const getBrowseTextElem = (labelText) => (
  <View style={{ alignSelf: 'center' }}>
    <Text>
      { labelText }
    </Text>
  </View>
)

const getBrowseButtonLabel = (direction, iconColor) => {
  let labelText, iconName;
  if (direction === 'bwd') {
    labelText = 'Taakse'
    iconName = 'chevron-left'
  } else {
    labelText = 'Eteen'
    iconName = 'chevron-right'
  }

  let txt = getBrowseTextElem(labelText)
  let icon =  getBrowseIconElem(iconName, iconColor)
            
  if (direction === 'bwd') return (<>{icon}{txt}</>)

  return (<>{txt}{icon}</>)
}

const BrowseResultsButton = ({ callback, direction, page, maxPage, scrollUp }) => {
  let bgColor = Colors.accentMain
  let iconColor = Colors.accentBlueDark
  if ((direction === 'fwd' && page === maxPage) || direction === 'bwd' && page === 1) {
    bgColor = Colors.grey
    iconColor = Colors.greyDark
  }

  return(
    <TouchableOpacity 
      style={[browseStyle, Styles.border, { alignItems: 'center', backgroundColor: bgColor }]} 
      onPress={ () => {
        callback(direction);
        scrollUp();
      } }
    >
      <View style={[Styles.row2, { alignContent:'space-between' }]}>
        { getBrowseButtonLabel(direction, iconColor) }
      </View>
    </TouchableOpacity>
  )
}

// Creates an array of search result indexes
const indexSearchResultPages = (number, itemsPerPage) => {
  let pages = [];
  let i = 0;

  while (i < ( number)) {
    pages.push(i)
    i += itemsPerPage;
  }

  return pages;
}

const SearchResults = ({ route, navigation }) => {
  const [data, setData] = useState([]);

  // Number of items per search result page
  const itemsPerPage = 5;
  const searchResultPages = indexSearchResultPages(data.length, itemsPerPage)

  // Current search result page on display
  const [activePage, setActivePage] = useState(0)

  let currentPage = activePage + 1
  let maxPage = searchResultPages.length

  // Scroll position
  const scrollRef = useRef();

  const [newSearchString, setNewSearchString] = useState("")

  const scrollUp = useCallback(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [])
  
  //Call before first render  
  useLayoutEffect(() => {
    if (route.params !== undefined) {
      console.log("Results exist!");
      setData(route.params['searchResults']);
      setNewSearchString(route.params['searchString'])
    }
  }, [route.params]);

  const renderSearchResults = () => {
    if (!data || data.length === 0) {
      // tähän joku spinneri tms. sitten kun palautetaan oikeita hakutuloksia
      return null
    }

    let startPage = searchResultPages[activePage]
    let slicedResults = data.slice(startPage, startPage + itemsPerPage)

    return slicedResults.map((jobAd, i) => <JobAdvertisementSummary values={ jobAd } navigation={ navigation } key={ i } />)
  }

  const changePage = useCallback((direction) => {
    if (direction === 'fwd') {
      let lastPage = maxPage - 1;
      if (activePage !== lastPage) setActivePage(activePage + 1)
    } else if (activePage !== 0) {
      setActivePage(activePage - 1)
    }
  }, [activePage, data])

  return (
    <ScrollView ref={ scrollRef }>
      <SearchAndFilter newSearchString = {newSearchString} />
      <GoBackButton title={ 'Takaisin etusivulle' } />
      <View style={ [ Styles.container, { alignItems: 'center', justifyContent: 'flex-start' } ] }>
      
        <Text>Löydettiin { data.length } avointa työpaikkaa</Text>
        { renderSearchResults() }
        { maxPage !== 0 ?
          <View style={ Styles.row2 }>
            <BrowseResultsButton
              callback={ changePage }
              direction={ 'bwd' }
              page={ currentPage }
              maxPage={ maxPage }
              scrollUp={ scrollUp }
            />
            <Text style={{textAlignVertical: 'center', paddingHorizontal: 10 }}>
              { currentPage } / { maxPage }
            </Text>
            <BrowseResultsButton
              callback={ changePage }
              direction={ 'fwd' }
              page={ currentPage }
              maxPage={ maxPage }
              scrollUp={ scrollUp }
            />
          </View>
        : null }
      </View>
    </ScrollView>
  )
}

export default SearchResults;