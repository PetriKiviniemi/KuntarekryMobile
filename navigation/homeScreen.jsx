import React, { useState, useEffect, useCallback, useRef} from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles, { Colors } from '../styles';
import dummySearchResults from './dummySearchResults';
import { storeValue, getValue, clearStorage } from '../utils/asyncstorage_utils';

import SearchAndFilter from '../widgets/searchAndFilter';


//Todo remove useless styles
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

// Button with navigation press function
const NavigationButton = ({ title, target, values }) => {
  const navigator = useNavigation();
  return (
    <ButtonComponent
      title={ title }
      buttonFunction={ () => onButtonPress(target, navigator, values) }
    />
  )
}

// Button with press function
const ButtonComponent = ({ title, buttonFunction }) => (
  <View style={ styles.advancedSearchButtonContainer }>
    <TouchableOpacity 
      style={[ styles.advancedSearchButton, Styles.border ]} 
      onPress={ buttonFunction }
    >
      <Text style={ Styles.buttonLabel }>{ title }</Text>
    </TouchableOpacity>
  </View>
)

// Button with non-navigation press function
const NonNavigatingButtonComponent = ({ title, buttonFunction, values}) => (
  <ButtonComponent
    title={ title }
    buttonFunction={ () => buttonFunction(values) }
  />
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

export default function HomeScreen() {

  //REMOVES ALL OF ASYNC STORAGE SO BE CAREFUL!
  const clearAsyncStorage = async () => {
    await clearStorage()
  }

  return (
    <KeyboardAvoidingView style={[styles.container]} behavior='height'>
      <TitleSection />
      <View style={{margin: 8}}>
        <TitleRow size={24} title={'Hae työpaikkoja'} />

        <SearchAndFilter showPastSearches = {true}></SearchAndFilter>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <NavigationButton title={ 'Hakutulosproto' } target={ 'SearchResults' } values={ dummySearchResults } />

          {/*For testing onboarding*/}
          <NavigationButton title={ 'Onboardingiin' } target={ 'OnboardingNavigator' } values={null}/>

          {/*DEV STUFF DO NOT REMOVE MIGHT NEED IN THE FUTURE */}
          <View style = {{flexDirection: 'row', justifyContent: 'space-around', padding: 10}} >
              <Button title="Poista KAIKKI AsyncStoragesta"
              onPress={() => {clearAsyncStorage()}}
              ></Button>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
}
