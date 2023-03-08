import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { async } from '@firebase/util';
import { styles } from '../StyleSheet/Styles';


const Electrician = ({ navigation }) => {
    const [elec, setElec] = useState([]);

   

    const fetchElectricians = async () => {
        setElec([]);
        const docRef = collection(db, 'spPosts');
        const q = query(docRef, where('electrician.category', '==', 'Electrician'));

        const querySnapshot = await getDocs(q);
        let a = []; //for gigs
        querySnapshot.forEach((doc) => {
            a.push({
                id: doc.id, title: doc.data().electrician.jobTitle,
                desc: doc.data().electrician.jobDescription, price: doc.data().electrician.price,
                firstName: doc.data().electrician.firstName,
                lastName: doc.data().electrician.lastName,
                ordersCompleted: doc.data().electrician.ordersCompleted,
                rating: doc.data().electrician.rating,
                phone: doc.data().electrician.phone,
                country: doc.data().electrician.country,
                city: doc.data().electrician.city,
                about: doc.data().electrician.about,
})
            setElec(a);
            
        })

    }

    useEffect(() => {
        fetchElectricians();
    }, [])

    console.log(elec)
    return (
        <View>
            <Text style={{ marginTop: 40, textAlign: "center", fontSize: 20, fontWeight: 'bold' }}>Electricians</Text>
        
            <FlatList
                data={elec}
                renderItem={({ item }) =>
                    <View>
                        <TouchableOpacity 
                        style={[styles.card, styles.elevation,{marginTop:10, alignItems:'center'}]}
                        onPress={()=>{
                            navigation.navigate('GigsDescription',{title: item.title,
                           desc: item.desc, price:item.price,
                           firstName:item.firstName, lastName:item.lastName, ordersCompleted:item.ordersCompleted,
                           rating:item.rating, phone:item.phone, country:item.country, city:item.city,
                           about:item.about})
                        }}>
                             <Text style={styles.postHeading}>{item.firstName+item.lastName }    ({item.ordersCompleted})</Text>
                            <Text>{item.title}</Text>
                            <Text style={styles.postSubheading}>Rating {item.rating}</Text>
                            <Text style={styles.postSubheading}>Starting at PKR:</Text><Text> {item.price}</Text>
                        </TouchableOpacity>
                    </View>
                }
            ></FlatList>
            
        </View>
    )
}

export { Electrician };