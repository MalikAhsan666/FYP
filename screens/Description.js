import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import { styles } from '../StyleSheet/Styles';
import { async } from '@firebase/util';
import { db, auth, storage } from '../firebase/config';
import { setDoc, doc, collection, getDoc, addDoc, serverTimestamp, updateDoc, deleteField } from 'firebase/firestore';


const Description = ({ route, navigation }) => {
  const editPost = () => {
    navigation.navigate('EditPosts', { categ: route.params.categ , title: route.params.title,
    price: route.params.price, desc: route.params.desc})
  }

  const deletePost = async () => {
    const docRef = doc(db, 'spPosts', auth.currentUser.email);
    if (route.params.categ === 'architect') {
      updateDoc(docRef, {
        architect: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'capentar') {
      updateDoc(docRef, {
        capentar: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'ceilingInstaller') {
      updateDoc(docRef, {
        ceilingInstaller: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'civilEngineer') {
      updateDoc(docRef, {
        civilEngineer: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'electrician') {
      updateDoc(docRef, {
        electrician: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'glazier') {
      updateDoc(docRef, {
        glazier: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'marbleSetters') {
      updateDoc(docRef, {
        marbleSetters: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'painter') {
      updateDoc(docRef, {
        painter: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
    if (route.params.categ === 'plumber') {
      updateDoc(docRef, {
        plumber: deleteField()
      })
      navigation.navigate('serviceProviderHome')
    }
  }
  return (
    <View style={{ marginTop: 50, marginLeft:10 }}>
      <Text style={styles.postHeading}>{route.params.title}</Text>
      <Text style={[styles.postSubheading,{marginTop:40, fontSize:18}]}>About your post</Text>
      <Text style={[styles.card,styles.elevation,{fontSize:16}]}>{route.params.desc}</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={[styles.postText, {fontSize:17}]}>Starting At PKR:  </Text>
      <Text style={{fontSize:16}}>{route.params.price}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop:5, justifyContent:'center', marginTop:150 }}>
        <TouchableOpacity
          style={[styles.postsBtn,{marginLeft:10}]}
          onPress={editPost}>
          <Text style={[styles.buttonTitle,{fontSize:19}]}>Edit Gig</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.postsBtn, { backgroundColor: '#e33057', marginLeft:70}]}
          onPress={()=>{
            Alert.alert(
              "Are you sure you want to delete this gig?",
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => deletePost() }
              ]
            );
          }}>
          <Text style={[styles.buttonTitle,{fontSize:19}]}>Delete Gig</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { Description }