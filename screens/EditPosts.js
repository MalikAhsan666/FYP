import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, TouchableOpacity, View , Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { db, auth, storage } from '../firebase/config';
import { setDoc, doc, collection, getDoc, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { async } from '@firebase/util';
import { styles } from '../StyleSheet/Styles';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TabRouter } from '@react-navigation/native';






function EditPosts({ navigation, route }) {
    const [jobtitle, setjobtitle] = useState(route.params.title);
    const [jobdescription, setjobdescription] = useState(route.params.desc);

    const [price, setPrice] = useState(route.params.price);

    const updatePost = async () => {
        const docRef = doc(db, 'spPosts', auth.currentUser.email);
        if (route.params.categ === 'architect') {
            updateDoc(docRef, {
                architect: {
                    category: 'Architect',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            },{merge:true})
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'carpentar') {
            updateDoc(docRef, {
                carpentar: {
                    category: 'Carpentar',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'ceilingInstaller') {
            updateDoc(docRef, {
                ceilingInstaller: {
                    category: 'Ceiling Installer',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'civilEngineer') {
            updateDoc(docRef, {
                civilEngineer: {
                    category: 'Civil Engineer',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'electrician') {
            setDoc(docRef, {
                electrician: {
                    category: 'Electrician',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            },{merge:true})
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'glazier') {
            updateDoc(docRef, {
                glazier: {
                    category: 'Glazier',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'marbleSetters') {
            updateDoc(docRef, {
                marbleSetters: {
                    category: 'Marble Setters',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'painter') {
            updateDoc(docRef, {
                painter: {
                    category: 'Painter',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
        if (route.params.categ === 'plumber') {
            updateDoc(docRef, {
                plumber: {
                    category: 'Plumber',
                    jobDescription: jobdescription,
                    jobTitle: jobtitle,
                    price: price
                }
            })
            navigation.navigate('serviceProviderHome')
        }
    }








    // const ifAnonymouse=async()=>{
    //     setErrorMsg(validate())
    //     const docRef = doc(db, 'clientProfiles', auth.currentUser.uid);
    //     const docSnap = await getDoc(docRef);

    //     if(docSnap.exists()){
    //         validate();

    //     }
    //     else{
    //         alert('Sign up to complete creating post!')
    //     }
    // }







    return (
        <View style={[styles.container, { marginTop: 100 }]}>

            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 'bold' }}>Edit Gig</Text>
            <SafeAreaView>


                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Gig Title:</Text>
                <TextInput
                    placeholder={route.params.title}
                    style={{ height: 70, backgroundColor: "lightgrey" }} multiline maxLength={40} onChangeText={(txt) => { setjobtitle(txt) }}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ fontSize: 10, color: "red", alignSelf: 'center' }}> max word count:40</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Pricing:</Text>
                <TextInput
                    placeholder={route.params.price}
                    style={{ height: 70, backgroundColor: "lightgrey" }} onChangeText={(txt) => { setPrice(txt) }}>
                </TextInput>

            </SafeAreaView>


            <SafeAreaView>

                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Gig Description:</Text>
                <TextInput
                    placeholder={route.params.desc}
                    style={{ backgroundColor: "lightgrey" }} multiline maxLength={2000} onChangeText={(txt) => { setjobdescription(txt) }}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 10, color: "red", textAlign: 'right', marginRight: 5 }}>max word count:2000</Text>
                </View>

                <TouchableOpacity style={{ elevation: 10, backgroundColor: "#2196F3", borderRadius: 30, paddingVertical: 10, width: 200, alignSelf: "center", }}
                    onPress={updatePost}>
                    <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Update Gig</Text>
                </TouchableOpacity>




            </SafeAreaView>

        </View>
    );
}
export { EditPosts };