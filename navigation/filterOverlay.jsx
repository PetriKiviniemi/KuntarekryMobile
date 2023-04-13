import React, {useState, useLayoutEffect, useRef} from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';

import Styles, { Colors } from '../styles';
import Municipalities from "../utils/listOfMunicipalities.js";
import JobAreas from "../utils/listOfJobAreas.js";
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
        marginHorizontal: 4,
        flexGrow: 1
    },
    toggledButton: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.accentBlue,
        marginVertical: 4,
        marginHorizontal: 4,
        flexGrow: 1
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

//Contains all complex filters
const ComplexFilterContainer = ({updateFilter, fetchedFilters, filterLoad}) => {
    const [locationToggled, setLocationToggled] = useState(false);
    const [jobTypeToggled, setJobTypeToggled] = useState(false);
    const [jobAreaToggled, setJobAreaToggled] = useState(false);

    const filterLoadRef = useRef({})

    //Toggle a whole complex filter
    const toggleComplexFilter = (complexFilterName) => {
        let toggleBool = false;
        let filterLoadCopy = filterLoadRef.current
        switch (complexFilterName) {
            case "location":
                toggleBool = !locationToggled
                setLocationToggled(toggleBool)
                filterLoadCopy["locationToggled"] = toggleBool
                break;
            case "jobType":
                toggleBool = !jobTypeToggled
                setJobTypeToggled(toggleBool)
                filterLoadCopy["jobTypeToggled"] = toggleBool
                break;
            case "jobArea":
                toggleBool = !jobAreaToggled
                setJobAreaToggled(toggleBool)
                filterLoadCopy["jobAreaToggled"] = toggleBool
                break;
        }
        storeValue(filterLoadCopy, "filterLoad");
    }

    //Initialize
    useLayoutEffect( () => {
        const fetchComplexToggles= async (filterLoadCopy) => {
            const locationValue = filterLoadCopy["locationToggled"];
            const jobTypeValue = filterLoadCopy["jobTypeToggled"];
            const jobAreaValue = filterLoadCopy["jobAreaToggled"];
            if ((locationValue != null) && locationValue) {
                setLocationToggled(locationValue)
            }
            if ((jobTypeValue != null) && jobTypeValue) {
                setJobTypeToggled(jobTypeValue)
            }
            if ((jobAreaValue != null) && jobAreaValue) {
                setJobAreaToggled(jobAreaValue)
            }
        }
        filterLoadRef.current = filterLoad
        fetchComplexToggles(filterLoadRef.current)
    }, [filterLoad])

    return (
      <View style={styles.complexFiltercontainer}>
        <View>
            <TouchableOpacity
                style = {locationToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                activeOpacity={0.8}
                onPress={() => toggleComplexFilter("location")}>
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
            <View style = {{marginHorizontal: 10}}>
                {locationToggled ? (<RegionFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} filterLoad = {filterLoad}></RegionFilter>) : null}
            </View>

            {/* OLD STUFF */}
            {/*<TouchableOpacity
                style = {jobTypeToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                activeOpacity={0.8}
                onPress={() => toggleComplexFilter("jobType")}>
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
            <View style = {{marginHorizontal: 10}}>
                {jobTypeToggled ? (<JobTypeFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} filterLoad = {filterLoad}></JobTypeFilter>) : null}
            </View>*/}

            <TouchableOpacity
                style = {jobAreaToggled ? styles.complexFilterButtonToggled :  styles.complexFilterButton}
                activeOpacity={0.8}
                onPress={() => toggleComplexFilter("jobArea")}>
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
            <View style = {{marginHorizontal: 10}}>
                {jobAreaToggled ? (<JobAreaFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} filterLoad = {filterLoad}></JobAreaFilter>) : null}
            </View>
        </View>
      </View>
    )
}

