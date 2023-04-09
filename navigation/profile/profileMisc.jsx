import React, {useState} from 'react';
import { profileStyles } from "./profileStyles";
import {Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from "react";

export const AddContentButton = (props) => {
    return(
        <TouchableOpacity
            style={{
                backgroundColor: '#0094FF',
                flexDirection: 'row',
                margin: 10,
                paddingLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 200,
                borderRadius: 10,
            }}
            onPress={() => props.callback()}
        >
            <Icon 
                style={{fontSize: 16}}
                name="plus"
                color='white'
            />
            <Text style={{fontSize: 16, padding: 10}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export const SaveButton = (props) => {
    return(
        <View style={profileStyles.saveButton}>
            <TouchableOpacity
            style={profileStyles.centeredButton}
            onPress={props.onPressCallback}
            >
                <Icon
                    style={{fontSize: 18}}
                    name='save'
                    color='black'
                />
                <Text style={{paddingHorizontal: 5}}>TALLENNA</Text>
            </TouchableOpacity>
        </View>
    )
}

export const CancelButton = (props) => {
    return(
        <View
        style={profileStyles.cancelButton}
        >
            <TouchableOpacity
            style={profileStyles.centeredButton}
            onPress={props.onPressCallback}
            >
                <Text>PERUUTA</Text>
            </TouchableOpacity>
        </View>
    )
}


export const TextInputImmutable = (props) => {
    const [compStyle, setCompStyle] = useState(profileStyles.profileInputField)

    useEffect(() => 
    {
        if(props.long == true && props.tall == undefined)
            setCompStyle(profileStyles.profileInputFieldLong)
        if(props.long == true && props.tall == true)
            setCompStyle(profileStyles.profileInputFieldLongTall)
    }, [])

    return(
        <View>
            <View style={compStyle}>
                <Text>{props.text}</Text>
            </View>
        </View>
    )
}

export const CheckBoxImmutable = (props) => {
    return(
        <View style={{height: 30, width: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            {props.value ? <Icon
                style={{fontSize: 24}}
                name="check"
                color="#000"
             /> : <View/>}
        </View>
    )
}