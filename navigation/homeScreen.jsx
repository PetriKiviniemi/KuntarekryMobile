import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { TitleRow, NavigationButton, ButtonComponent } from '../widgets/layoutDefaultWidgets';
import dummySearchResults from './dummySearchResults';
import { storeValue, getValue, clearStorage } from '../utils/asyncstorage_utils';

import SearchAndFilter from '../widgets/searchAndFilter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  column: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
})

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
      <View style={{ margin: 8 }}>
        <TitleRow size={24} title={'Hae työpaikkoja'} />

        <SearchAndFilter showPastSearches = {true}></SearchAndFilter>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
          <NavigationButton title={ 'Hakutulosproto' } target={ 'SearchResults' } values={ dummySearchResults } />

          {/*For testing onboarding*/}
          <NavigationButton title={ 'Onboardingiin' } target={ 'OnboardingNavigator' } values={null}/>

          {/*DEV STUFF DO NOT REMOVE MIGHT NEED IN THE FUTURE */}
          <ButtonComponent title={ 'Poista KAIKKI AsyncStoragesta' } buttonFunction={ () => clearAsyncStorage() } />

      </View>
    </KeyboardAvoidingView>
  );
}
