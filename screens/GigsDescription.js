import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { styles } from '../StyleSheet/Styles';
import { auth } from '../firebase/config';
import { setDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';


const GigsDescription = ({ route, navigation }) => {
    const [category, setCategory]=useState(route.params.category);
    
    const Hire = async () => {
        await setDoc(doc(db, "spNotifications", route.params.emailId), {
            
                requests:arrayUnion({category:category,id: auth.currentUser.email})
            
        },{merge:true});

        Alert.alert(
            "Your request has been sent successfully!",
            "Service provider will contact you as soon as possible",
            [
                { text: "OK", onPress: () => {} }
            ]
        );
    }

    return (
        <ScrollView style={{ marginTop: 40 }}>
            <Text style={styles.postHeading}>{route.params.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={[styles.postSubheading, { fontSize: 17 }]}>About This Gig</Text>

            </View>
            <Text>{route.params.desc}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Starting At PKR</Text><Text> {route.params.price}</Text>
            <Text style={[styles.postSubheading, { marginTop: 10 }]}>About The Seller</Text>
            <View style={[styles.card, styles.elevation, { marginTop: 15 }]}>
                <Avatar.Image style={{ alignSelf: 'center' }} size={100} source={require('../images/purple.jpg')}></Avatar.Image>
                <TouchableOpacity >
                    <Text style={{ alignSelf: 'center', fontSize: 19 }}>{route.params.firstName}{route.params.lastName}</Text>
                    <Text style={{ alignSelf: 'center' }}>Orders Completed ({route.params.ordersCompleted})</Text>
                    <Text style={{ alignSelf: 'center' }}>Rating {route.params.rating}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 7, elevation: 10, backgroundColor: "#2196F3", borderRadius: 30, paddingVertical: 10, width: 200, alignSelf: "center", }}
                    onPress={Hire}>
                    <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Hire</Text>
                </TouchableOpacity>

            </View>



            <View style={{ alignSelf: 'center' }}>
                <Text style={styles.postSubheading}>From</Text>
                <Text>{route.params.country},{route.params.city}</Text>
                <Text></Text>
                <Text style={styles.postSubheading}>About Me</Text>
                <Text>{route.params.about}</Text>
            </View>
        </ScrollView>
    )
}

export { GigsDescription }