import React from 'react';
import { View, StyleSheet } from 'react-native';
import ParsedText from 'react-native-parsed-text';

const textStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  underline: {
    textDecorationLine: 'underline'
  }
})

// Cull first two and last two characters for render
// E.g., "B-bolded text-B" => "bolded text"
const cullMarkers = (matchingString) => {
  return matchingString.substr(2, matchingString.length - 4)
}

// Formats text with style markers
const ParsedTextSection = ({ text, viewStyle, textStyle }) => {
  return (
    <View style={ viewStyle }>
      <ParsedText
        style={ textStyle }
        parse={[
          { pattern: /B-(.+?)-B/, style: textStyles.bold, renderText: cullMarkers },
          { pattern: /U-(.+?)-U/, style: textStyles.underline, renderText: cullMarkers }
        ]}
      >
        { text }
      </ParsedText>
    </View>
  )
}

export default ParsedTextSection
