import React, {useState, useLayoutEffect, useRef, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';

import Styles, { Colors } from '../styles';
import Municipalities from "../utils/listOfMunicipalities.js";
import JobAreas from "../utils/listOfJobAreas.js";
import { getValue, storeValue, removeValue } from '../utils/asyncstorage_utils'

//TODO
//Make it so, that if all things inside a dropdown are selected, the dropdown is selected when opening the filter screen again
//Change the async storage stuff to use a single object
//Personalize order of regions based on profiles

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
        modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
        button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
        buttonOpen: {
        backgroundColor: '#F194FF',
    },
        buttonClose: {
        backgroundColor: '#2196F3',
    },
        textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
        modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },


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

const ComplexFilterContainer = ({updateFilter, fetchedFilters}) => {
    const [locationToggled, setLocationToggled] = useState(false);
    const [jobTypeToggled, setJobTypeToggled] = useState(false);
    const [jobAreaToggled, setJobAreaToggled] = useState(false);

    const toggleLocation = () => {
        setLocationToggled(!locationToggled)
        storeValue(!locationToggled, "locationToggled");
    }
    const toggleJobType = () => {
        setJobTypeToggled(!jobTypeToggled)
        storeValue(!jobTypeToggled, "jobTypeToggled");
    }
    const toggleJobArea = () => {
        setJobAreaToggled(!jobAreaToggled)
        storeValue(!jobAreaToggled, "jobAreaToggled");
    }

    //Initialize
    useLayoutEffect( () => {
        const fetchComplexToggles= async () => {
            const locationValue = await getValue('locationToggled');
            const jobTypeValue = await getValue('jobTypeToggled');
            const jobAreaValue = await getValue('jobAreaToggled');
            if (locationValue != null) {
                setLocationToggled(locationValue)
            }
            if (jobTypeValue != null) {
                setJobTypeToggled(jobTypeValue)
            }
            if (jobAreaValue != null) {
                setJobAreaToggled(jobAreaValue)
            }
        }
        fetchComplexToggles()
    }, [])

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
            <View style = {{marginHorizontal: 10}}>
                {locationToggled ? (<RegionFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></RegionFilter>) : null}
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
            <View style = {{marginHorizontal: 10}}>
                {jobTypeToggled ? (<JobTypeFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></JobTypeFilter>) : null}
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
            <View style = {{marginHorizontal: 10}}>
                {jobAreaToggled ? (<JobAreaFilter updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></JobAreaFilter>) : null}
            </View>

        </View>
      </View>
    )
}

