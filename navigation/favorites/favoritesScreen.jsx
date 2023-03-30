import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import JobAdvertisementSummary from '../../widgets/jobAdvertisementSummary';
import JobCard from './jobCard';
import Styles from '../../styles';
import { getValue } from '../../utils/asyncstorage_utils';
import { useIsFocused } from "@react-navigation/native";

const tableStyle = StyleSheet.create({
    table: {
        display: "flex",
        padding: 10,
        backgroundColor: "#AEE8B9",
        borderRadius: 20,
        marginBottom: 20
    }, 

    fancyTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3B72BE",
        borderRadius: 20,
        marginBottom: 10,
        padding: 5,
    }
});

export default function FavoriteScreen({ navigation }) {
    const [data, setData] = useState([]);
    const isFocused = useIsFocused()

    useEffect(() => {
        console.log("Favorites useEffect")
        fetchFavourites()
    }, [isFocused]);

    const fetchFavourites = async () => {
        let favourites = await getValue('favourites')
        if(favourites) {
            setData(favourites)
        }
    }

    const renderSearchResults = () => {
        if (!data || data.length === 0) {
          // tähän joku spinneri tms. sitten kun palautetaan oikeita hakutuloksia
          return null
        }  
        return data.map((jobAd, i) => <JobAdvertisementSummary values={ jobAd } navigation={ navigation } key={ i } />)
    }

    return (
        <ScrollView style={Styles.container}>

            <Text style={{fontSize: 42, color: '#5FBCFF'}}>Sinulle</Text>

            <View style={tableStyle.table}>
                { renderSearchResults() }
            </View>

            <View
            style={{
                borderBottomColor: '#9ACDA4',
                borderBottomWidth: 1,
                width: '100%',
                marginBottom: 10
            }}
            />

            <Text style={Styles.h1}>Suositellut työpaikat</Text>

            <View style={tableStyle.table}>
   
            </View>
        </ScrollView>
    );
}