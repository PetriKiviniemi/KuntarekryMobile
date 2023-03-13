import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Divider from 'react-native-divider';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewMoreText from 'react-native-view-more-text';
import Styles, { Colors } from '../styles';
import formatTime from '../widgets/formatTime';
import HeartButton from '../widgets/heartButton';
import { DetailRow } from '../widgets/detailRow';

// Header with job title and location
const HeaderTitle = ({values}) => (
  <View>
    <Text style={Styles.h1}>
      { values.title }{ values.location ? ', ' + values.location : '' }
    </Text>
  </View>
)

// Header info section with due date, employment details, employer organization details
const HeaderInfo = ({values}) => (
  <View>
    <Text style={Styles.row2}>Hakuaika päättyy { formatTime(values.publicationEnds) }</Text>
    <DetailRow value={values.organization} type={'organization'} rowStyle={Styles.row2} iconColor={Colors.darkMain} />
    <DetailRow value={values.employment} type={'employment'} rowStyle={Styles.row2} iconColor={Colors.darkMain} />
    <DetailRow value={values.employmentType} type={'employmentType'} rowStyle={Styles.row2} iconColor={Colors.darkMain} />
  </View>
);

// Share button
const ShareButton = () => {
  const onShareButtonPress = () => {
    // Mitä tapahtuu kun painetaan jakonappia
    console.log('Jaa-nappia painettu')
  }

  return (
    <TouchableOpacity onPress={ () => onShareButtonPress() }>
      <Icon style={Styles.iconButton} size={Styles.iconButtonProps.size} name={'share-alt'} color={Styles.iconButtonProps.color}/>
    </TouchableOpacity>
  )
}

// Apply for job button
const ApplyForJobButton = () => {
  const onApplyForJobButtonPress = () => {
    // Mitä tapahtuu kun painetaan "HAE PAIKKAA" -nappia
    console.log('Hae paikkaa -nappia painettu')
  }

  return (
    <TouchableOpacity 
      style={[Styles.button, Styles.border]} 
      onPress={ () => onApplyForJobButtonPress() }
    >
      <Text style={Styles.buttonLabel}>HAE PAIKKAA</Text>
    </TouchableOpacity>
  )
}

// Buttons at the bottom of header
const HeaderButtons = ({values}) => (
  <View style={Styles.rowButton}>
    <View>
      <ApplyForJobButton />
    </View>
    <View style={[Styles.row2, {paddingEnd: 30}]}>
      <HeartButton variant={0} values={values} />
      <ShareButton />
    </View>
  </View>
)

// Header containig title, info and buttons
const HeaderLayout = ({values}) => (
  <View style={[Styles.container, Styles.containerBright]}>
    <HeaderTitle values={values.jobAdvertisement} />
    <HeaderInfo values={values.jobAdvertisement} />
    <HeaderButtons values={values} />
  </View>
)

// View more description text
const renderViewMore = (onPress) => {
  return(
    <Text style={Styles.viewToggle} onPress={onPress}>Näytä enemmän</Text>
  )
}

// View less description text
const renderViewLess = (onPress) => {
  return(
    <Text style={Styles.viewToggle} onPress={onPress}>Näytä vähemmän</Text>
  )
}

// Työkuvausta ei välttämättä ole, pitää ottaa huomioon
const JobDescription = ({values}) => {
  if (!values.jobDesc) return null

  return (
    <View style={[Styles.container, Styles.containerDim]}>
      <Text style={Styles.h2}>
        Työn kuvaus
      </Text>
      <ViewMoreText
          numberOfLines={15}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{textAlign: 'left'}}
        >
        <Text>
          { values.jobDesc }
        </Text>
      </ViewMoreText>
    </View>
  )  
}

// Lista yksityiskohtaisia tietoja työstä
const JobDetails = ({values}) => (
  <View style={[{paddingVertical: 20}, Styles.container, Styles.containerBright]}>
    <DetailRow value={values.publishingOrganization} type={'publishingOrganization'} rowStyle={Styles.row2} iconColor={Colors.accentDark} />
    <Divider />
    <DetailRow value={values.jobDuration} type={'jobDuration'} rowStyle={Styles.row2} iconColor={Colors.accentDark} />
    { values.jobDuration ?
      <View>
        <Divider />
      </View>
    : null }
    <DetailRow value={values.salary} type={'salary'} rowStyle={Styles.row2} iconColor={Colors.accentDark} />
  </View>
)

// Creates header row with icon on the left
const HeaderWithIcon = ({ header, iconName }) => (
  <View style={Styles.row2}>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon 
        style={Styles.icon} 
        name={iconName} 
        size={Styles.h2IconProps.size} 
        color={Styles.h2IconProps.color}
      />
    </View>
    <Text style={[Styles.h2, {flex: 10, flexWrap: 'wrap'}]}>
      { header }
    </Text>
  </View>
)

// Render contacts details
const renderContacts = (contacts) => {
  if (!contacts) return null;

  return (
    <View>
      <HeaderWithIcon header={'Yhteystiedot'} iconName={'envelope'} />
      <Text>
        { contacts }
      </Text>
    </View>
  )
}

// Returns string with format "Address, postalCode location"
// Each section is optional
const renderAddressBlock = (address, postalCode, location) => {
  if (!address && !postalCode && !location) return null;

  let codeAndLocation = '';
  if (postalCode) codeAndLocation = postalCode.concat(' ');
  if (location) codeAndLocation = codeAndLocation.concat(location);
  
  let addressString;
  if (address && codeAndLocation) {
    addressString = address.concat(', ', codeAndLocation)
  } else if (address) addressString = address
  else addressString = codeAndLocation;

  return (
    <View>
      <Text style={{color: Colors.accentDark, paddingTop: 10}}>
        { addressString }
      </Text>
    </View>
  )
}

// Returns organization details and address
const renderOrganizationAndAddress = (organizationDesc, addressBlock) => {
  if (!organizationDesc && !addressBlock) return null;

  return(
    <View>
      <HeaderWithIcon header={'Työnantaja'} iconName={'briefcase'} />
      <Text>
        { organizationDesc ? organizationDesc : null }
      </Text>
        { addressBlock }
    </View>
  )
}

// Contacts, organization details and address
const ContactInformation = ({values}) => (
  <View style={[Styles.container, Styles.containerDim]}>
    { renderContacts(values.contacts) }
    { renderOrganizationAndAddress(
      values.organizationDesc, 
      renderAddressBlock(values.address, values.postalCode, values.location)
    ) }
  </View>
)

const AdvertisementLayout = ({values}) => (
  <View>
    <HeaderLayout values={values} />
    <JobDescription values={values.jobAdvertisement} />
    <JobDetails values={values.jobAdvertisement} />
    <ContactInformation values={values.jobAdvertisement} />
  </View>
);

const JobAdvertisement = ({ route, navigation }) => {
  const { values } = route.params;

  return (
    <ScrollView>
      <AdvertisementLayout values={values} />
    </ScrollView>
  )
}

export default JobAdvertisement;
