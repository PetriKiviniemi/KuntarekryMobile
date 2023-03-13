import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles, { Colors } from '../styles';

const emptyStyles = [
  { color: Colors.darkMain, name: 'heart-o' },
  { color: Colors.lightMain, name: 'heart' }
];

const filledStyles = [
  { color: Colors.accentContrast, name: 'heart' },
  { color: Colors.accentContrast, name: 'heart' }
]

// Variant 0: black outlines when not clicked, coral filled when clicked
// Variant 1: white filled when not clicked, coral filled when clicked
const HeartButton = ({variant, values}) => {
  const emptyProps = emptyStyles[variant]
  const filledProps = filledStyles[variant]

  const [heartButtonState, setHeartButtonState] = useState(emptyProps)

  // Tapping the heart button
  const onHeartButtonPress = () => {
    if (heartButtonState.color === emptyProps.color) {
      setHeartButtonState(filledProps)
      console.log('Tykätty:', values.jobAdvertisement.title)
    } else {
      setHeartButtonState(emptyProps)
      console.log('Ei tykätty:', values.jobAdvertisement.title)
    }
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