//The big container for job-area filters
const JobAreaFilter = ({updateFilter, fetchedFilters, filterLoad}) => {
    const [generalJobAreaToggles, setgeneralJobAreaToggles] = useState({})
    const [generalJobAreaSelected, setGeneralJobAreaSelected] = useState({})
    const [jobAreas, setJobAreas] = useState(JobAreas)
    const [jobAreaToggles, setjobAreaToggles] = useState({})

    const listOfGeneralJobAreas = Object.keys(JobAreas);

    const filterLoadRef = useRef({})

    //Initialize
    useLayoutEffect(() => {
        const intializeToggles= async (filterLoadCopy) => {
            let jobAreaTogglesObject = {}
            const fetchedJobAreaToggles = filterLoadCopy['jobAreaToggles']
            if ((fetchedJobAreaToggles != null && fetchedJobAreaToggles)) {
                setjobAreaToggles(fetchedJobAreaToggles);
            } else {
                for (const [key, value] of Object.entries(JobAreas)) {
                    for (const jobArea of value) {
                        jobAreaTogglesObject[jobArea] = false;
                    }
                }
                setjobAreaToggles(jobAreaTogglesObject)
            }
            
            let generalJobAreaTogglesObject = {}
            const fetchedgeneralJobAreaTogglesObject = filterLoadCopy['generalJobAreaToggles'];
            if ((fetchedgeneralJobAreaTogglesObject != null) && fetchedgeneralJobAreaTogglesObject) {
                setgeneralJobAreaToggles(fetchedgeneralJobAreaTogglesObject);
            } else {
                for (const value of Object.keys(JobAreas)) {
                    generalJobAreaTogglesObject[value] = false;
                }
                setgeneralJobAreaToggles(generalJobAreaTogglesObject)
            }

            let generalJobAreaSelectedObject = {}
            const fetchedgeneralJobAreaSelected = filterLoadCopy['generalJobAreaSelected'];
            if ((fetchedgeneralJobAreaSelected != null)  && fetchedgeneralJobAreaSelected) {
                setGeneralJobAreaSelected(fetchedgeneralJobAreaSelected);
            } else {
                for (const value of Object.keys(JobAreas)) {
                    generalJobAreaSelectedObject[value] = false;
                }
                setGeneralJobAreaSelected(generalJobAreaSelectedObject)
            }
        }
        filterLoadRef.current = {...filterLoad};
        intializeToggles(filterLoadRef.current)
    }, [filterLoad])

    //Toggle a whole job area to be on or off
    const toggleGeneralJobArea = (generalJobArea) => {
        let filterLoadCopy = filterLoadRef.current
        let newGeneralJobAreaToggle = {...generalJobAreaToggles};
        newGeneralJobAreaToggle[generalJobArea] = !newGeneralJobAreaToggle[generalJobArea]
        setgeneralJobAreaToggles(newGeneralJobAreaToggle)
        filterLoadCopy["generalJobAreaToggles"] = newGeneralJobAreaToggle
        storeValue(filterLoadCopy, "filterLoad")
    }

    //Set whole general job area to selected, or unselect everything in a general job area
    const generalJobAreaToSelected = (generalJobArea) => {
        let filterLoadCopy = filterLoadRef.current

        const generalJobAreaSelectedBool = generalJobAreaSelected[generalJobArea];

        let newGeneralJobAreaSelected = {...generalJobAreaSelected};
        newGeneralJobAreaSelected[generalJobArea] = !generalJobAreaSelectedBool
        setGeneralJobAreaSelected(newGeneralJobAreaSelected)
        
        filterLoadCopy["generalJobAreaSelected"] = newGeneralJobAreaSelected;

        let listOfJobAreasInGeneralArea = JobAreas[generalJobArea];

        let newJobAreaToggles = {...jobAreaToggles};
        for (const jobArea of listOfJobAreasInGeneralArea) {
            let jobAreaBool = true
            if (generalJobAreaSelectedBool) {
                jobAreaBool = false;
            }
            newJobAreaToggles[jobArea] = jobAreaBool;
            updateFilter("taskArea", jobArea, jobAreaBool)
        }
        setjobAreaToggles(newJobAreaToggles)
        filterLoadCopy["jobAreaToggles"] = newJobAreaToggles;
        storeValue(filterLoadCopy, "filterLoad")
    }

    return (
        <View style = {{padding: 2}}>
            {listOfGeneralJobAreas.map((generalJobArea) => <GeneralJobAreaButton 
                    generalJobArea = {generalJobArea} 
                    updateFilter = {updateFilter} 
                    fetchedFilters = {fetchedFilters} 
                    generalJobAreaToggles = {generalJobAreaToggles}
                    generalJobAreaSelected = {generalJobAreaSelected}
                    generalJobAreaToSelected = {generalJobAreaToSelected}
                    jobAreas = {jobAreas}
                    jobAreaToggles = {jobAreaToggles}
                    setjobAreaToggles = {setjobAreaToggles}
                    toggleGeneralJobArea = {toggleGeneralJobArea}
                    key = {generalJobArea}
                ></GeneralJobAreaButton>)}
        </View>
    )
}

