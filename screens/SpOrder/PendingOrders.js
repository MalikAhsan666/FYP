import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../StyleSheet/Styles'
import { collection, getDoc, onSnapshot, query, where, doc } from 'firebase/firestore'
import { async } from '@firebase/util'
import { auth, db } from '../../firebase/config'

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    const docRef= doc(db, 'spPendingOrders', auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    let arr = []
    docSnap.data().pendingOrder.map((doc)=>{arr.push({id:doc.cId, category:doc.category})})
    setPendingOrders(arr)
  }

  useEffect(() => {
    fetchPendingOrders();
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
                <Text>{item.id}</Text>

              </View>
            </View>
          </TouchableOpacity>
        </View>
      }
    ></FlatList>
  )
}

export { PendingOrders }