import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeartButton from '../widgets/heartButton';
import formatTime from '../widgets/formatTime';
import { DetailRow } from '../widgets/detailRow';
import Styles, { Colors } from '../styles';

export const resultStyle = StyleSheet.create({
  jobInfoBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
    width: '90%',
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

// Job title and heart button
const HeaderRow = ({values}) => (
  <View style={Styles.row2}>
    <Text style={[Styles.h3, {flex: 17}]}>{ values.jobAdvertisement.title }</Text>
    <View style={[Styles.row2, {marginLeft: 10, flex: 3}]}>
      <HeartButton variant={1} values={values} />
    </View>
  </View>
)

// First item from comma separated organization string
const getOrganizationString = (organization) => {
  if (!organization) return null

  return organization.split(",")[0]
}

// What happens when you tap the job advertisement
const onJobAdvertisementButtonPress = (values, navigation) => {
  console.log('Painettu: ', values.jobAdvertisement.title)
  navigation.navigate('JobAdvertisement', { values: values })
}

// Component summarizing job advertisement
const JobAdvertisementSummary = ({
  values,
  navigation,
  backgroundColor = null,
  iconColor = null
}) => {

  // Deatail row abstraction with default rowStyle and iconColor
  const DefaultDetailRow = ({ value, type }) => (
    <DetailRow 
      value={ value } 
      type={ type } 
      rowStyle={ resultStyle.textRow }  
      iconColor={ iconColor || Colors.accentDark } 
    />
  )

  return (
    <TouchableOpacity 
      style={[
        resultStyle.jobInfoBox,
        Styles.border,
        { backgroundColor: backgroundColor || Colors.accentMain }
      ]} 
      onPress={ () => onJobAdvertisementButtonPress(values, navigation) }
    >
      <HeaderRow values={values} />
      <DefaultDetailRow 
        value={getOrganizationString(values.jobAdvertisement.organization)} 
        type={'organization'} 
      />
      <DefaultDetailRow 
        value={values.jobAdvertisement.employment} 
        type={'employment'} 
      />
      <DefaultDetailRow 
        value={values.jobAdvertisement.location} 
        type={'location'} 
      />
      <Text style={Styles.row2}>
        Hakuaika päättyy { formatTime(values.jobAdvertisement.publicationEnds) }
      </Text>
    </TouchableOpacity>
  )
}

export default JobAdvertisementSummary;