//Template for a general job-area button
const GeneralJobAreaButton = ({generalJobArea, updateFilter, fetchedFilters, generalJobAreaToggles, generalJobAreaSelected, generalJobAreaToSelected, jobAreas, jobAreaToggles, setjobAreaToggles, toggleGeneralJobArea}) => {
    return (
        <View style = {{marginVertical: 3}}>
            <TouchableOpacity style = {generalJobAreaToggles[generalJobArea] ? styles.regionButtonToggled :  styles.regionButton}
                activeOpacity = {0.8}
                onPress={() => toggleGeneralJobArea(generalJobArea)}>
                <View style = {styles.regionButtonInsides}>
                    <Icon name = {generalJobAreaToggles[generalJobArea] ? "chevron-down" :  "chevron-right"} 
                        size={15}
                        style = {generalJobAreaToggles[generalJobArea] ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                    <Text style = {{flex: 3}}>{generalJobArea}</Text>

                    <View style = {{
                        borderTopColor: generalJobAreaToggles[generalJobArea] ? Colors.accentBlue : Colors.accentMain,
                        borderTopWidth: 30,
                        borderRightColor: "white",
                        borderRightWidth: 15,
                        borderStyle: 'solid',
                    }}>
                    </View>
                    <View style = {{backgroundColor: "white", flex: 1}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={generalJobAreaSelected[generalJobArea]}
                            onValueChange={() => generalJobAreaToSelected(generalJobArea)}
                            color={generalJobAreaSelected[generalJobArea] ? Colors.accentBlue : undefined}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                {generalJobAreaToggles[generalJobArea] ? (<JobAreaContainer 
                    generalJobArea = {generalJobArea}
                    jobAreas = {jobAreas}
                    jobAreaToggles = {jobAreaToggles}
                    setjobAreaToggles = {setjobAreaToggles}
                    updateFilter = {updateFilter}
                    fetchedFilters = {fetchedFilters} 
                ></JobAreaContainer>) : null}
            </View>
        </View>
    )
}

//Contains job area buttons
const JobAreaContainer = ({generalJobArea, jobAreas, jobAreaToggles, setjobAreaToggles, updateFilter, fetchedFilters}) => {
    return (
        <View style = {styles.municipalityContainer}>
            {jobAreas[generalJobArea].map((jobAreaName, i) => 
                <ClickableJobAreaButton 
                    jobAreaName = {jobAreaName}
                    filterName = {"taskArea"}
                    jobAreaToggles = {jobAreaToggles}
                    setjobAreaToggles = {setjobAreaToggles}
                    updateFilter = {updateFilter}
                    fetchedFilters = {fetchedFilters} 
                    key = {i}>                            
                </ClickableJobAreaButton>)}
        </View>
    )
}

//Template for a clickable job area button
const ClickableJobAreaButton = ({jobAreaName, filterName, jobAreaToggles, setjobAreaToggles, updateFilter, fetchedFilters}) => {

    //Initialize
    useLayoutEffect(() => {
        if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(jobAreaName)) {
            let newJobAreaToggles = {...jobAreaToggles};
            newJobAreaToggles[jobAreaName] = true;
            setjobAreaToggles(newJobAreaToggles)
        } 
    }, [])

    //Toggle job area on or off
    const toggleJobArea = () => {
        let newJobAreaToggles = {...jobAreaToggles};
        newJobAreaToggles[jobAreaName] = !newJobAreaToggles[jobAreaName]
        setjobAreaToggles(newJobAreaToggles)
        updateFilter(filterName, jobAreaName, newJobAreaToggles[jobAreaName])
    }   
    return (
        <TouchableHighlight
            key={jobAreaName}
            style = {jobAreaToggles[jobAreaName] ? styles.toggledButton :  styles.toggleableButton}
            underlayColor = "#1E90FF" 
            onPress={ () => toggleJobArea(!jobAreaToggles[jobAreaName]) }>
            <Text style = {{color: 'black', padding: 0.5}}>{jobAreaName}</Text>
        </TouchableHighlight>
    )
}

//Old code, might be used later?
const JobTypeFilter = ({updateFilter, fetchedFilters}) => {
    //List of all job types
    const jobTypeList = [
        "Työpaikka", "Keikkatyö", "Kesätyö", "Harjoittelu", "Oppisopimus", "Työkokeilu", "Työsuhde", "Virkasuhde", "Avoin haku"
    ]

    return (
        <View style = {styles.municipalityContainer}>
            {jobTypeList.map((buttonName) => <ClickableFilterButton buttonName = {buttonName} filterName = {"employment"} updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} key = {buttonName}></ClickableFilterButton>)}
        </View>
    )
}

