import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Divider from 'react-native-divider';
import Icon from 'react-native-vector-icons/FontAwesome';
import jobAd from "./dummyAdvertisement";

const styles = StyleSheet.create({
  containerBright: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10
  },
  containerDim: {
    backgroundColor: 'azure',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 3
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'mediumaquamarine',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '33%',
    textAlign: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center'
  },
  h1: {
    textAlign: 'left',
    marginBottom: 10,
    fontSize: 24,
  },
  h2: {
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
  },
  icon: {
    paddingEnd: 10,
    textAlignVertical: 'center',
  },
  iconButton: {
    textAlignVertical: 'center',
    padding: 5
  },
  rowButton: {
    paddingTop: 20,
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

const HeaderTitle = ({values}) => (
  <View>
    <Text style={styles.h1}>
      {values.title}{values.location ? ', ' + values.location : ''}
    </Text>
  </View>
)

const HeaderInfo = ({values}) => (
  <View>
    <Text style={styles.row}>Hakuaika päättyy {values.publicationEnds}</Text>
    <View style={styles.row}>
      <Icon style={styles.icon} name={'briefcase'} size={10} color={'black'}/>
      <Text>
        {values.employmentType ? values.employmentType : ''}{values.employment ? ', ' + values.employment : ''}
      </Text>
    </View>
    <View style={styles.row}>
      <Icon style={styles.icon} name={'institution'} size={10} color={'black'}/>
      <Text>
        {values.organization ? values.organization : ''}
      </Text>
    </View>
  </View>
);

const HeaderButtons = () => (
  <View style={styles.rowButton}>
    <View>
      <TouchableOpacity style={styles.button} onPress={()=>{}}>
        <Text style={styles.buttonLabel}>HAE PAIKKAA</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <Icon style={styles.iconButton} size={25} name={'heart-o'} color={'black'}/>
      <Icon style={styles.iconButton} size={25} name={'share-alt'} color={'black'}/>
    </View>
  </View>
)

const HeaderLayout = ({values}) => (
  <View style={styles.containerBright}>
    <HeaderTitle values={values} />
    <HeaderInfo values={values} />
    <HeaderButtons />
  </View>
)

// Työkuvausta ei välttämättä ole, pitää ottaa huomioon
const JobDescription = ({values}) => (
  <View style={styles.containerDim}>
    <Text style={styles.h2}>
      Työn kuvaus
    </Text>
    <Text>
      {values.jobDesc ? values.jobDesc : ''}
    </Text>
  </View>
)

// Näistä kaikki ei välttämättömiä, pitää ottaa huomioon
const JobDetails = ({values}) => (
  <View style={[{paddingVertical: 20}, styles.containerBright]}>
    <View style={styles.row}>
      <Icon style={styles.icon} name={'key'} size={15} color={'mediumaquamarine'}/>
      <Text>
        {values.publishingOrganization}
      </Text>
    </View>
    <Divider />
    <View style={styles.row}>
      <Icon style={styles.icon} name={'play-circle-o'} size={15} color={'mediumaquamarine'}/>
      <Text>
        {values.jobDuration ? values.jobDuration : ''}
      </Text>
    </View>
    <Divider />
    <View style={styles.row}>
      <Icon style={styles.icon} name={'euro'} size={15} color={'mediumaquamarine'}/>
      <Text>
        {values.salary ? values.salary : ''}
      </Text>
    </View>
  </View>
)

// Näistä kaikki ei välttämättömiä, pitää ottaa huomioon
// Osoite koostuu useasta osasta, joista mikään ei ole pakollinen
const ContactInformation = ({values}) => (
  <View style={styles.containerDim}>
    <View style={styles.row}>
      <Icon style={styles.icon} name={'envelope'} size={20} color={'mediumaquamarine'}/>
      <Text style={styles.h2}>
        Yhteystiedot
      </Text>
    </View>
    <Text>
      {values.contacts ? values.contacts : ''}
    </Text>
    <Divider />
    <View style={styles.row}>
      <Icon style={styles.icon} name={'briefcase'} size={20} color={'mediumaquamarine'}/>
      <Text style={styles.h2}>
        Työnantaja
      </Text>
    </View>
    <Text>
      {values.organizationDesc ? values.organizationDesc : ''}
    </Text>
    <Text style={{color: 'mediumaquamarine', paddingTop: 10}}>
      {values.address}, {values.postalCode} {values.location}
    </Text>
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
