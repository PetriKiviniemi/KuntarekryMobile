import { StyleSheet } from "react-native";

// Color constants
export const Colors = StyleSheet.create({
  accentMain: '#AEE8D6',
  accentContrast: '#E8AEC0',
  accentDark: 'teal',
  accentBright: '#37C298',
  accentBlue: '#0094FF',
  accentBlueDark: '#3B72BE',
  darkMain: 'black',
  lightMain: 'white',
  light2: 'azure',
  grey: '#B4B4B4',
  greyDark: '#5B5B5B'
})

const Styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingBottom: 20,
      paddingTop: 10
    },
    containerBright: {
      backgroundColor: Colors.lightMain,
    },
    containerDim: {
      backgroundColor: Colors.light2,
    },
    card: {
      display: "flex",
      flexDirection: 'row',
      padding: 10,
      backgroundColor: Colors.accentMain,
      borderRadius: 20,
      marginBottom: 10,
    },
    border: {
      borderWidth: 1,
      borderColor: Colors.darkMain,
      borderRadius: 20,
    },
    button: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: Colors.accentMain,
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      minWidth: '33%',
      textAlign: 'center',
    },
    buttonLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: Colors.darkMain,
      textAlign: 'center'
    },
    title: {
      fontSize: 24, 
      marginBottom: 10,
      color: Colors.accentBlue
    },
    h1: {
      textAlign: 'left',
      marginBottom: 10,
      fontSize: 24,
    },
    h2: {
      textAlign: 'left',
      fontSize: 20,
      marginBottom: 10,
    },
    h2IconProps: {
      color: Colors.accentDark,
      size: 20
    },
    h3: {
      fontSize: 18
    },
    icon: {
      paddingEnd: 10,
      textAlignVertical: 'center',
    },
    iconButton: {
      textAlignVertical: 'center',
      padding: 5,
    },
    iconButtonProps: {
      color: Colors.darkMain,
      size: 30
    },
    iconDetailProps: {
      size: 15,
      color: Colors.darkMain,
      colorAlt: Colors.accentMain
    },
    rowButton: {
      paddingTop: 20,
      alignItems: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    viewToggle: {
      color: Colors.accentDark,
      paddingTop: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    row: {
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'flex-start',
    },
    row2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 3
    },
    centeredRow: {
        marginLeft: 8,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });

export default Styles;
