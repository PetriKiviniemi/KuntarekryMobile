import { requestBackgroundPermissionsAsync } from 'expo-location';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import Styles from '../styles'

const newsStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    filterNewsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#EBF6F9',
        paddingTop: 10,
        marginBottom: 50,
    },
    filterNewsButton: {
        margin: 5,
        padding: 5,
        width: 130,
        height: 35,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#AEE8D6',
    },
    newsCardContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'flex-start',
    },
    newsCardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    newsCardText: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 18,
    },
})

const NewsCard = (data) => {
    return(
        <TouchableOpacity style={newsStyles.newsCardContainer}>
            <Image style={newsStyles.newsCardImage} source={{uri: data['data']['image']}}/>
            <Text style={newsStyles.newsCardText}>
                {data['data']['title']} - Lue lisää täppäämällä!
            </Text>
            <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                width: '100%',
            }}
            />
        </TouchableOpacity>
    )
}

const FilterNewsButton = (title) => {
    //TODO:: Add filtering and touch callback

    return(
        <TouchableOpacity style={newsStyles.filterNewsButton}>
            <Text>{title['title']}</Text>
        </TouchableOpacity>
    )
}

export default function NewsScreen({ navigation }) {

    const [filterButtons, setFilterButtons] = useState([])

    const newsData = [
        {
            id: 0,
            title: 'Maanjäristys',
            image: 'https://images.pexels.com/photos/11836819/pexels-photo-11836819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 1,
            title: 'Inflaatio nousussa',
            image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 2,
            title: 'Inflaatio nousussa',
            image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 3,
            title: 'Inflaatio nousussa',
            image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    ]

    const filterOptions = [
        "Ajankohtaista", "Työelämä", "Uratarinat",
        "Töitä hakemassa", "Tapahtumat"
    ]

    useEffect(() => {
        //TODO:: Make more responsive to different layout sizes
        //Now max elements in a row is 3
        let tmp = []
        let row = []

        for(let i = 0; i < filterOptions.length; i++) 
        {
            row.push(filterOptions[i])
            if(i % 2 == 0 && i != 0)
            {
                tmp.push(row)
                row = []
            }
        }
        setFilterButtons(tmp)

    }, [])

    return (
        <View style={newsStyles.container}>

            <View style={Styles.row}>
                <Text style={{fontSize: 42, color: '#5FBCFF'}}>
                    Työelämän uutiset
                </Text>
            </View>

            <View style={newsStyles.filterNewsContainer}>
                <Text style={{paddingLeft: 10, paddingBottom: 20,}}>Löydä mielenkiintoisimmat uutiset</Text>
                {filterButtons.map((el, idx) => {
                    return(
                    <View style={{flexDirection: 'row'}} key={idx}>
                        {el.map((e, i) => {
                            return(<FilterNewsButton key={i} title={e}/>)
                        })}
                    </View>
                    )
                })}
            </View>


            <SafeAreaView style={{flex: 1}}>
                <ScrollView>
                    {newsData.map((el) => {
                        return(
                            <NewsCard key={el['id']} data={el}/>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>

        </View>
    );
}