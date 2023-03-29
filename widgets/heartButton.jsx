import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles, { Colors } from '../styles';
import { storeValue, getValue } from '../utils/asyncstorage_utils';
import { useIsFocused } from "@react-navigation/native";

const emptyStyles = [
  { color: Colors.darkMain, name: 'heart-o' },
  { color: Colors.lightMain, name: 'heart' }
];

const filledStyles = [
  { color: Colors.accentContrast, name: 'heart' },
  { color: Colors.accentContrast, name: 'heart' }
]
const ITEM_NOT_FOUND = -1


// Variant 0: black outlines when not clicked, coral filled when clicked
// Variant 1: white filled when not clicked, coral filled when clicked
const HeartButton = ({variant, values}) => {
  const emptyProps = emptyStyles[variant]
  const filledProps = filledStyles[variant]
  const myId = values.jobAdvertisement.id
  const isFocused = useIsFocused()

  const [heartButtonState, setHeartButtonState] = useState(emptyProps)

  useEffect(() => {
    //console.log("Heartbutton useEffect")
    defineButtonState()
  }, [isFocused, values])

  // Tapping the heart button
  const onHeartButtonPress = async () => {
    if(isFocused) {
      if (heartButtonState.color === emptyProps.color) {
        storeToFavourites()
        setHeartButtonState(filledProps)
        console.log('Tykätty:', values.jobAdvertisement.title)
      } else {
        removeFromFavourites()
        setHeartButtonState(emptyProps)
        console.log('Ei tykätty:', values.jobAdvertisement.title)
      }
    }
  }

  const fetchFavourites = async () => {
    let favourites = await getValue('favourites')

    if (!favourites) {
      favourites = []
      await storeValue(favourites, 'favourites')
      console.log("Initialized favourites table")  
    }
    return favourites
  }

  const defineButtonState = async () => {
    let favourites = await fetchFavourites()
    let i = searchFromFavourites( favourites )

    if(i === ITEM_NOT_FOUND) {
      setHeartButtonState(emptyProps)
    } else {
      setHeartButtonState(filledProps)
    }
  }

  const storeToFavourites = async () => {
    let favourites = await fetchFavourites()

    if(favourites) {   
      favourites.push(values)
      await storeValue(favourites, 'favourites')
      console.log('Stored favourites: ', favourites)
    }
  }

  const removeFromFavourites = async () => {
    let favourites = await fetchFavourites()
    if (favourites) {
      let i = searchFromFavourites( favourites )
      if(i === ITEM_NOT_FOUND) return
  
      favourites.splice(i, 1)
      await storeValue(favourites, 'favourites')
      console.log('Stored favourites: ', favourites)
    }
  }

  const searchFromFavourites = (favourites) => {
    for (let i = 0; i < favourites.length; i++) {
      if(favourites[i].jobAdvertisement.id === myId) {
        return i
      }
    }
    return ITEM_NOT_FOUND
  }

  return (
    <TouchableOpacity 
      onPress={ () => onHeartButtonPress() }
      >
      <Icon 
        style={ Styles.iconButton }
        size={ Styles.iconButtonProps.size}
        name={ heartButtonState.name }
        color={ heartButtonState.color } 
      />
    </TouchableOpacity>    
  )
}

export default HeartButton;
