import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        maxHeight: 100,
    },
    icon: {
        flex: 1,
    },
});

const BottomNav = () => {

    return (
        <View style={styles.container}>
            <Icon name="file-text-o" size={30} color="#000" style={styles.icon}/>
            <Icon name="heart" size={30} color="#000" style={styles.icon}/>
            <Icon name="search" size={30} color="#000" style={styles.icon}/>
            <Icon name="user" size={30} color="#000" style={styles.icon}/>
            <Icon name="info-circle" size={30} color="#000" style={styles.icon}/>

        </View>
    );
};

export default BottomNav;