import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import Styles from "../../styles";
import { profileStyles } from "./profileStyles";

import {
  getValue,
  loginUser,
  createNewUser,
} from "../../utils/asyncstorage_utils";
import LoginScreen from "../loginScreen";
import { DropdownMenu } from "./dropdownMenu";
import { DegreeOverlay } from "./degreeOverlay";
import { PersonalInfo } from "./personalInfo";
import { AdditionalEducationOverlay } from "./additionalEducationOverlay";
import { WorkExperienceOverlay } from "./workExperienceOverlay";

export const ProfileTab = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={profileStyles.dropdownsContainer}>
        <View style={Styles.row2}>
          <Text style={profileStyles.profileTextField}>
            Omaa hakijaprofiiliasi voit käyttää pohjana työhakemuksissasi. Oman
            profiilisi tiedot eivät näy työnantajalle, he näkevät vain heille
            lähetetyt työhakemukset.
          </Text>
          <Text style={profileStyles.profileTextField}>
            Jos päivität perustietojasi (nimi, syntymäaika, sukupuoli, puhelin,
            sähköposti), ne päivittyvät automaattisesti kaikille aikaisemmin
            jättämillesi hakemuksille.
          </Text>
          <Text style={profileStyles.profileTextField}>
            Mikäli päivität profiilissasi tutkinnot, lisä- ja täydennyskoulutus
            ja työkokemustietoja, ne eivät päivity automaattisesti aikaisemmin
            jätetyille hakemuksille.
          </Text>
        </View>

        <View style={profileStyles.dropdownsWrapper}>
          <DropdownMenu
            title="PERUSTIEDOT"
            content={<PersonalInfo user={props.currentUser} />}
          />
          <DropdownMenu
            title="TUTKINNOT"
            content={<DegreeOverlay user={props.currentUser} />}
          />

          <DropdownMenu
            title="LISÄ- JA TÄYDENNYSKOULUTUS"
            content={<AdditionalEducationOverlay user={props.currentUser} />}
          />

          <DropdownMenu
            title="TYÖKOKEMUS"
            content={<WorkExperienceOverlay user={props.currentUser} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};
