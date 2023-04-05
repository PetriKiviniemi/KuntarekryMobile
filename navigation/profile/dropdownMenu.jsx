import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {profileStyles} from './profileStyles'
import { Colors } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const DropdownMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const safelyCloseModal = () => {
        if(isOpen)
        {
            setIsOpen(false)
        }
    }

    return(
        <View style={profileStyles.dropdownContainer}>
            <TouchableOpacity 
                style={profileStyles.profileDropdown}
                onPress={() => setIsOpen(!isOpen)}
            >
                <View style={profileStyles.profileDropdownButtonWrapper}>
                    <View
                    style={profileStyles.profileDropdownButton}
                    >
                        <View
                        style={{
                            backgroundColor: Colors.accentMain,
                            alignItems: 'center',
                            justifyContent: 'center', 
                            borderRadius: 1000,
                            minWidth: '15%'
                        }}
                        >
                            <Icon 
                                style={profileStyles.dropdownIcon}
                                name={ props.icon || 'check' }
                                size={20}
                                color={ Colors.darkMain }
                            />
                        </View>
                        <Text style={{marginHorizontal: 10, fontSize: 18}}>{props.title}</Text>
                    </View>
                    <Icon
                        style={profileStyles.dropdownIcon}
                        name={ isOpen ? 'chevron-down' : 'chevron-right' }
                    />
                </View>

                <View
                    style={{
                        borderBottomColor: Colors.darkMain,
                        borderBottomWidth: 1,
                    }}
                />

                {isOpen?
                (
                    props.content
                ) : null
                }
            </TouchableOpacity>
        </View>
    )
}