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
    // Lokitus 1:ä varten
    let i = 0;
    // Lokitus 2:a varten
    let vars = []

    if (data.length > 0) {
      data.forEach(item => {
        // Lokitus 1: Kaikki tietyn avaimen arvot
        console.log(i, ' ', item.jobAdvertisement.region)
        i++;

        // Lokitus 2: kaikki tietyn avaimen arvojen varianssit. Jos pilkkulista, erottelee sen sisällön.
        if (!item.jobAdvertisement.region) return;

        let varTypes = item.jobAdvertisement.region.split(", ")
        varTypes.forEach(type => {
          if (!vars.includes(type)) {
            vars.push(type)
          }
        })
        
      })
    }
    // Lokitus 2:a varten
    console.log('Lukumäärä: ', vars.length)
    console.log(vars)
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
              {item.jobAdvertisement.title}, {item.jobAdvertisement.employment}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Api;