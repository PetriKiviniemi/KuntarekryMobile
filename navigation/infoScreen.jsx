import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles, { Colors } from '../styles';
import ParsedTextSection from '../widgets/parsedTextSection';
import { DropdownMenu } from './profile/dropdownMenu';
import infoText from './infoText';

const infoStyles = StyleSheet.create({
  someIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  someIcon: {
    paddingRight: 25,
    fontSize: 46,
    color: Colors.accentBlue
  },
  textView: {
    flexDirection: 'row',

    paddingVertical: 3
  },
  text: {
    fontSize: 18,
  }
})

const InfoText = ({ text }) => (
  <ParsedTextSection
    text={ text } 
    viewStyle={ infoStyles.textView }
    textStyle={ infoStyles.text }
  />
)

const SocialMediaSection = () => (
  <View style={{marginBottom: 20}}>
    <View style={ infoStyles.textView }>
      <Text style={ infoStyles.text }>
        Löydät meidät myös täältä:
      </Text>
    </View>

    <View style={ infoStyles.textView }>
      <View style={infoStyles.someIconContainer}>
        <Icon style={infoStyles.someIcon} name="facebook"/>
        <Icon style={infoStyles.someIcon} name="twitter"/>
        <Icon style={infoStyles.someIcon} name="instagram"/>
        <Icon style={infoStyles.someIcon} name="linkedin"/>
      </View>
    </View>
  </View>
)

const DropDownSection = () => (
  <View style={{flexDirection: 'column'}}>
    <DropdownMenu
      title={'Työnhakijoille'}
      content={<InfoText text={ infoText.forApplicants } />}
      icon={ 'user' }
    />
    <DropdownMenu
      title={'Työnantajille'}
      content={<InfoText text={ infoText.forEmployers } />}
      icon={ 'briefcase' }
    />
    <DropdownMenu
      title={'Tietojen tallennus'}
      content={<InfoText text={ infoText.dataStorage } />}
      icon={ 'floppy-o' }
    />
    <DropdownMenu
      title={'Sijaintitiedot'}
      content={<InfoText text={ infoText.geolocation } />}
      icon={ 'globe' }
    />
  </View>
)

export default function Infoscreen({ navigation }) {
  return (
    <ScrollView style={{ marginTop: 8, marginHorizontal: 20 }}>
      <View style={ infoStyles.textView }>
        <Text style={ Styles.titleLarge }>
          Kuntarekry
        </Text>
      </View>
      <InfoText text={ infoText.intro } />
      <InfoText text={ infoText.contact } />
      <SocialMediaSection />
      <DropDownSection />
    </ScrollView>
  );
}