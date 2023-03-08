import { View, Text , TouchableOpacity, ScrollView, StyleSheet, TextInput} from 'react-native'
import  React, { useState ,useEffect} from 'react';
import { collection, getDocs, query, where, setDoc, doc, addDoc, updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Styles} from '../StyleSheet/Styles';

const Sp_CreateProfile2 = ({route, navigation}) => {
    const [image, setImage] =useState(null);
    const [picture, setPicture] = useState(null);
    const[about, setAbout]=useState('');

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
    const sendToSP_profiles = async () => {
        
        
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            await setDoc(docRef, {
                firstName: route.params.n,
                lastName: route.params.l,
                email:auth.currentUser.email,
                phone: route.params.p,
                country: route.params.cntry,
                city: route.params.city,
                experience: route.params.exp,
                services: route.params.serv,
                picture: picture,
                createdAt: serverTimestamp(),
                rating: 0,
                ordersCompleted: 0,
                about: about
            });
            alert('Profile Created!')
            navigation.navigate('Login')

        

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
    <View style={{marginTop:70}} >
        <TextInput
        placeholder='Tell about yourself........'
        multiline
        numberOfLines={8}
        onChangeText={text => setAbout(text)}
        style={{padding: 2, borderBottomColor: '#2196F3',
        borderBottomWidth: 1,borderTopColor: '#2196F3', borderTopWidth:1}}
      />
      <TouchableOpacity style={[styles.commandButton, { backgroundColor: "#2196F3" }]}
                    onPress={pickImage}
                >
                    <Text style={styles.panelButtonTitle}>Upload Profile Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.commandButton, { backgroundColor: "#2196F3" }]}
                    onPress={sendToSP_profiles}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
    </View>
  )
}

export  {Sp_CreateProfile2}


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