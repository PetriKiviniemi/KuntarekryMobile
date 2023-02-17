import React, {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
import * as Location from 'expo-location';


const Geolocation = () => {
    const [enabled, setEnabled] = React.useState(false);
    const [location, setLocation] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [regionName, setRegionName] = React.useState("");

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('Permission to access location denied');
                return;
            }
            //TODO:: Define parameters, timeout, distance, accuracy etc.
            let location = await Location.getCurrentPositionAsync({});
            let regionName = await Location.reverseGeocodeAsync(location.coords)
            setRegionName(regionName)
            setLocation(location);
        })();
    }, []);


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
}

export default Geolocation;