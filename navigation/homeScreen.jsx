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
          <ButtonComponent title={'Hakutulosproto'} target={'SearchResults'} values={dummySearchResults} type={'search'} />


          {/*For testing onboarding*/}
          <ButtonComponent title={'Onboardingiin'} target={'OnBoarding'} values={null} type={null}/>
          

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
