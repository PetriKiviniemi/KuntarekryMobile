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

//Explains the search
const SearchExplanationText = (props) => {
  const [searchExplanation, setSearchExplanation] = useState("")
  useLayoutEffect(() =>{
    if (props.newSearchString && props.newSearchString !== "") {
      if (props.filtersBool) {
        setSearchExplanation("Löydettiin " + props.data.length + " avointa työpaikkaa rajatulla haulla: " + "'" + props.newSearchString + "'.");
      } else {
        setSearchExplanation("Löydettiin " + props.data.length + " avointa työpaikkaa haulla: " + "'" + props.newSearchString + "'.");
      }
    } else {
      if (props.filtersBool) {
        setSearchExplanation("Löydettiin " + props.data.length + " avointa työpaikkaa rajatulla haulla.");
      } else {
        if (props.newSearchString === "") {
          setSearchExplanation("Näytetään kaikki avoimet työpaikat.");
        } else {
          setSearchExplanation("Löydettiin " + props.data.length + " avointa työpaikkaa.");
        }
      }
    }
  },[props]);
  return(
    <Text>{searchExplanation}</Text>
  )
}

const SearchResults = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [filtersBool, setFiltersBool] = useState(false)
  const [sortType, setSortType] = useState("accurate")
  const [sortedData, setSortedData] = useState([]);

  // Number of items per search result page
  const itemsPerPage = 5;
  const searchResultPages = indexSearchResultPages(data.length, itemsPerPage)

  const intialResults = useRef(null)

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
      setData(route.params['searchResults']);
      setNewSearchString(route.params['searchString'])
      setFiltersBool(route.params['filtersBool'])
    }
  }, [route.params]);

  useLayoutEffect(() => {
    if (sortType == "accurate") {
      intialResults.current = route.params['searchResults']
    }
  }, [route.params, sortType]);

  useLayoutEffect(() => {
    sortSearchResults(data, sortType)
  }, [route.params, data, sortType]);

  const changePage = useCallback((direction) => {
    if (direction === 'fwd') {
      let lastPage = maxPage - 1;
      if (activePage !== lastPage) setActivePage(activePage + 1)
    } else if (activePage !== 0) {
      setActivePage(activePage - 1)
    }
  }, [activePage, data])

  const sortSearchResults = useCallback(async () => {

    if (data == []) {
      return;
    }

    let sortedResults = null;
    let resultsCopy = [...data];
    let sortedList = []
    let startPage = searchResultPages[activePage]
    let slicedResults = []

    try {
      switch(sortType) {
        case "accurate":
          sortedResults = [...intialResults.current];
        
          /*for (const jobAd of sortedResults) {
            console.log(jobAd['jobAdvertisement']['id'])
          }  */
          break;
  
        //Sort by newest job ad
        case "newestFirst":
          sortedList = resultsCopy.sort((a, b) => {
            return new Date(b.jobAdvertisement.publicationStarts) - new Date(a.jobAdvertisement.publicationStarts);
          })
          sortedResults = sortedList;
    
          /* for (const jobAd of sortedResults) {
            console.log(jobAd['jobAdvertisement']['publicationStarts'])
          }  */
          break;
  
        //Sort by end date of job ad
        case "byEndDate":
          sortedList = resultsCopy.sort((a, b) => {
            return new Date(b.jobAdvertisement.publicationEnds) - new Date(a.jobAdvertisement.publicationEnds);
          })
          sortedResults = sortedList;

          /* for ( const jobAd of resultsCopy) {
            console.log(jobAd['jobAdvertisement']['publicationEnds'])
          } */
          break;
  
        //Sort by location of the job ad
        case "location":
          sortedList = resultsCopy.sort((a, b) => {
            let aLocation;
            let bLocation;
            if (a.jobAdvertisement.location != undefined) {
              aLocation = a.jobAdvertisement.location
            } else {
              return 1;
            }
            if (b.jobAdvertisement.location != undefined) {
              bLocation = b.jobAdvertisement.location
            }
            return aLocation.localeCompare(bLocation);
          });
          sortedResults = sortedList;
          /* for (const jobAd of sortedResults) {
            console.log(jobAd['jobAdvertisement']['location'])
          } */
          break;
  
        default: //Same as accurate
          sortedResults = [...intialResults.current];
          
          /* for (const jobAd of sortedResults) {
            console.log(jobAd['jobAdvertisement']['id'])
          }  */
          break;
      }
      slicedResults = sortedResults.slice(startPage, startPage + itemsPerPage)
      setSortedData(slicedResults)
    } catch (e) {
      console.log("Error happened" + e);
      console.log("Sort type was: " + sortType)
      //console.log(data)
    }
  });

  const renderSearchResults = () => {
    if ((!sortedData || sortedData.length === 0) && (!data || data.length === 0)) {
      return null
    }
    //console.log("First job from sorted here: " + sortedData[0].jobAdvertisement.title)

    return(sortedData.map((jobAd, i) => <JobAdvertisementSummary values={ jobAd } navigation={ navigation } key={ i } />))
  }

  return (
    <ScrollView ref={ scrollRef }>
      <SearchAndFilter newSearchString = {newSearchString} showSortButton = {true} setSortType = {setSortType}/>
      <GoBackButton title={ 'Takaisin etusivulle' } />
      <View style={ [ Styles.container, { alignItems: 'center', justifyContent: 'flex-start' } ] }>
        <SearchExplanationText newSearchString = {newSearchString} data = {data} filtersBool = {filtersBool}></SearchExplanationText>
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