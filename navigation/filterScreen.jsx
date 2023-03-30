import React, {useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';

import Styles, { Colors } from '../styles';

import Municipalities from "../utils/listOfMunicipalities.js";

import { getValue, storeValue, removeValue } from '../utils/asyncstorage_utils'



const styles = StyleSheet.create({
    basicFiltercontainer: {
        flex: 1,
        padding: 10,
    },
    complexFiltercontainer: {
        flex: 3,
        padding: 10,
    },
    allFiltersContainer: {
        padding: 10,
    },
    toggleableButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 2,
        flexWrap: "wrap"
    },
    complexFilterButton: {
        backgroundColor: Colors.accentMain,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        marginVertical: 4
    },
    complexFilterButtonToggled: {
        backgroundColor: Colors.accentBlue,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        marginVertical: 4
    },
    toggleableButton: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.accentMain,
        marginVertical: 4,
        marginHorizontal: 4

    },
    toggledButton: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.accentBlue,
        marginVertical: 4,
        marginHorizontal: 4
    },
    regionButton: {
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: Colors.accentMain,
        overflow: "hidden",
    },
    regionButtonToggled: {
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 5,
        backgroundColor: Colors.accentBlue,
        overflow: "hidden",
    },
    regionButtonInsides: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    complexFilterInsides: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    municipalityContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
        justifyContent: 'space-around',
    },
    checkbox: {
        margin: 5,
        marginRight: 10,
        alignSelf: "flex-end"
    }
})

