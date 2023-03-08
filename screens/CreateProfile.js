import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc} from "firebase/firestore";
import { db, auth, storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';




const CreateProfile = ({ navigation, route }) => {
  const [firstname, setfirstname] = useState("");
  const [username, setUserName] = useState('');
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {

    const uploadImage = async () => {
      //1. convert the image into blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network reques failed"));
        };
        xhr.responseType = 'blob';
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      //2. set meta of the image
      const metadata = {
        contentType: 'image/jpeg'
      };

      //3. upload image
      const storageRef = ref(storage, 'profiles/' + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setPicture(downloadURL);
          });
        }
      );
    }

    if (image != null) {
      uploadImage();
      setImage(null)
    }
  }, [image])


  //send data to clientsProfile collection when user is new, otherwise update
  const sendToClientsProfile = async () => {
    // let e;
    // const q = query(collection(db, "clientProfiles"), where("id", "==",
    //         auth.currentUser.uid));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       e=doc.id;
    //         console.log("id", doc.id)
    //         console.log(doc.data());
    //     });
    //     if(e===""){
    //       const docRef = doc(db, 'clientProfiles', auth.currentUser.uid);
    //       await updateDoc(docRef, {
    //         firstName: firstname,
    //         lastName: lastname,
    //         phone: phone,
    //         country: Country,
    //         city: City,
    //         picture:picture
    //       });
    //       navigation.navigate('Profile')
    //     }
        
          const docRef = doc(db, 'clientProfiles', auth.currentUser.email);
          await setDoc(docRef, {
            firstName: firstname,
            lastName: lastname,
            phone: phone,
            country: Country,
            city: City,
            picture:picture
          });
          navigation.navigate('Home')

        
    
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };


  return (
    <View style={[styles.container,{marginTop:50}]}>

      <View style={{ margin: 20 }}>
        <View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {username}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20}  color="#2196F3"/>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            onChangeText={(name) => { setfirstname(name) }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#2196F3"/>
          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            onChangeText={(name) => { setlastname(name) }}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={20} color="#2196F3"/>
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={(phone) => { setphone(phone) }}
          />
        </View>
        
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} color="#2196F3"/>
          <TextInput
            placeholder="Country"
            style={styles.textInput}
            onChangeText={(country) => { setCountry(country) }}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" size={20} color="#2196F3"/>
          <TextInput
            placeholder="City"
            style={styles.textInput}
            onChangeText={(city) => { setCity(city) }}
          />
        </View>

        <TouchableOpacity style={[styles.commandButton, {backgroundColor:"#2196F3"}]}
          onPress={pickImage}
        >
          <Text style={styles.panelButtonTitle}>Choose profile image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.commandButton, {backgroundColor:"#2196F3"}]}
          onPress={sendToClientsProfile}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { CreateProfile };


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
});

