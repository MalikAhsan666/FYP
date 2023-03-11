import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { styles } from '../StyleSheet/Styles';
import { async } from '@firebase/util';
import { doc, setDoc, query, where, getDoc, collection, onSnapshot, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from '../firebase/config';
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaFrame } from 'react-native-safe-area-context';


const SpNotifications = (props) => {
    const [notf, setNotf] = useState([]);
    const isFocused = useIsFocused();
    const [clientId, setClientId]=useState('');
    const [category, setCategory]=useState('');


    const cancelHiring = async()=>{
        setDoc(doc(db, 'clientNotifications', clientId),{
            status:'cancel',
            spId: auth.currentUser.email
        });
        const docRef = doc(db, 'spNotifications', clientId);
        await deleteDoc(docRef);
        setNotf('')
    }

    const acceptHiring = async()=>{
        setDoc(doc(db, 'clientNotifications', clientId),{
            status:'accept',
            spId: auth.currentUser.email
        });
       setDoc(doc(db, 'spPendingOrders', clientId),{
        spId: auth.currentUser.email,
        cId: clientId,
        category:category
       })
    }

    const getNotificaions = async () => {
        const arr = [];
        const collRef = collection(db, 'spNotifications');
        const q = query(collRef, where('spId', '==', auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
            setNotf(arr)
        })
    }

    useEffect(() => {
        if (isFocused) {
            getNotificaions();
        }

    }, [props, isFocused])

    return (
        <FlatList
            data={notf}
            renderItem={({ item }) =>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Accept or Reject Hiring Request",
                            "",
                            [
                                {
                                    text: "Reject",
                                    onPress: () => {cancelHiring()},
                                    style: "cancel"
                                },
                                { text: "Accept", onPress: () => {
                                    setClientId(item.cId);
                                     setClientId(item.cId); 
                                     setCategory(item.category);
                                     setCategory(item.category);
                                     setCategory(item.category);
                                     acceptHiring()} }
                            ]
                        );
                    }}>
                        <View style={styles.postsStyle}>
                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                <Text style={[styles.postText, styles.postHeading]}>Hiring Request for {item.category}</Text>

                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            }
        >

        </FlatList>
    )
}

export { SpNotifications };