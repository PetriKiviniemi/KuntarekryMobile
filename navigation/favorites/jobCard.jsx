import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo';

import Styles from '../../styles';

// Returns formatted timestamp
const formatTime = (timeStamp) => {
    return format(new Date(timeStamp), 'dd.MM.yyyy')
}


export default function JobCard({ data, favorite }) {
    const [heartButtonState, setHeartButtonState] = React.useState({color: favorite ? '#FF8484' : "white"})

    // Pressing the heart button
    const onHeartButtonPress = () => {
      if (heartButtonState.color === '#FF8484') {
        setHeartButtonState({color: 'white'})
      } else {
        setHeartButtonState({color: '#FF8484'})
      }
    }

    const onJobCardPress = () => {

    }

    return (
        <View style={Styles.card}>
            <TouchableOpacity onPress={ () => onHeartButtonPress() }>
                <Icon style={[Styles.iconButton, {justifyContent: 'flex-start'}]} size={40} name={"heart"} color={heartButtonState.color}/>
            </TouchableOpacity>

            <TouchableOpacity style={{paddingLeft: 5}} onPress={() => onJobCardPress()}>
                <Text style={{fontSize: 12}}>{data.organization}</Text> 
                <Text style={{fontSize: 20}}>{data.title}</Text>
                <Text style={{fontSize: 12}}>Hakuaika päättyy {formatTime(data.publicationEnds)}</Text> 
            </TouchableOpacity>
        </View>
    );
}