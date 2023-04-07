import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

const OnboardingStyles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginBottom: 30
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center'
  },
  text: {
    color: Colors.lightMain,
    fontFamily: 'sans-serif-light',
  },
  chatAvatar: {
    backgroundColor: Colors.accentTealDark,
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 1000,
    width: 50,
    height: 50
  },
  chatBubble: {
    backgroundColor: Colors.accentTealDark,
    borderRadius: 1000,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  inputField: {
    height: 120,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position :'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center'
  },
  inputText: {
    height: 55,
    width: '100%',
    backgroundColor: Colors.lightMain,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  inputButton: {
    height: 55,
    alignSelf: 'flex-end',
    borderRadius: 20,
    width: 'auto',
    flexDirection: 'row',
    paddingHorizontal: 20,
  }
});

export default OnboardingStyles
