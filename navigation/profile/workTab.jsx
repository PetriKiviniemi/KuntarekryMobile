import React, {useEffect, useState} from 'react';
import {Text, View, Button, TouchableOpacity, ScrollView, LogBox} from 'react-native';
import Styles from '../../styles';
import {profileStyles} from './profileStyles'

import {getValue, loginUser, createNewUser} from '../../utils/asyncstorage_utils';
import LoginScreen from '../loginScreen';
import {DropdownMenu} from './dropdownMenu';
import {DegreeOverlay} from './degreeOverlay';
import {PersonalInfo} from './personalInfo'
import { AdditionalEducationOverlay } from './additionalEducationOverlay';
import { WorkExperienceOverlay } from './workExperienceOverlay';
import {ProfileTab} from './profileTab'

export const WorkTab = () => {
    return(
        <View>
            <Text>This is the work tab</Text>
        </View>
    )
}