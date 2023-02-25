import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

import Api from './Api';
import Geolocation from './geolocation';

//Screens
import HomeScreen from './navigation/homescreen';
import Infoscreen from './navigation/infoScreen';
import FavoriteScreen from './navigation/favoriteScreen';
import ProfileScreen from './navigation/profileScreen';

//Screen names
const homeName = "Home";
const infoName = "Info";
const favoritesName = "Favorites";
const profileName = "Profile";
const textName = "Api"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = "search";
            } else if (rn === infoName) {
              iconName = "info-circle";
            } else if (rn === favoritesName) {
              iconName = "heart";
            } else if (rn === profileName) {
              iconName = "user";
            } else if (rn === textName) {
              iconName = "file-text-o";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={30} color={color}/>;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10
          },
          tabBarStyle: [{display: "flex"}]
        })}
        >

        <Tab.Screen name={textName} component={Api} />
        <Tab.Screen name={favoritesName} component={FavoriteScreen} />
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
        <Tab.Screen name={infoName} component={Infoscreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  bottomnav: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
});