const RegionFilter = ({updateFilter, fetchedFilters, filterLoad}) => {
    const [regionToggles, setRegionToggles] = useState({})
    const [regionSelected, setRegionSelected] = useState({})
    const [municipalities, setMunicipalities] = useState(Municipalities)
    const [municipalitiesToggles, setMunicipalitiesToggles] = useState({})

    const filterLoadRef = useRef({})

    const listOfRegions = [
        "Uusimaa","Pirkanmaa","Varsinais-Suomi","Pohjois-Pohjanmaa","Keski-Suomi","Pohjois-Savo",
        "Satakunta","Päijät-Häme","Etelä-Pohjanmaa","Pohjanmaa","Lappi","Kanta-Häme","Pohjois-Karjala",
        "Kymenlaakso","Etelä-Savo","Etelä-Karjala","Kainuu","Keski-Pohjanmaa","Ahvenanmaa"
    ]

    useLayoutEffect(() => {
        const intializeToggles = async (filterLoadCopy) => {
            let municipalityTogglesObject = {}
            const fetchedMunicipalitiesToggles = filterLoadCopy['municipalitiesToggles'];
            if ((fetchedMunicipalitiesToggles != null) && fetchedMunicipalitiesToggles) {
                setMunicipalitiesToggles(fetchedMunicipalitiesToggles);
            } else {
                for (const [key, value] of Object.entries(Municipalities)) {
                    for (const municipality of value) {
                        municipalityTogglesObject[municipality] = false;
                    }
                }
                setMunicipalitiesToggles(municipalityTogglesObject)
            }
            
            let regionTogglesObject = {}
            const fetchedRegionToggles = filterLoadCopy['regionToggles'];
            if ((fetchedRegionToggles != null) && fetchedRegionToggles) {
                setRegionToggles(fetchedRegionToggles);
            } else {
                for (const value of listOfRegions) {
                    regionTogglesObject[value] = false;
                }
                setRegionToggles(regionTogglesObject)
            }

            let regionSelectedObject = {}
            const fetchedSelectedRegions = filterLoadCopy['regionSelected'];
            if ((fetchedSelectedRegions != null) && fetchedSelectedRegions) {
                setRegionSelected(fetchedSelectedRegions);
            } else {
                for (const value of listOfRegions) {
                    regionSelectedObject[value] = false;
                }
                setRegionSelected(regionSelectedObject)
            }
        }
        filterLoadRef.current = {...filterLoad};
        intializeToggles(filterLoadRef.current)
        console.log("Reinit")
    }, [filterLoad])

    const toggleRegion = (region) => {
        let filterLoadCopy = filterLoadRef.current
        let newRegionToggled = {...regionToggles};
        newRegionToggled[region] = !newRegionToggled[region]
        setRegionToggles(newRegionToggled)
        filterLoadCopy["regionToggles"] = newRegionToggled
        storeValue(filterLoadCopy, "filterLoad")
    }

    //Set whole region to selected, or unselect everything in a region
    const regionToSelected = (region) => {
        let filterLoadCopy = filterLoadRef.current

        const regionSelectedBool = regionSelected[region];
        //console.log("REGION SELECTED BOOL IS: " + regionSelectedBool)

        let newRegionSelected = {...regionSelected};
        newRegionSelected[region] = !regionSelectedBool
        setRegionSelected(newRegionSelected)

        filterLoadCopy["regionSelected"] = newRegionSelected;

        let listOfMunicipalitiesInRegion = Municipalities[region];

        let newMunicipalityToggled = {...municipalitiesToggles};
        for (const municipality of listOfMunicipalitiesInRegion) {
            let municipalityBool = true
            if (regionSelectedBool) {
                municipalityBool = false;
            }
            newMunicipalityToggled[municipality] = municipalityBool;
            updateFilter("location", municipality, municipalityBool)

        }
        setMunicipalitiesToggles(newMunicipalityToggled)
        filterLoadCopy["municipalitiesToggles"] = newMunicipalityToggled;
        storeValue(filterLoadCopy, "filterLoad")
    }

    return (
        <View style = {{padding: 2}}>
            {listOfRegions.map((region,i) => 
                <RegionButton 
                    region = {region} 
                    updateFilter = {updateFilter} 
                    fetchedFilters = {fetchedFilters} 
                    regionToggles = {regionToggles[region]}
                    regionSelected = {regionSelected[region]}
                    regionToSelected = {regionToSelected}
                    municipalities = {municipalities[region]}
                    municipalitiesToggles = {municipalitiesToggles}
                    setMunicipalitiesToggles = {setMunicipalitiesToggles}
                    toggleRegion = {toggleRegion}
                    key = {i}
                ></RegionButton>)}
        </View>
    )
}

