import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import JobAdvertisementSummary from '../widgets/jobAdvertisementSummary';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles, { Colors } from '../styles';
import searchResults from './dummySearchResults';

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

const BrowseResultsButton = ({ callback, direction, page, maxPage }) => {
  let bgColor = Colors.accentMain
  let iconColor = Colors.accentBlueDark
  if ((direction === 'fwd' && page === maxPage) || direction === 'bwd' && page === 1) {
    bgColor = Colors.grey
    iconColor = Colors.greyDark
  }

  return(
    <TouchableOpacity 
      style={[browseStyle, Styles.border, { alignItems: 'center', backgroundColor: bgColor }]} 
      onPress={ () => callback(direction) }
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

  console.log(number, pages)
  return pages;
}

const SearchResults = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(searchResults)

  // Number of items per search result page
  const itemsPerPage = 2;
  const searchResultPages = indexSearchResultPages(data.length, itemsPerPage)

  // Current search result page on display
  const [activePage, setActivePage] = useState(0)

  let currentPage = activePage + 1
  let maxPage = searchResultPages.length

  useEffect(() => {
    //If passed search results exist, set data as them.
    if (route.params != undefined) {
      console.log("Results exist!");
      setData(route.params);
    }
  }, []);

  const renderSearchResults = useCallback(() => {
    if (isLoading) {
      // tähän joku spinneri tms. sitten kun palautetaan oikeita hakutuloksia
      return null
    }
    let startPage = searchResultPages[activePage]
    let slicedResults = data.slice(startPage, startPage + itemsPerPage)

    return slicedResults.map(jobAd => <JobAdvertisementSummary values={ jobAd } key={ jobAd.jobAdvertisement.id } />)
  }, [activePage, itemsPerPage, isLoading])

  const changePage = useCallback((direction) => {
    //console.log(activePage)
    if (direction === 'fwd') {
      console.log('Mennään eteenpäin');
      let lastPage = maxPage - 1;
      if (activePage !== lastPage) setActivePage(activePage + 1)
    } else if (activePage !== 0) {
      console.log('Mennään taaksepäin');
      setActivePage(activePage - 1)
    }
  }, [activePage])

  return (
    <ScrollView>
      <View style={ [ Styles.container, { alignItems: 'center', justifyContent: 'flex-start' } ] }>
        <Text>Löydettiin { data.length } avointa työpaikkaa</Text>
        { renderSearchResults() }
        <View style={ Styles.row2 }>
          <BrowseResultsButton 
            callback={ changePage } 
            direction={ 'bwd' } 
            page={ currentPage } 
            maxPage={ maxPage } 
          />
          <Text style={{textAlignVertical: 'center', paddingHorizontal: 10 }}>
            { currentPage } / { maxPage }
          </Text>
          <BrowseResultsButton 
            callback={ changePage } 
            direction={ 'fwd' } 
            page={ currentPage } 
            maxPage={ maxPage } 
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default SearchResults;
