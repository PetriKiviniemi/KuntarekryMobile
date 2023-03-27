import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles';

// Get name of icon depending on purpose
export const getIconName = (type) => {
    switch(type) {
      // Types correlate with job advertisement variables from API
      case 'employment':
        return 'briefcase'
      case 'employmentType':
        return 'calendar'
      case 'jobDuration':
        return 'clock-o'
      case 'language':
        return 'comment'
      case 'location':
        return 'map-marker'
      case 'organization':
        return 'institution'
      case 'publishingOrganization':
        return 'key'
      case 'region':
        return 'map'
      case 'salary':
        return 'euro'
      // Layout defaults
      case 'goBack':
        return 'undo'
      default:
        return 'question'
    }
  }
  
  // Row with icon and information
  export const DetailRow = ({value, type, rowStyle, iconColor, flexed=true}) => {
    if (!value) return null;
  
    let rowIcon = getIconName(type)

    let iconStyle = flexed ? [{ flex: 1 }, Styles.alignCenter] : Styles.alignCenter
    let textStyle = flexed ? { flex: 10, flexWrap: 'wrap' } : { flexWrap: 'wrap' }
  
    return(
      <View style={rowStyle}>
        <View style={iconStyle}>
          <Icon 
            style={Styles.icon} 
            name={rowIcon} 
            size={Styles.iconDetailProps.size} 
            color={iconColor}
          />
        </View>
        <Text style={textStyle}>
          { value }
        </Text>
      </View> 
    )
  }
