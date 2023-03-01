import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Entypo';

import Styles from '../../styles';

// Returns formatted timestamp
const formatTime = (timeStamp) => {
    return format(new Date(timeStamp), 'dd.MM.yyyy')
}


export default function JobCard({ data }) {
    const [heartButtonState, setHeartButtonState] = React.useState({color: '#FF8484', name: 'heart'})

    // Pressing the heart button
    const onHeartButtonPress = () => {
      if (heartButtonState.color === '#FF8484') {
        setHeartButtonState({color: 'black', name: 'heart-outlined'})
      } else {
        setHeartButtonState({color: '#FF8484', name: 'heart'})
      }
    }

    return (
        <View style={Styles.card}>
            <View style={[Styles.rowButton, {paddingTop: 0}]}>
                <Text style={{fontSize: 16, fontWeight: "bold"}}>
                    {data.title}
                </Text>
                <TouchableOpacity onPress={ () => onHeartButtonPress() }>
                    <Icon style={[Styles.iconButton, {justifyContent: 'center'}]} size={40} name={heartButtonState.name} color={heartButtonState.color}/>
                </TouchableOpacity>
            </View>

            <Text>{data.organization}</Text> 
            
            <Text style={{marginBottom: 5}}>
                <Icon name={"location-pin"} size={20} color={"black"}/>
                {data.location}
            </Text> 
            <Text>Hakuaika päättyy {formatTime(data.publicationEnds)}</Text>         
        </View>
    );
}