const Filters = ({ route, navigation }) => {
    const [filter, setFilter] = useState({});
    const [locationToggled, setLocationToggled] = useState(false);
    const [jobTypeToggled, setJobTypeToggled] = useState(false);
    const [jobAreaToggled, setJobAreaToggled] = useState(false);

    const [regionToggled, setRegionToggled] = useState({})
    const [regionSelected, setRegionSelected] = useState({})
    const [municipalities, setMunicipalities] = useState(Municipalities)
    const [municipalitiesToggles, setMunicipalitiesToggles] = useState({})

    const [isChecked, setChecked] = useState(false);


    const listOfRegions = [
            "Uusimaa","Pirkanmaa","Varsinais-Suomi","Pohjois-Pohjanmaa","Keski-Suomi","Pohjois-Savo",
            "Satakunta","Päijät-Häme","Etelä-Pohjanmaa","Pohjanmaa","Lappi","Kanta-Häme","Pohjois-Karjala",
            "Kymenlaakso","Etelä-Savo","Etelä-Karjala","Kainuu","Keski-Pohjanmaa","Ahvenanmaa"
    ]

    //Initialize
    useLayoutEffect(() => {
        let newObject = {}
        for (const [key, value] of Object.entries(Municipalities)) {
            for (const municipality of value) {
                newObject[municipality] = false;
            }
        }
        let newObject2 = {}
        for (const value of listOfRegions) {
            newObject2[value] = false;
        }
        let newObject3 = {}
        for (const value of listOfRegions) {
            newObject3[value] = false;
        }
        setMunicipalitiesToggles(newObject)
        setRegionToggled(newObject2)
        setRegionSelected(newObject3)
    }, [])


    const applyFilters = () => {
        storeValue(filter, "filter");
        //const navigator = useNavigation();
        //navigator.navigate("HomeScreen")
    }

    const ComplexFilterContainer = () => {
        const toggleLocation = () => {
            setLocationToggled(!locationToggled)
        }
        const toggleJobType = () => {
            setJobTypeToggled(!jobTypeToggled)
        }
        const toggleJobArea = () => {
            setJobAreaToggled(!jobAreaToggled)
        }
        return (
          <View style={styles.complexFiltercontainer}>
            <View>
                <TouchableOpacity
                    style = {locationToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                    activeOpacity={0.8}
                    onPress={() => toggleLocation()}>
                    <View style = {styles.complexFilterInsides}>
                        <Icon name = {locationToggled ? "chevron-down" :  "chevron-right"} 
                            size={20}
                            style = {locationToggled ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                        <Text style = {Styles.h3}> Sijainti</Text>
                        <Icon name = {"map-marker"} 
                            size={30}
                            style = {{marginLeft: "auto", marginRight: 10}}
                        />
                    </View>
                </TouchableOpacity>
                <View style = {locationToggled ? {marginHorizontal: 10, marginVertical: 5} :  {display:'none',marginHorizontal: 10, marginVertical: 5}}>
                    {regionFilter()}
                </View>


                <TouchableOpacity
                    style = {jobTypeToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                    activeOpacity={0.8}
                    onPress={() => toggleJobType()}>
                    <View style = {styles.complexFilterInsides}>
                        <Icon name = {jobTypeToggled ? "chevron-down" :  "chevron-right"} 
                            size={20}
                            style = {jobTypeToggled ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                        <Text style = {Styles.h3}> Työn tyyppi</Text>
                        <Icon name = {"suitcase"} 
                            size={30}
                            style = {{marginLeft: "auto", marginRight: 5}}
                        />
                    </View>
                </TouchableOpacity>
                <View style = {jobTypeToggled ? {marginHorizontal: 10, marginVertical: 5} :  {display:'none',marginHorizontal: 10, marginVertical: 5}}>
                    {/*regionFilter()*/}
                </View>


                <TouchableOpacity
                    style = {jobAreaToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                    activeOpacity={0.8}
                    onPress={() => toggleJobArea()}>
                    <View style = {styles.complexFilterInsides}>
                        <Icon name = {jobAreaToggled ? "chevron-down" :  "chevron-right"} 
                            size={20}
                            style = {jobAreaToggled ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                        <Text style = {Styles.h3}> Tehtäväalueet</Text>
                        <Icon name = {"pencil"} 
                            size={30}
                            style = {{marginLeft: "auto", marginRight: 6}}
                        />
                    </View>
                </TouchableOpacity>
                <View style = {jobAreaToggled ? {marginHorizontal: 10, marginVertical: 5} :  {display:'none',marginHorizontal: 10, marginVertical: 5}}>
                    {/*regionFilter()*/}
                </View>

            </View>
          </View>
        )
    }

    const regionFilter = () => {
        return (
            <View style = {{padding: 2}}>
                {listOfRegions.map((region) => regionButton(region))}
            </View>
        )
    }

    const regionButton = (region) => {
        const toggleRegion = (region) => {
            let newRegionToggled = {...regionToggled};
            newRegionToggled[region] = !newRegionToggled[region]
            setRegionToggled(newRegionToggled)
        }

        const setRegionToSelected = (region) => {

            const regionSelectedBool = regionSelected[region];

            let newRegionSelected = {...regionSelected};
            newRegionSelected[region] = !newRegionSelected[region]
            setRegionSelected(newRegionSelected)

            let listOfMunicipalitiesInRegion = Municipalities[region];

            let newMunicipalityToggled = {...municipalitiesToggles};
            for (const municipality of listOfMunicipalitiesInRegion) {
                //If was true, set all to false
                let municipalityBool = !newMunicipalityToggled[municipality]
                if (regionSelectedBool) {
                    municipalityBool = false;
                }
                newMunicipalityToggled[municipality] = municipalityBool;
                updateFilter("location", municipality, municipalityBool)
            }
            setMunicipalitiesToggles(newMunicipalityToggled)


        }

        return (
            <View style = {{marginVertical: 3}}>
                <TouchableOpacity style = {regionToggled[region] ? styles.regionButtonToggled :  styles.regionButton}
                    activeOpacity = {0.8}
                    onPress={() => toggleRegion(region)}>
                    <View style = {styles.regionButtonInsides}>
                        <Icon name = {regionToggled[region] ? "chevron-down" :  "chevron-right"} 
                            size={15}
                            style = {regionToggled[region] ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                            />
                        <Text style = {{flex: 3}}>{region}</Text>

                        <View style = {{
                            borderTopColor: regionToggled[region] ? Colors.accentBlue : Colors.accentMain,
                            borderTopWidth: 30,
                            borderRightColor: "white",
                            borderRightWidth: 15,
                            borderStyle: 'solid',
                        }}>
                        </View>
                        <View style = {{backgroundColor: "white", flex: 1}}>
                            <Checkbox
                                style={styles.checkbox}
                                value={regionSelected[region]}
                                onValueChange={() => setRegionToSelected(region)}
                                color={isChecked ? Colors.accentBlue : undefined}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style = {regionToggled[region] ? null :  {display:'none'}}>
                    {municipalityContainer(region)}
                </View>
            </View>
        )
    }

    
    const municipalityContainer = (region) => {
        return (
            <View style = {styles.municipalityContainer}>
                {municipalities[region].map((municipalityName) => ClickableMunicipalityButton(municipalityName, "location"))}
            </View>
        )
    }

    const ClickableMunicipalityButton = (buttonName, filterName) => {

        const toggleMunicipality = () => {
            let newMunicipalityToggled = {...municipalitiesToggles};
            newMunicipalityToggled[buttonName] = !newMunicipalityToggled[buttonName]
            setMunicipalitiesToggles(newMunicipalityToggled)
            updateFilter(filterName, buttonName, newMunicipalityToggled[buttonName])
        }   
        return (
            <TouchableHighlight
                key={buttonName}
                style = {municipalitiesToggles[buttonName] ? styles.toggledButton :  styles.toggleableButton}
                underlayColor = "#1E90FF" 
                onPress={ () => toggleMunicipality(!municipalitiesToggles[buttonName]) }>
              <Text style = {{color: 'black', padding: 0.5}}>{buttonName}</Text>
            </TouchableHighlight>
        )
    }
    
    const ClickableFilterButton = (buttonName, filterName) => {
        const [toggled, setToggled] = useState(false);
    
        const toggleButton = (bool) => {
            setToggled(!toggled)
            updateFilter(filterName, buttonName, bool)
        }

        return (
            <TouchableHighlight
                style = {toggled ? styles.toggledButton :  styles.toggleableButton}
                underlayColor = "#1E90FF" 
                onPress={ () => toggleButton(!toggled) }>
              <Text style = {{color: 'black'}}>{buttonName}</Text>
            </TouchableHighlight>
        )
    }
    
    
    const BasicFilterContainer = (displayName, filterName, buttonParameters) => {
        return (
            <View style={styles.basicFiltercontainer}>
                <Text style = {Styles.h3}>
                    {displayName}
                </Text>
                <View style = {styles.toggleableButtonsContainer}>
                    {buttonParameters.map((buttonName) => ClickableFilterButton(buttonName, filterName))}
                </View>
            </View>
        )
    }
    
    const updateFilter = (filterName, value, bool) => {
        console.log(filterName)
        let newFilter = [];
        if (filter[filterName]) {
            newFilter = filter[filterName];
        }
    
        //If true, means we add filter, if false we remove
        if (bool) {
            if (filterName == "language") {
                let realValue = "";
                switch(value) {
                    case "Suomi":
                        realValue = "fi_FI";
                        break;
                    case "Svenska":
                        realValue = "sv_SE";
                        break;
                    case "English":
                        realValue = "en_EN";
                        break;
                }
                newFilter.push(realValue)
            } else {
                newFilter.push(value)
            }
        } else {
            if (filterName == "language") {
                let realValue = "";
                switch(value) {
                    case "Suomi":
                        realValue = "fi_FI";
                        break;
                    case "Svenska":
                        realValue = "sv_SE";
                        break;
                    case "English":
                        realValue = "en_EN";
                        break;
                }
                newFilter = newFilter.filter(name => name !== realValue);
            } else {
                newFilter = newFilter.filter(name => name !== value);
            }
        }
        let newFilterObject = {...filter};
        newFilterObject[filterName] = newFilter;
        console.log("AFTER FILTER: " + JSON.stringify(newFilterObject));
        setFilter(newFilterObject);
    }

    return (
      <View>
        <Text style = {Styles.h1}>Rajaa hakutuloksia</Text>
        <TouchableOpacity
            style = {{
                width: 175,
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                padding: 10,
                backgroundColor: Colors.accentMain,
            }}
            onPress={() => applyFilters()}
        >
            <Text style = {Styles.h2}>Käytä rajauksia</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.allFiltersContainer}>
            <ComplexFilterContainer>

            </ComplexFilterContainer>
            {BasicFilterContainer("Työn luonne", "employmentType", ["Vakinainen", "Määräaikainen"])}
            {BasicFilterContainer("Työsuhde", "employment", ["Kokoaikatyö", "Osa-aikatyö", "Vuorotyö", "Tuntityö"])}
            {BasicFilterContainer("Kieli", "language", ["Suomi", "Svenska", "English"])}
          </View>
        </ScrollView>
      </View>
    )
  }
  
export default Filters;