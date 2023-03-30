import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import JobAdvertisement from './jobAdvertisementScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles';

const infoStyles = StyleSheet.create({
  someIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  someIcon: {
    paddingRight: 25,
    fontSize: 46,
    color: 'blue'
  },
})

export default function Infoscreen({ navigation }) {
  return (
    <View style={{flex: 1, marginTop: 8}}>
        <View style={Styles.row}>
            <Text style={{fontSize: 42, color: '#5FBCFF', textAlign: 'justify'}}>
                Kuntarekry
            </Text>
        </View>
        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold'}}>Kuntarekrystä </Text>
              löytyy tuhansia avoimia työpaikkoja kaikkialta Suomesta
            </Text>
        </View>

        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold'}}>Työnhakijoille </Text>
              tarjoamme työvälineet työpaikkojen, sijaisuuksien ja keikkatöiden
              hakemiseen sekä tietoa työskentelystä kuntaorganisaatiossa ja hyvinvointialueilla.
            </Text>
        </View>

        <View style={{flex: 0.05}}/>

        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              <Text style={{fontWeight: 'bold'}}>Työnantajille </Text>
              - kunnille, kaupungeille, hyvinvointialueille, kuntayhtymille ja
              kuntien omistamille yrityksille - tarjoamme rekrytoinnin ohjelmisto- ja
              asiantuntijapalveluja, jotka sopivat ulkoiseen ja sisäiseen rekrytointiin
              sekä sijaisuuksien hallintaan.
            </Text>
        </View>

        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
            Verkkopalvelussamme käytetään 
            <Text style={{fontWeight: 'bold'}}>evästeitä </Text>
            käyttäjäkokemuksen parantamiseen. Käyttämällä palvelua
            hyväksyt evästeiden käytön. Katso palvelun{' '}  
            <Text style={{textDecorationLine: 'underline'}} onPress={() => console.log("LINK CLICKED")}>
              tietosuojaseloste,{' '}
            </Text>
              
            <Text style={{textDecorationLine: 'underline'}} onPress={() => console.log("LINK CLICKED")}>
              tietosuojalauseke{' '} 
            </Text>
            sekä{' '}  
            <Text style={{textDecorationLine: 'underline'}} onPress={() => console.log("LINK CLICKED")}>
              saavutettavuusseloste. 
            </Text>

            </Text>
        </View>

        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
            Palautetta sivostosta voit lähettää osoitteeseen:{' '}
            <Text style={{textDecorationLine: 'underline'}} onPress={() => console.log("LINK CLICKED")}>
              tuki@kuntarekry.fi 
            </Text>
            </Text>
        </View>

        <View style={Styles.row}>
            <Text style={{fontSize: 18, textAlign: 'justify'}}>
              Löydät meidät myös täältä:
            </Text>
        </View>

        <View style={Styles.row}>
        <View style={infoStyles.someIconContainer}>
          <Icon style={infoStyles.someIcon} name="facebook"/>
          <Icon style={infoStyles.someIcon} name="twitter"/>
          <Icon style={infoStyles.someIcon} name="instagram"/>
          <Icon style={infoStyles.someIcon} name="linkedin"/>
        </View>
        </View>
    </View>
  );
}