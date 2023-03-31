import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from './styles';


const Geolocation = ({ callback }) => {
  const [enabled, setEnabled] = useState(false);
  const [waiting, setWaiting] = useState(false)
  //const [errorMsg, setErrorMsg] = React.useState("");
  //const [regionName, setRegionName] = React.useState(null);

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let regionName = await Location.reverseGeocodeAsync(location.coords)
      return regionName[0].city
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  const askPermission = useCallback(async () => {
    //console.log('askPermission')
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status === 'granted') {
      setEnabled(true)
    }
  }, [])

  const getCity = async () => {
    //console.log('getCity')
    if (!enabled) {
      await askPermission()
    }

    if (enabled) {
      setWaiting(true)
      let city = await getLocation()
      //console.log(city)
      callback(city)
      setWaiting(false)
    }
  }


  return (
    <TouchableOpacity
      onPress={ () => getCity() }
    >
      { waiting ? 
      <ActivityIndicator 
        size="small"
        color={ Colors.accentBlue }
      />
      :
      <Icon
        name={'crosshairs'}
        size={22}
        color={Colors.accentBlue}
      />
      }
    </TouchableOpacity>
  )
  /*
  return (
      <View style={{alignItems:'center'}}>
          <Text>Show geolocation</Text>
          <Switch value={enabled} onValueChange={setEnabled}/>
          <Text style={{fontSize:16}}>{
              enabled ? 
              location.coords.latitude + ":" + location.coords.longitude
              + " -> " + regionName[0].city + ", " + regionName[0].country + ", " + regionName[0].postalCode
              : errorMsg}</Text>
      </View>
  )
  */
}

export default Geolocation;