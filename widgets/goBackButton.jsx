import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles, { Colors } from "../styles";
import { DetailRow } from "./detailRow";

const GoBackButton = ({ title }) => {
  let navigator = useNavigation()

  return (
    <TouchableOpacity
      onPress={ () => navigator.goBack() }
      style={ [ { 
        backgroundColor: Colors.accentMain,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexBasis: 'auto',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
      }, 
        Styles.border ] 
      }
    >
      <DetailRow 
        value={ title }
        type={ 'goBack' }
        rowStyle={ { flexDirection: 'row' } }
        iconColor={ Colors.darkMain }
        flexed={ false }
      />
    </TouchableOpacity>
  )
}

export default GoBackButton
