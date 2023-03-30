import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {profileStyles} from './profileStyles'
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
                            backgroundColor: '#AEE8D6',
                            alignItems: 'center',
                            justifyContent: 'center', 
                            borderRadius: 1000,
                        }}
                        >
                            <Icon 
                                style={profileStyles.dropdownIcon}
                                name="check"
                                size={20}
                                color="#000"
                            />
                        </View>
                        <Text style={{marginHorizontal: 10, fontSize: 18}}>{props.title}</Text>
                    </View>
                    <Icon
                        style={profileStyles.dropdownIcon}
                        name="caret-right"
                    />
                </View>

                <View
                    style={{
                        borderBottomColor: 'black',
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