const RegionButton = ({region, updateFilter, fetchedFilters, regionToggles, regionSelected, regionToSelected, municipalities, municipalitiesToggles, setMunicipalitiesToggles, toggleRegion}) => {
    return (
        <View style = {{marginVertical: 3}}>
            <TouchableOpacity style = {regionToggles ? styles.regionButtonToggled :  styles.regionButton}
                activeOpacity = {0.8}
                onPress={() => toggleRegion(region)}>
                <View style = {styles.regionButtonInsides}>
                    <Icon name = {regionToggles ? "chevron-down" :  "chevron-right"} 
                        size={15}
                        style = {regionToggles? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                    <Text style = {{flex: 3}}>{region}</Text>

                    <View style = {{
                            borderTopColor: regionToggles ? Colors.accentBlue : Colors.accentMain,
                            borderTopWidth: 30,
                            borderRightColor: "white",
                            borderRightWidth: 15,
                            borderStyle: 'solid',
                        }}>
                    </View>
                    <View style = {{backgroundColor: "white", flex: 1}}>
                        <Checkbox
                            style={styles.checkbox}
                            value={regionSelected}
                            onValueChange={() => regionToSelected(region)}
                            color={regionSelected ? Colors.accentBlue : undefined}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                {regionToggles ? (<MunicipalityContainer 
                    municipalities = {municipalities}
                    municipalitiesToggles = {municipalitiesToggles}
                    setMunicipalitiesToggles = {setMunicipalitiesToggles}
                    updateFilter = {updateFilter}
                    fetchedFilters = {fetchedFilters} 
                ></MunicipalityContainer>) : null}
            </View>
        </View>
    )
}

//Contains all of the muncipality buttons
const MunicipalityContainer = ({municipalities, municipalitiesToggles, setMunicipalitiesToggles, updateFilter, fetchedFilters}) => {
    return (
        <View style = {styles.municipalityContainer}>
            {municipalities.map((municipalityName, i) => 
                <ClickableMunicipalityButton 
                    municipalityName = {municipalityName}
                    filterName = {"location"}
                    municipalitiesToggles = {municipalitiesToggles}
                    setMunicipalitiesToggles = {setMunicipalitiesToggles}
                    updateFilter = {updateFilter}
                    fetchedFilters = {fetchedFilters} 
                    key = {i}>                            
                </ClickableMunicipalityButton> )}
        </View>
    )
}

//Template for the clickable municipality filter button
const ClickableMunicipalityButton = ({municipalityName, filterName, municipalitiesToggles, setMunicipalitiesToggles, updateFilter, fetchedFilters}) => {

    //Initialize based on fetched filters
    useLayoutEffect(() => {
        if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(municipalityName)) {
            let newMunicipalityToggled = {...municipalitiesToggles};
            newMunicipalityToggled[municipalityName] = true;
            setMunicipalitiesToggles(newMunicipalityToggled)
        } 
    }, [fetchedFilters])

    //Toggle municipality on or off
    const toggleMunicipality = () => {
        let newMunicipalityToggled = {...municipalitiesToggles};
        newMunicipalityToggled[municipalityName] = !newMunicipalityToggled[municipalityName]
        setMunicipalitiesToggles(newMunicipalityToggled)
        updateFilter(filterName, municipalityName, newMunicipalityToggled[municipalityName])
    }   

    return (
        <View style = {{flexGrow: 1}}>
            <TouchableHighlight
                key={municipalityName}
                style = {municipalitiesToggles[municipalityName] ? styles.toggledButton :  styles.toggleableButton}
                underlayColor = "#1E90FF" 
                onPress={ () => toggleMunicipality(!municipalitiesToggles[municipalityName]) }>
                <Text style = {{color: 'black', padding: 0.5}}>{municipalityName}</Text>
            </TouchableHighlight>
        </View>
    )
}

//Template for a clickable filter button
const ClickableFilterButton = ({buttonName, filterName, updateFilter, fetchedFilters}) => {
    const [toggled, setToggled] = useState(false);

    //Initialize, if filter is for language, convert to the correct form
    useLayoutEffect(() => {
        if (filterName == "language") {
            let realValue = "";
            switch(buttonName) {
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
            if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(realValue)) {
                setToggled(true)
            }
        } else {
            if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(buttonName)) {
                setToggled(true)
            }
        }
    }, [fetchedFilters])

    //Toggle button on or off
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

