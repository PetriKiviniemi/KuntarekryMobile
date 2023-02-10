import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const { API_URL } = require('./apiurl');

const filteredData = (data) =>  {
  let filteredData = []
  let i = 0;

  data.forEach(item => {
    item.jobAdvertisement.id = item.jobAdvertisement.id + i;
    i++;
    filteredData.push(item)
  })

  return filteredData;
};

const Api = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getJobs = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json.jobAdvertisements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    data.forEach(item => {
      console.log(item.jobAdvertisement.title, item.jobAdvertisement.organization)
    })
  }, [isLoading] )

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredData(data)}
          keyExtractor={item => item.jobAdvertisement.id}
          renderItem={({item}) => (
            <Text>
              {item.jobAdvertisement.title}, {item.jobAdvertisement.organization}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Api;