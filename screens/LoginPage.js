import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { styles } from '../StyleSheet/Styles';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase/config';
import { doc, setDoc, collection, onSnapshot, query, where, getDoc, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import * as Animatable from 'react-native-animatable';




const LoginScreen = ({ navigation }) => {


    // useEffect(() => {
    //         onAuthStateChanged(auth, async (user) => {
    //             if (user) {
    //                 const docRef = doc(db, "clientProfiles", auth.currentUser.uid);
    //                 const docSnap = await getDoc(docRef);

    //                 const docRef2 = doc(db, "clients", auth.currentUser.uid);
    //                 const docSnap2 = await getDoc(docRef2);

    //                 const docRef3 = doc(db, "serviceProviders", auth.currentUser.uid);
    //                 const docSnap3 = await getDoc(docRef3);


    //                 if (docSnap.exists()) {
    //                     navigation.replace('Home')
    //                 } else if(docSnap2.exists()) {
    //                     navigation.navigate('CreateProfile')
    //                 }
    //                 else if(docSnap3.exists()) {
    //                     navigation.navigate('Sp_CreateProfile')
    //                 }
    //                 else{
    //                     navigation.replace('Home')
    //                 }
    //             }
    //         });

        





    // }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                checkStatus();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });



    }

    const checkStatus = async () => {

        const clientRef = doc(db, 'clients', email);
        const clientSnap =  await getDoc(clientRef);
        if(clientSnap.exists()){
            const clientProRef = doc(db, 'clientProfiles', email);
            const clientProSnap =  await getDoc(clientProRef);
            if(clientProSnap.exists()){
                navigation.navigate('Home');
            }
            else{
                navigation.navigate('CreateProfile')
            }
        }
        const sPRef = doc(db, 'serviceProviders', email);
        const sPSnap =  await getDoc(sPRef);
        if(sPSnap.exists()){
            const sPProRef = doc(db, 'serviceProviderProfiles', email);
            const sPProSnap =  await getDoc(sPProRef);
            if(sPProSnap.exists()){
                navigation.navigate('serviceProviderHome');
            }
            else{
                navigation.navigate('Sp_CreateProfile')
            }
        }
        // let e;
        // const q = query(collection(db, "serviceProviders"), where("email", "==",
        //     email));
        // const querySnapshot = await getDocs(q);

        // querySnapshot.forEach((doc) => {
        //     e = doc.data().status;
        //     console.log("Collection", e)
        // });


        // const q2 = query(collection(db, "clients"), where("email", "==",
        //     email));
        // const querySnapshot2 = await getDocs(q2);

        // querySnapshot2.forEach((doc) => {
        //     e = doc.data().status;
        //     console.log("Collection", e)
        // });



        // if (e === 'serviceProvider') { navigation.replace('serviceProviderHome') }


        // //check whether the client has create its profile?

        // if (e === 'client') {
        //     const docRef = doc(db, 'clientProfiles', auth.currentUser.uid);
        //     const docSnap = await getDoc(docRef);

        //     if (docSnap.exists()) {
        //         navigation.replace('Home')
        //     }

        //     else {
        //         navigation.replace('CreateProfile')
        //         alert("Please Set up your profile before moving on!")
        //     }



        // }


    }



    const forgetPass = () => {
        if (email != null) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Email has sent Successfully! Click the link inside email to change password')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });

        }
        else {
            alert("Please provide valid Email!")
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={[styles.logos, { borderRadius: 120 }]}
                source={require('../images/logo.jpeg')}
            ></Image>
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor:'#2196F3'}]}
                onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                <TouchableOpacity onPress={forgetPass}><Text style={styles.footerLink}>Forget Password?</Text></TouchableOpacity>
            </View>





        </View>
    )
}

export { LoginScreen };


