import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

import Api from './Api';
import Geolocation from './geolocation';

import Styles from './styles';

//Screens
import HomeScreen from './navigation/homeScreen';
import Infoscreen from './navigation/infoScreen';
import FavoriteScreen from './navigation/favoritesScreen';
import ProfileScreen from './navigation/profileScreen';
import NewsScreen from './navigation/newsScreen';

//Screen names
const homeName = "Home";
const infoName = "Info";
const favoritesName = "Favorites";
const profileName = "Profile";
const newsName = "News"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          header: ({props}) => {
            return <Text style={Styles.title}>Kuntarekry</Text>
          },
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
            } else if (rn === newsName) {
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

        <Tab.Screen name={newsName} component={NewsScreen} />
        <Tab.Screen name={favoritesName} component={FavoriteScreen} />
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
        <Tab.Screen name={infoName} component={Infoscreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}