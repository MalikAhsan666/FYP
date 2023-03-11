import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../StyleSheet/Styles'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { async } from '@firebase/util'
import { auth, db } from '../../firebase/config'

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    const q = query(collection(db, 'spPendingOrders'), where('spId', '==', auth.currentUser.email))
    let arr = []
    const unsub = onSnapshot(q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
          setPendingOrders(arr);
        })

      })
  }

  useEffect(() => {
    fetchPendingOrders();
    console.log(pendingOrders)
  }, [])

  return (
    <FlatList
      data={pendingOrders}
      renderItem={({ item }) =>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.postsStyle}>
              <View style={{ marginLeft: 10, marginTop: 17 }}>
                <Text style={[styles.postText, styles.postHeading]}>Hiring Request for {item.category}</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
    ></FlatList>
  )
}

export { PendingOrders }