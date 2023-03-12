import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import JobAdvertisementSummary, { resultStyle } from '../widgets/jobAdvertisementSummary';
import Styles from '../styles';
import searchResults from './dummySearchResults';


const SearchResults = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(searchResults);

  useEffect(() => {
    //If passed search results exist, set data as them.
    if (route.params != undefined) {
      console.log("Results exist: " + route.params)
      setData(route.params);
    }
  }, []);

  const renderSearchResults = () => {
    if (isLoading) {
      // tähän joku spinneri tms. sitten kun palautetaan oikeita hakutuloksia
      return null
    }
    //RefId added to the key to avoid duplicates
    return data.map(jobAd => <JobAdvertisementSummary values={ jobAd } key={ (jobAd.jobAdvertisement.id + jobAd.jobAdvertisement.refId)} />)
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
