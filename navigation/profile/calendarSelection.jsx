import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity } from 'react-native';
import {profileStyles} from './profileStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../styles';
import {DatePicker} from "react-native-common-date-picker";

export const CalendarSelection = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString())

    const selectDate = (data) => {
        setModalVisible(false)
        setSelectedDate(data)
        props.onValueChange(data)
    }

    return(
        <View style={Styles.row2}>
            <TouchableOpacity
                style={profileStyles.profileInputField}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={{color: 'grey'}}>
                    {selectedDate}
                </Text>
                <Icon 
                    style={{fontSize: 16}}
                    name="calendar"
                    color="#000"
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={profileStyles.centeredView}>
                    <View style={profileStyles.modalView}>
                        <DatePicker 
                            confirm={(date) => selectDate(date)}
                            cancel={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}