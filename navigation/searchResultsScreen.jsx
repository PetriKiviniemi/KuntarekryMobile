import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import JobAdvertisementSummary, { resultStyle } from '../widgets/jobAdvertisementSummary';
import Styles from '../styles';
import searchResults from './dummySearchResults';


const SearchResults = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(searchResults);

  const renderSearchResults = () => {
    if (isLoading) {
      // tähän joku spinneri tms. sitten kun palautetaan oikeita hakutuloksia
      return null
    } 

    return data.map(jobAd => <JobAdvertisementSummary values={ jobAd } key={ jobAd.jobAdvertisement.id } />)
  }

  return (
    <ScrollView>
      <View style={[Styles.container, resultStyle.container]}>
        <Text>Löydettiin { data.length } avointa työpaikkaa</Text>
        { renderSearchResults() }
      </View>
    </ScrollView>
  )
}

export default SearchResults;
