import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import JobAdvertisement from './jobAdvertisementScreen';

export default function Infoscreen({ navigation }) {
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <JobAdvertisement />
      </View>
    </ScrollView>
  );
}