const JobAreaFilter = ({updateFilter, fetchedFilters}) => {
    const [generalJobAreaToggles, setgeneralJobAreaToggles] = useState({})
    const [generalJobAreaSelected, setGeneralJobAreaSelected] = useState({})
    const [jobAreas, setJobAreas] = useState(JobAreas)
    const [jobAreaToggles, setjobAreaToggles] = useState({})

    const listOfGeneralJobAreas = Object.keys(JobAreas);

    useLayoutEffect(() => {
        const intializeToggles= async () => {
            let jobAreaTogglesObject = {}
            const fetchedJobAreaToggles = await getValue('jobAreaToggles');
            if (fetchedJobAreaToggles != null) {
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
            const fetchedgeneralJobAreaTogglesObject = await getValue('generalJobAreaToggles');
            if (fetchedgeneralJobAreaTogglesObject != null) {
                setgeneralJobAreaToggles(fetchedgeneralJobAreaTogglesObject);
            } else {
                for (const value of Object.keys(JobAreas)) {
                    generalJobAreaTogglesObject[value] = false;
                }
                setgeneralJobAreaToggles(generalJobAreaTogglesObject)
            }

            let generalJobAreaSelectedObject = {}
            const fetchedgeneralJobAreaSelected = await getValue('generalJobAreaSelected');
            if (fetchedgeneralJobAreaSelected != null) {
                setGeneralJobAreaSelected(fetchedgeneralJobAreaSelected);
            } else {
                for (const value of Object.keys(JobAreas)) {
                    generalJobAreaSelectedObject[value] = false;
                }
                setGeneralJobAreaSelected(generalJobAreaSelectedObject)
            }
        }

        intializeToggles()
    }, [])

    const toggleGeneralJobArea = (generalJobArea) => {
        let newGeneralJobAreaToggle = {...generalJobAreaToggles};
        newGeneralJobAreaToggle[generalJobArea] = !newGeneralJobAreaToggle[generalJobArea]
        setgeneralJobAreaToggles(newGeneralJobAreaToggle)
        storeValue(newGeneralJobAreaToggle, "generalJobAreaToggles")
    }

    //Set whole general job area to selected, or unselect everything in a general job area
    const generalJobAreaToSelected = (generalJobArea) => {

        const generalJobAreaSelectedBool = generalJobAreaSelected[generalJobArea];
        console.log("GENERAL JOB AREA SELECTED BOOL IS: " + generalJobAreaSelectedBool)

        let newGeneralJobAreaSelected = {...generalJobAreaSelected};
        newGeneralJobAreaSelected[generalJobArea] = !generalJobAreaSelectedBool
        setGeneralJobAreaSelected(newGeneralJobAreaSelected)

        storeValue(newGeneralJobAreaSelected, "generalJobAreaSelected")

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
        storeValue(newJobAreaToggles, "jobAreaToggles")
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

const ClickableJobAreaButton = ({jobAreaName, filterName, jobAreaToggles, setjobAreaToggles, updateFilter, fetchedFilters}) => {
    useLayoutEffect(() => {
        if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(jobAreaName)) {
            let newJobAreaToggles = {...jobAreaToggles};
            newJobAreaToggles[jobAreaName] = true;
            setjobAreaToggles(newJobAreaToggles)
        } 
    }, [])

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

const RegionFilter = ({updateFilter, fetchedFilters}) => {
    const [regionToggles, setRegionToggles] = useState({})
    const [regionSelected, setRegionSelected] = useState({})
    const [municipalities, setMunicipalities] = useState(Municipalities)
    const [municipalitiesToggles, setMunicipalitiesToggles] = useState({})

    const listOfRegions = [
        "Uusimaa","Pirkanmaa","Varsinais-Suomi","Pohjois-Pohjanmaa","Keski-Suomi","Pohjois-Savo",
        "Satakunta","Päijät-Häme","Etelä-Pohjanmaa","Pohjanmaa","Lappi","Kanta-Häme","Pohjois-Karjala",
        "Kymenlaakso","Etelä-Savo","Etelä-Karjala","Kainuu","Keski-Pohjanmaa","Ahvenanmaa"
    ]

    useLayoutEffect(() => {
        const intializeToggles= async () => {
            let municipalityTogglesObject = {}
            const fetchedMunicipalitiesToggles = await getValue('municipalitiesToggles');
            if (fetchedMunicipalitiesToggles != null) {
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
            const fetchedRegionToggles = await getValue('regionToggles');
            if (fetchedRegionToggles != null) {
                setRegionToggles(fetchedRegionToggles);
            } else {
                for (const value of listOfRegions) {
                    regionTogglesObject[value] = false;
                }
                setRegionToggles(regionTogglesObject)
            }

            let regionSelectedObject = {}
            const fetchedSelectedRegions = await getValue('regionSelected');
            if (fetchedSelectedRegions != null) {
                setRegionSelected(fetchedSelectedRegions);
            } else {
                for (const value of listOfRegions) {
                    regionSelectedObject[value] = false;
                }
                setRegionSelected(regionSelectedObject)
            }
        }

        intializeToggles()
    }, [])

    const toggleRegion = (region) => {
        let newRegionToggled = {...regionToggles};
        newRegionToggled[region] = !newRegionToggled[region]
        setRegionToggles(newRegionToggled)
        storeValue(newRegionToggled, "regionToggles")
    }

    //Set whole region to selected, or unselect everything in a region
    const regionToSelected = (region) => {

        const regionSelectedBool = regionSelected[region];
        console.log("REGION SELECTED BOOL IS: " + regionSelectedBool)

        let newRegionSelected = {...regionSelected};
        newRegionSelected[region] = !regionSelectedBool
        setRegionSelected(newRegionSelected)

        storeValue(newRegionSelected, "regionSelected")

        let listOfMunicipalitiesInRegion = Municipalities[region];

        let newMunicipalityToggled = {...municipalitiesToggles};
        for (const municipality of listOfMunicipalitiesInRegion) {
            let municipalityBool = true
            if (regionSelectedBool) {
                municipalityBool = false;
            }
            newMunicipalityToggled[municipality] = municipalityBool;
            updateFilter("location", municipality, municipalityBool)
            //updateFilter("location", municipality, true)

        }
        setMunicipalitiesToggles(newMunicipalityToggled)
        storeValue(newMunicipalityToggled, "municipalitiesToggles")
    }

    return (
        <View style = {{padding: 2}}>
            {listOfRegions.map((region) => <RegionButton 
                    region = {region} 
                    updateFilter = {updateFilter} 
                    fetchedFilters = {fetchedFilters} 
                    regionToggles = {regionToggles}
                    regionSelected = {regionSelected}
                    regionToSelected = {regionToSelected}
                    municipalities = {municipalities}
                    municipalitiesToggles = {municipalitiesToggles}
                    setMunicipalitiesToggles = {setMunicipalitiesToggles}
                    toggleRegion = {toggleRegion}
                    key = {region}
                ></RegionButton>)}
        </View>
    )
}

const RegionButton = ({region, updateFilter, fetchedFilters, regionToggles, regionSelected, regionToSelected, municipalities, municipalitiesToggles, setMunicipalitiesToggles, toggleRegion}) => {
    return (
        <View style = {{marginVertical: 3}}>
            <TouchableOpacity style = {regionToggles[region] ? styles.regionButtonToggled :  styles.regionButton}
                activeOpacity = {0.8}
                onPress={() => toggleRegion(region)}>
                <View style = {styles.regionButtonInsides}>
                    <Icon name = {regionToggles[region] ? "chevron-down" :  "chevron-right"} 
                        size={15}
                        style = {regionToggles[region] ? {padding: 5, paddingLeft: 2} :  {padding: 5}}
                        />
                    <Text style = {{flex: 3}}>{region}</Text>

                    <View style = {{
                        borderTopColor: regionToggles[region] ? Colors.accentBlue : Colors.accentMain,
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
                            onValueChange={() => regionToSelected(region)}
                            color={regionSelected[region] ? Colors.accentBlue : undefined}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                {regionToggles[region] ? (<MunicipalityContainer 
                    region = {region}
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


const MunicipalityContainer = ({region, municipalities, municipalitiesToggles, setMunicipalitiesToggles, updateFilter, fetchedFilters}) => {
    return (
        <View style = {styles.municipalityContainer}>
            {municipalities[region].map((municipalityName, i) => 
                <ClickableMunicipalityButton 
                    municipalityName = {municipalityName}
                    filterName = {"location"}
                    municipalitiesToggles = {municipalitiesToggles}
                    setMunicipalitiesToggles = {setMunicipalitiesToggles}
                    updateFilter = {updateFilter}
                    fetchedFilters = {fetchedFilters} 
                    key = {i}>                            
                </ClickableMunicipalityButton>)}
        </View>
    )
}

const ClickableMunicipalityButton = ({municipalityName, filterName, municipalitiesToggles, setMunicipalitiesToggles, updateFilter, fetchedFilters}) => {

    useLayoutEffect(() => {
        if (fetchedFilters[filterName] && fetchedFilters[filterName].includes(municipalityName)) {
            console.log(municipalityName)
            let newMunicipalityToggled = {...municipalitiesToggles};
            newMunicipalityToggled[municipalityName] = true;
            setMunicipalitiesToggles(newMunicipalityToggled)
        } 
    }, [])

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

const ClickableFilterButton = ({buttonName, filterName, updateFilter, fetchedFilters}) => {
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

const Filters = ({clearTrigger, setFilter, setClearTrigger}) => {
    //Filter object
    const filter = useRef({});
    const [fetchedFilters, setFetchedFilters] = useState({});
    const [clearState, setClearState] = useState(0);

    const clearFilters = async () => {
        const listOfStoredFilters = [
            "locationToggled", "jobTypeToggled", "jobAreaToggled",
            "municipalitiesToggles", "regionToggles", "regionSelected",
            "jobAreaToggles", "generalJobAreaToggles", "generalJobAreaSelected"
        ]

        setFilter({});

        setFetchedFilters({})
        //Do this first just in case
        await removeValue("filter")
        for (const storedFilter of listOfStoredFilters) {
            console.log("REMOVING: " + storedFilter)
            await removeValue(storedFilter);
        }
                
        //Hacky way of resetting everything
        setClearState(clearState + 1)
    }

    useLayoutEffect(() => {
        const fetchFilters = async () => {
            let value = await getValue('filter');
            if (value != null) {
                setFetchedFilters(value)
                filter.current = value;
                console.log("Filter after fetching: " + JSON.stringify(filter.current))
            }
        }
        if (clearTrigger) {
            setClearTrigger(false);
            clearFilters();
        }
        fetchFilters()
    }, [clearTrigger])

    
    const updateFilter = (filterName, value, bool) => {
        //console.log("FILTER BEFOREHAND: " + JSON.stringify(filter.current))
        let newFilterObject = {...filter.current};
        if (!newFilterObject[filterName]) {
            newFilterObject[filterName] = []
        }
        console.log("Filtername: " + filterName + " Value: " + value + " Boolean: " + bool)
    
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
            console.log("DELETING EMPTY FILTER: " + filterName);
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
            <ComplexFilterContainer updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}> </ComplexFilterContainer>
            <BasicFilterContainer key = {"Työn luonne"} displayName= {"Työn luonne"} filterName = {"employmentType"} buttonParameters = {["Vakinainen", "Määräaikainen"]} updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></BasicFilterContainer>
            <BasicFilterContainer key = {"Työsuhde"} displayName= {"Työsuhde"} filterName = {"employment"} buttonParameters = {["Kokoaikatyö", "Osa-aikatyö", "Vuorotyö", "Tuntityö", "3-vuorotyö"]} updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></BasicFilterContainer>
            <BasicFilterContainer key = {"Kieli"} displayName= {"Kieli"} filterName = {"language"} buttonParameters = {["Suomi", "Svenska", "English"]} updateFilter = {updateFilter} fetchedFilters = {fetchedFilters}></BasicFilterContainer>
          </View>
        </ScrollView>
      </View>
    )
  }

export default Filters;