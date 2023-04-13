import React, { useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import OnboardingStyles from "./onboardingStyles";
import Styles, { Colors } from "../../styles";
import Geolocation from "../../geolocation";

// Avatar bubble for chatbot icon
const ChatAvatar = ({}) => (
  <View style={ OnboardingStyles.chatAvatar }>
    <Icon
      name={ 'terminal' }
      size={ 20 }
      color={ Colors.darkMain }
    />
  </View>
);

// Message displayed by chatbot
const ChatBubble = ({ text }) => (
  <View style={ OnboardingStyles.chatBubble }>
    <Text style={[ OnboardingStyles.text, { fontSize: 17 } ]}>
      { text }
    </Text>
  </View>
);

// Area containing chat avatar and bubbles
export const ChatArea = ({ chatTexts }) => (
  <View style={{ flexDirection: 'column', flexBasis: 'auto', flexShrink: 1 }}>
    <ChatAvatar />
    {
      chatTexts.map(( item, i ) => <ChatBubble text={ item.text } key={ i } />)
    }
  </View>
)


// Value with checkbox
const ListItem = ({ item, tapFunc }) => (
  <View style = {{ paddingTop: 15 }}>
    <TouchableOpacity 
      style={[ Styles.row2, { justifyContent: 'space-between' } ]}
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
const CheckList = ({ data, tapFunc }) => (
    <View 
      style={{
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
        height: 'auto',
        alignSelf: 'flex-start'
      }}
    >
      {data.map(( item, i ) => <ListItem item={ item } tapFunc={ tapFunc } key={ i } />)}
    </View>
  )


// Box checking logic for ListWidget
const reducer = (state, action) => {
  if (action.type === 'CHECKED') {
    return state.map((item) => {
      if (item.name === action.name) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
  } else {
    return state;
  }
}

// Contains CheckList and ButtonContainer
// Handles list manipulation logic
export const ListWidget = ({ data, callback }) => {
  const [items, dispatch] = useReducer(reducer, data)

  const handleChecked = (item) => {
    dispatch({ type: 'CHECKED', name: item.name });
  }

  const handleButtonTapped = () => {
    let itms = items.slice()
    let checkedItems = []

    itms.forEach(item => {
      if (item.checked) checkedItems.push(item.name)
    });

    callback(checkedItems)
  }

  return (
    <View style= { OnboardingStyles.expandingView }>
      <CheckList data={ items } tapFunc={ handleChecked } />
      <ButtonContainer
        buttonFunc={ () => handleButtonTapped() }
      />
    </View>
  )
}

// Container containing button
export const ButtonContainer = ({ buttonFunc, text = null }) => (
  <View style={[ OnboardingStyles.inputField, { height: 55 } ]}>
    <NavigationButton buttonFunc={ buttonFunc } text={ text } />
  </View>
);

// Button for navigation between pages
export const NavigationButton = ({
  buttonFunc,
  text,
  brightColor = true
}) => (
  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
  <TouchableOpacity
    style={[
      OnboardingStyles.inputButton,
      Styles.alignCenter,
      {
        backgroundColor: brightColor
          ? Colors.accentGreenBright
          : Colors.accentGreenMedium,
      },
    ]}
    onPress={ buttonFunc }
  >
    <Text
      numberOfLines={ 1 }
      style={{ color: Colors.lightMain, fontSize: 16 }}
    >
      { text || "Jatketaan" }
    </Text>
  </TouchableOpacity>
  </View>
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
    <View
      style={[
        OnboardingStyles.inputField,
        { height: hasBackButton ? 175 : 120 },
      ]}
    >
      <View style={[ OnboardingStyles.inputText, { justifyContent: 'space-between' } ]}>
        <TextInput
          style={{ 
            color: Colors.greyDark,
            overflow: "hidden",
            flexBasis: '85%',
            flexGrow: 1
          }}
          placeholder={ placehonder }
          onChangeText={(text) => {
            inputFunc(text);
          }}
          underlineColorAndroid="transparent"
          value={ inputValue }
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
      <NavigationButton buttonFunc={ buttonFunc } />
      { hasBackButton ?
        <NavigationButton
          buttonFunc={ backFunc }
          text={ "Minulla on jo tili" }
          brightColor={ false }
        />
      : null }
    </View>
  );
};
