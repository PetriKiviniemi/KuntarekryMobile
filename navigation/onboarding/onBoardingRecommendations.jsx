import React, { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";

import GradientBackground from "./gradientBackground";
import { ButtonContainer, ChatArea } from "./chatBot";
import { Colors } from "../../styles";
import Search from '../../utils/Search_utils'
import JobAdvertisementSummary from '../../widgets/jobAdvertisementSummary';
import { PlaceholderText } from '../../widgets/layoutDefaultWidgets';
import JobAreas from "../../utils/listOfJobAreas.js"

const chatTexts = [
  { text: 'Kiitos! Näiden avulla varmasti löydetään sinulle sopiva työpaikka.' },
  { text: 'Antamiesi tietojen perusteella nämä työpaikat voisivat kiinnostaa sinua.' }
]

const defineSearchFilters = (data) => {
  let location = data.location;
  let fields = data.fields;
  let jobTypes = data.jobTypes;
  let filters = {};

  if (location.length > 0) filters['location'] = [location];

  if (jobTypes.length > 0) filters['employment'] = jobTypes;

  if (fields.length > 0) {
    let areas = [];
    fields.forEach(type => {
      console.log(type, JobAreas[type]);
      areas.push(...JobAreas[type]);
    });
    filters['taskArea'] = areas;
  }
  console.log(filters)

  if (Object.keys(filters).length === 0) return null;

  return filters;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function OnBoardingRecommendations({ route, navigation }) {
  const [filters, setFilters] = useState(defineSearchFilters(route.params))
  const [searchEngine, setSearchEngine] = useState(null)
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {
    setSearchEngine(new Search())
  }, [])

  useEffect(() => {
    const conductSearch = async () => {
      let count = 0;
      while(count < 10) {
        try {
          const results = await searchEngine.searchDatabase('', filters);
          setSearchResults(results);

          if (results) console.log(results.length); count = 10;
        } catch (error) {
          console.log('Search attempt failed: ', count+1)
        }
        count++;
        await delay(2000);
      }
    }

    if (filters && searchEngine) {
      conductSearch();
    }
  }, [filters, searchEngine])

  const renderRecommendations = useCallback(() => {
    let results = searchResults.slice() || null
    if (results?.length > 0) {
      let recs = results.slice(0, 2)
      return recs.map((rec, i) => (
        <JobAdvertisementSummary
          values={ rec }
          navigation={ navigation }
          key={ i }
          iconColor={ Colors.darkMain }
          backgroundColor={ Colors.accentGreenBright }
        />
      ))
    } else {
      return <PlaceholderText text={ 'Ei hakutuloksia.' } />
    }
  }, [searchResults])

  return (
  <GradientBackground>
    <ChatArea chatTexts={ chatTexts } />
    <View style={[ { paddingTop: 10, alignItems: 'center', justifyContent: 'flex-start' } ]}>
      { searchResults 
        ? renderRecommendations()
        : <ActivityIndicator color={ Colors.lightMain } size='large' />
      }
    </View>
    <ButtonContainer
      text={ searchResults && searchResults.length > 0
        ? 'Lisää työpaikkoja'
        : 'Takaisin etusivulle'
      }
      buttonFunc={ searchResults && searchResults.length > 0
        ? () => navigation.navigate('SearchResults', { 'searchResults': searchResults })
        : () => navigation.navigate('HomeScreen')
      }
    />
  </GradientBackground>
  );
}
