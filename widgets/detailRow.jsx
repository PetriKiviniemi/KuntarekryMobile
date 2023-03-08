import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles';

// Get name of icon depending on purpose
// Types correlate with job advertisement variables from API
export const getIconName = (type) => {
    switch(type) {
      case 'employment':
        return 'briefcase'
      case 'employmentType':
        return 'calendar'
      case 'jobDuration':
        return 'clock-o'
      case 'location':
        return 'map-marker'
      case 'organization':
        return 'institution'
      case 'publishingOrganization':
        return 'key'
      case 'salary':
        return 'euro'
      default:
        return 'question'
    }
  }
  
  // Row with icon and information
  export const DetailRow = ({value, type, rowStyle, iconColor}) => {
    if (!value) return null;
  
    let rowIcon = getIconName(type)
  
    return(
      <View style={rowStyle}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon 
            style={Styles.icon} 
            name={rowIcon} 
            size={Styles.iconDetailProps.size} 
            color={iconColor}
          />
        </View>
        <Text style={{flex: 10, flexWrap: 'wrap'}}>
          { value }
        </Text>
      </View> 
    )
  }
