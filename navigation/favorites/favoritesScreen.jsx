import React, {useState} from 'react';
import { View, Text } from 'react-native';
import dummyAdvertisement from '../dummyAdvertisement';

import JobCard from './jobCard';
import Styles from '../../styles';

export default function FavoriteScreen({ navigation }) {
    const [data, setData] = useState(dummyAdvertisement);

    return (
        <View style={Styles.container}>

            <Text style={Styles.title}>Sinulle</Text>

            <Text style={Styles.h1}>Tykkäämäsi työpaikat</Text>

            <JobCard data={data.jobAdvertisement}/>           
        </View>
    );
}