//Contains clickable filter buttons
const BasicFilterContainer = ({displayName, filterName, buttonParameters, updateFilter, fetchedFilters}) => {
    return (
        <View style={styles.basicFiltercontainer}>
            <Text style = {Styles.h3}>
                {displayName}
            </Text>
            <View style = {styles.toggleableButtonsContainer}>
                {buttonParameters.map((buttonName) => <ClickableFilterButton buttonName = {buttonName} filterName = {filterName} updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} key = {buttonName}></ClickableFilterButton>)}
            </View>
        </View>
    )
}

//Main component
const Filters = ({clearTrigger, setFilter, setClearTrigger}) => {
    //Filter object
    const filter = useRef({});
    const [fetchedFilters, setFetchedFilters] = useState({});
    const [clearState, setClearState] = useState(0);

    const [filterLoad, setFilterLoad] = useState({});

    const listOfJobTypes = [
        'Kokoaikatyö', 'Tuntityö', '3-vuorotyö', '2-vuorotyö', ' Osa-aikatyö',
        'Kesätyö', 'Harjoittelu', 'Oppisopimus', 'Työkokeilu'
    ]

    //Clear all filters and reset overlay
    const clearFilters = async () => {
        filter.current = {}

        setFetchedFilters({})
        setFilterLoad({})
        setFilter({})

        //Remove filter stuff from storage
        await removeValue("filter")
        await removeValue("filterLoad")
                
        //Hacky way of resetting everything
        setClearState(clearState + 1)
    }

    //Initialize
    useLayoutEffect(() => {
        const fetchFilters = async () => {
            let value = await getValue('filter');
            if (value != null) {
                setFetchedFilters(value)
                filter.current = value;
                //console.log("Filter after fetching: " + JSON.stringify(filter.current))
            }
            let value2 = await getValue('filterLoad')
            if (value2 != null) {
                //console.log(value2)
                setFilterLoad(value2)
            }
        }
        if (clearTrigger) {
            setClearTrigger(false);
            clearFilters();
        }
        fetchFilters()
    }, [clearTrigger])

    //Update filters
    const updateFilter = (filterName, value, bool) => {
        let newFilterObject = {...filter.current};
        if (!newFilterObject[filterName]) {
            newFilterObject[filterName] = []
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
                newFilterObject[filterName].push(realValue)
            } else {
                newFilterObject[filterName].push(value)
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
                newFilterObject[filterName] = newFilterObject[filterName].filter(name => name !== realValue);
            } else {
                newFilterObject[filterName] = newFilterObject[filterName].filter(name => name !== value);
            }
        }

        //If empty filter, remove.
        if (newFilterObject[filterName].length == 0) {
            delete newFilterObject[filterName];
            filter.current = newFilterObject;
            storeValue(newFilterObject, "filter")
        } else {
            filter.current = newFilterObject;
            storeValue(newFilterObject, "filter")
        }
        //Call the parent filter setter
        setFilter(newFilterObject);
    }

    return (
      <View key = {clearState}>
        <Text style = {[Styles.h1, {paddingVertical: 2, paddingHorizontal: 10}]}>Rajaa hakutuloksia</Text>
        <ScrollView>
          <View style={styles.allFiltersContainer}>
            <ComplexFilterContainer updateFilter = {updateFilter} fetchedFilters = {fetchedFilters} filterLoad = {filterLoad}> </ComplexFilterContainer>
            <BasicFilterContainer 
                key = {"Työn luonne"} displayName= {"Työn luonne"} 
                filterName = {"employmentType"} 
                buttonParameters = {["Vakinainen", "Määräaikainen"]} 
                updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}>
            </BasicFilterContainer>
            <BasicFilterContainer 
                key = {"Työsuhde"} displayName= {"Työsuhde"} 
                filterName = {"employment"} 
                buttonParameters = {listOfJobTypes} 
                updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}>
            </BasicFilterContainer>
            <BasicFilterContainer 
                key = {"Kieli"} displayName= {"Kieli"} 
                filterName = {"language"} 
                buttonParameters = {["Suomi", "Svenska", "English"]} 
                updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}>
            </BasicFilterContainer>
          </View>
        </ScrollView>
      </View>
    )
  }

export default Filters;