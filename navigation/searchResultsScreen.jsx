import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeartButton from '../widgets/heartButton';
import formatTime from '../widgets/formatTime';
import { DetailRow } from '../widgets/detailRow';
import Styles, { Colors } from '../styles';
import searchResults from './dummySearchResults';

const resultStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  jobInfoBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.accentMain,
    marginVertical: 5,
    width: '90%',
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

// Job title and heart button
const HeaderRow = ({values}) => (
  <View style={Styles.row2}>
    <Text style={[Styles.h3, {flex: 17}]}>{ values.jobAdvertisement.title }</Text>
    <View style={[Styles.row2, {marginLeft: 10, flex: 3}]}>
      <HeartButton variant={1} values={values} />
    </View>
  </View>
)

// First item from comma separated organization string
const getOrganizationString = (organization) => {
  if (!organization) return null

  return organization.split(",")[0]
}

// What happens when you tap the job advertisement
const onJobAdvertisementButtonPress = (values, navigation) => {
  console.log(values.jobAdvertisement.title)
  navigation.navigate('JobAdvertisement', { values: values })
}

// Component summarizing job advertisement
const JobAdvertisementSummary = ({values}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={ resultStyle.jobInfoBox } 
      onPress={ () => onJobAdvertisementButtonPress(values, navigation) }
    >
      <HeaderRow values={values} />
      <DetailRow value={getOrganizationString(values.jobAdvertisement.organization)} type={'organization'} rowStyle={resultStyle.textRow}  iconColor={Colors.accentDark} />
      <DetailRow value={values.jobAdvertisement.employment} type={'employment'} rowStyle={resultStyle.textRow}  iconColor={Colors.accentDark}  />
      <DetailRow value={values.jobAdvertisement.location} type={'location'} rowStyle={resultStyle.textRow}  iconColor={Colors.accentDark}  />
      <Text style={Styles.row2}>Hakuaika päättyy { formatTime(values.jobAdvertisement.publicationEnds) }</Text>
    </TouchableOpacity>
  )
}

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
