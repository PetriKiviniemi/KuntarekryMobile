import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import dummyAdvertisement from '../dummyAdvertisement';

import JobCard from './jobCard';
import Styles from '../../styles';

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
    const [data, setData] = useState(dummyAdvertisement);

    return (
        <ScrollView style={Styles.container}>

            <Text style={{fontSize: 42, color: '#5FBCFF'}}>Sinulle</Text>

            <Text style={Styles.h1}>Suosikkejasi</Text>

            <View style={tableStyle.table}>
                <JobCard data={data.jobAdvertisement} favorite={true}/>     
                <JobCard data={data.jobAdvertisement} favorite={true}/>        
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
                <JobCard data={data.jobAdvertisement} favorite={false}/>     
                <JobCard data={data.jobAdvertisement} favorite={false}/>        
            </View>
        </ScrollView>
    );
}