import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import {styles} from '../StyleSheet/Styles';

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    let arr = []
    const docref = doc(db, 'clientNotifications', auth.currentUser.email);
    onSnapshot(docref, (doc) => {
      doc.data()?.reply.map((doc) => { arr.push({ id: doc.spId, status: doc.status }) })
      setNotifications(arr)
    })

  }

  useEffect(() => {
      fetchNotifications();
    
  }, [])

  return (
    <FlatList 
      data={notifications}
      renderItem={({ item }) => 
        <View style={styles.container}>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.postsStyle}>
              <View style={{ marginLeft: 10, marginTop: 17 }}>
                <Text style={[styles.postText, styles.postHeading]}>Your Hiring Request has been {item.status}</Text>
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

export { ClientNotifications };