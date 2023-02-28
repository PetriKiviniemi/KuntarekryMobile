import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Divider from 'react-native-divider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';
import ViewMoreText from 'react-native-view-more-text';
import jobAd from "./dummyAdvertisement";
import Styles from '../styles';

// Icon property constants
const iconSize = 15;  // For header details and job details
const headerIconColor= 'black';
const jobDetailIconColor = 'mediumaquamarine';
const buttonIconSize = 30;
const buttonIconColor = 'black';
const h2IconSize = 20;
const h2IconColor = 'mediumaquamarine';

// Header with job title and location
const HeaderTitle = ({values}) => (
  <View>
    <Text style={Styles.h1}>
      { values.title }{ values.location ? ', ' + values.location : '' }
    </Text>
  </View>
)

// Returns formatted timestamp
const formatTime = (timeStamp) => {
  return format(new Date(timeStamp), 'dd.MM.yyyy kk:mm')
}

// Takes in array of strings, returns employment data elemet for header
const renderHeaderEmploymentData = (employmentData) => {
  let employmentText = employmentData.join(", ")

  if (employmentText.length === 0) return null

  return (
    <View style={Styles.row}>
      <Icon style={Styles.icon} name={'briefcase'} size={iconSize} color={headerIconColor}/>
      <Text>
        { employmentText }
      </Text>
    </View>
  )
}

// Header info section with due date, employment details, employer organization details
const HeaderInfo = ({values}) => (
  <View>
    <Text style={Styles.row}>Hakuaika päättyy { formatTime(values.publicationEnds) }</Text>
    { renderHeaderEmploymentData([values.employmentType, values.employment]) }
    { values.organization ? 
      <View style={Styles.row}>
        <Icon style={Styles.icon} name={'institution'} size={iconSize} color={headerIconColor}/>
        <Text>
          { values.organization }
        </Text>
      </View> 
    : null }   
  </View>
);

// Heart button
const HeartButton = () => {
  const [heartButtonState, setHeartButtonState] = useState({color: 'black', name: 'heart-o'})

  // Pressing the heart button
  const onHeartButtonPress = () => {
    if (heartButtonState.color === 'black') {
      setHeartButtonState({color: 'mediumaquamarine', name: 'heart'})
    } else {
      setHeartButtonState({color: 'black', name: 'heart-o'})
    }
  }

  return (
    <TouchableOpacity onPress={ () => onHeartButtonPress() }>
      <Icon style={Styles.iconButton} size={buttonIconSize} name={heartButtonState.name} color={heartButtonState.color}/>
    </TouchableOpacity>
  )
}

// Share button
const ShareButton = () => {
  const onShareButtonPress = () => {
    // Mitä tapahtuu kun painetaan jakonappia
  }

  return (
    <TouchableOpacity onPress={ () => onShareButtonPress() }>
      <Icon style={Styles.iconButton} size={buttonIconSize} name={'share-alt'} color={buttonIconColor}/>
    </TouchableOpacity>
  )
}

// Apply for job button
const ApplyForJobButton = () => {
  const onApplyForJobButtonPress = () => {
    // Mitä tapahtuu kun painetaan "HAE PAIKKAA" -nappia
  }

  return (
    <TouchableOpacity style={Styles.button} onPress={ () => onApplyForJobButtonPress() }>
      <Text style={Styles.buttonLabel}>HAE PAIKKAA</Text>
    </TouchableOpacity>
  )
}

// Buttons at the bottom of header
const HeaderButtons = () => (
  <View style={Styles.rowButton}>
    <View>
      <ApplyForJobButton />
    </View>
    <View style={[Styles.row, {paddingEnd: 30}]}>
      <HeartButton />
      <ShareButton />
    </View>
  </View>
)

// Header containig title, info and buttons
const HeaderLayout = ({values}) => (
  <View style={[Styles.container, Styles.containerBright]}>
    <HeaderTitle values={values} />
    <HeaderInfo values={values} />
    <HeaderButtons />
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
    <View style={Styles.row}>
      <Icon style={Styles.icon} name={'key'} size={iconSize} color={jobDetailIconColor}/>
      <Text>
        { values.publishingOrganization }
      </Text>
    </View>
    <Divider />
    { values.jobDuration ?
      <View style={Styles.row}>
        <Icon style={Styles.icon} name={'play-circle-o'} size={iconSize} color={jobDetailIconColor}/>
        <Text>
          { values.jobDuration }
        </Text>
      </View>
    : null }
    <Divider />
    { values.salary ?
    <View style={Styles.row}>
      <Icon style={Styles.icon} name={'euro'} size={iconSize} color={jobDetailIconColor}/>
      <Text>
        { values.salary }
      </Text>
    </View>
    : null }
  </View>
)

// Render contacts details
const renderContacts = (contacts) => {
  if (!contacts) return null;

  return (
    <View>
      <View style={Styles.row}>
        <Icon style={Styles.icon} name={'envelope'} size={h2IconSize} color={h2IconColor}/>
        <Text style={Styles.h2}>
          Yhteystiedot
        </Text>
      </View>
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

  let codeAndLocation;
  if (postalCode) codeAndLocation = postalCode.concat(' ');
  if (location) codeAndLocation = codeAndLocation.concat(location);
  
  let addressString;
  if (address && codeAndLocation) {
    addressString = address.concat(', ', codeAndLocation)
  } else if (address) addressString = address
  else addressString = codeAndLocation;

  return (
    <View>
      <Text style={{color: 'mediumaquamarine', paddingTop: 10}}>
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
      <View style={Styles.row}>
        <Icon style={Styles.icon} name={'briefcase'} size={h2IconSize} color={h2IconColor}/>
        <Text style={Styles.h2}>
          Työnantaja
        </Text>
      </View>
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
    <Divider />
    { renderOrganizationAndAddress(
      values.organizationDesc, 
      renderAddressBlock(values.address, values.postalCode, values.location)
    ) }
  </View>
)

const AdvertisementLayout = ({values}) => (
  <View>
    <HeaderLayout values={values} />
    <JobDescription values={values} />
    <JobDetails values={values} />
    <ContactInformation values={values} />
  </View>
);

const JobAdvertisement = () => {
  const [data, setData] = useState(jobAd);
  
  return (
    <AdvertisementLayout values={data.jobAdvertisement} />
  )
}

export default JobAdvertisement;
