import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import OnboardingStyles from "./onboardingStyles";
import Styles, { Colors } from "../../styles";
import Geolocation from "../../geolocation";

// Avatar bubble for chatbot icon
export const ChatAvatar = ({}) => (
  <View style={OnboardingStyles.chatAvatar}>
    <Icon name={"terminal"} size={20} color={Colors.darkMain} />
  </View>
);

// Message displayed by chatbot
export const ChatBubble = ({ text }) => (
  <View style={OnboardingStyles.chatBubble}>
    <Text style={[OnboardingStyles.text, { fontSize: 17 }]}>{text}</Text>
  </View>
);

// Value with checkbox
const ListItem = ({ item, tapFunc }) => (
  <View style = {{ paddingTop: 15 }}>
    <TouchableOpacity 
      style={[ Styles.row2, { justifyContent: 'space-between'} ]}
      onPress={ () => tapFunc(item) }
    >
      <Text style={[ OnboardingStyles.text, OnboardingStyles.subtitle ]}>
        { item.name }
      </Text>
      <View style={{ flexDirection: 'row', alignContent: 'center', width: '10%' }}>
        <Icon
          name={ item.checked ? 'check-square-o' : 'square-o' }
          size={ 30 }
          color={ Colors.greyDarkest }
        />
      </View>
    </TouchableOpacity>
    <View
      style={{
        width: '50%',
        borderBottomColor: Colors.accentTealDark,
        borderBottomWidth: 1,
      }}
    />
  </View>
)

// List with selectable values
export const CheckList = ({ data, tapFunc }) => {
  return (
    <View style={{ flexDirection: 'column', width: '100%', marginVertical: 10 }} >
      <FlatList 
        data={ data }
        renderItem={({item, i}) => <ListItem item={ item } tapFunc={ tapFunc } key={ i } />}
      />
    </View>
  )
}

// Container that sticks to the bottom containing buttun
export const ButtonContainer = ({ buttonFunc, text = null }) => (
  <View style={[OnboardingStyles.inputField, { height: 60 }]}>
    <NavigationButton buttonFunc={buttonFunc} text={text} />
  </View>
);

// Button for navigation between pages
export const NavigationButton = ({
  buttonFunc,
  text,
  brightColor = true,
  width = "33%",
}) => (
  <TouchableOpacity
    style={[
      OnboardingStyles.inputButton,
      Styles.alignCenter,
      {
        backgroundColor: brightColor
          ? Colors.accentGreenBright
          : Colors.accentGreenMedium,
        width: width,
      },
    ]}
    onPress={buttonFunc}
  >
    <Text style={{ color: Colors.lightMain, fontSize: 16 }}>
      {text || "Jatketaan"}
    </Text>
  </TouchableOpacity>
);

// Field with text input and one or two buttons
export const InputField = ({
  placehonder,
  inputFunc,
  inputValue,
  buttonFunc,
  hasBackButton = false,
  backFunc = null,
  hasGeolocation = false,
}) => {
  return (
    <KeyboardAvoidingView
      style={[
        OnboardingStyles.inputField,
        { height: hasBackButton ? 175 : 120 },
      ]}
    >
      <View style={[ OnboardingStyles.inputText, { justifyContent: 'space-between'} ]}>
        <TextInput
          style={{ 
            color: Colors.greyDark,
            overflow: "hidden",
            flexBasis: '85%',
            flexGrow: 1
          }}
          placeholder={placehonder}
          onChangeText={(text) => {
            inputFunc(text);
          }}
          underlineColorAndroid="transparent"
          value={inputValue}
        />
        {hasGeolocation ? (
          <View style={{ alignSelf:'center', marginEnd: 10 }}>
            <Geolocation
              callback={(inputValue) => {
                inputFunc(inputValue);
              }}
            />
          </View>
        ) : null}
      </View>
      <NavigationButton buttonFunc={buttonFunc} />
      {hasBackButton ? (
        <NavigationButton
          buttonFunc={backFunc}
          text={"Minulla on jo tili"}
          brightColor={false}
          width="50%"
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};
