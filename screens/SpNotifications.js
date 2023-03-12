import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { styles } from '../StyleSheet/Styles';
import { async } from '@firebase/util';
import { doc, setDoc, arrayUnion, query, where, getDoc, collection, onSnapshot, getDocs, updateDoc, deleteDoc, DocumentSnapshot, increment } from "firebase/firestore";
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
           reply:arrayUnion({status:'cancel', spId:auth.currentUser.email}) 
        },{merge:true});
        const docRef = doc(db, 'spNotifications', auth.currentUser.email);
        await deleteDoc(docRef);
        setNotf('');

        setDoc(doc(db, 'spCancelOrders', auth.currentUser.email),{
            rejectedOrders:increment(1)
        });


    }

    const acceptHiring = async()=>{
        setDoc(doc(db, 'clientNotifications', clientId),{
            reply:arrayUnion({status: 'accept', spId: auth.currentUser.email})
        });
        
       setDoc(doc(db, 'spPendingOrders', auth.currentUser.email),{
        pendingOrder: arrayUnion({cId: clientId, category:category}) 
       }, {merge:true})
    }

    const getNotificaions = async () => {
        let arr=[]
        const docref= doc(db, 'spNotifications', auth.currentUser.email);
        const docSnap = await getDoc(docref);
        docSnap.data()?.requests.map((doc)=>{arr.push({category:doc.category, id:doc.id})})
        setNotf(arr)
        
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
                                    setClientId(item.id);
                                     setClientId(item.id); 
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
                                <Text>{item.id}</Text>

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