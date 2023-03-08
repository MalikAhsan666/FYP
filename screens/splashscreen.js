
import { StatusBar } from 'expo-status-bar';
import React, { useState, useLayoutEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { doc, setDoc, collection, onSnapshot, query, where, getDoc, getDocs } from "firebase/firestore";


import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';


const Splashscreen = ({ navigation }) => {
    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const clientRef = doc(db, 'clients', user.email);
        const clientSnap =  await getDoc(clientRef);
        if(clientSnap.exists()){
            const clientProRef = doc(db, 'clientProfiles', user.email);
            const clientProSnap =  await getDoc(clientProRef);
            if(clientProSnap.exists()){
                navigation.navigate('Home');
            }
            else{
                navigation.navigate('CreateProfile')
            }
        }
        const sPRef = doc(db, 'serviceProviders', user.email);
        const sPSnap =  await getDoc(sPRef);
        if(sPSnap.exists()){
            const sPProRef = doc(db, 'serviceProviderProfiles', user.email);
            const sPProSnap =  await getDoc(sPProRef);
            if(sPProSnap.exists()){
                navigation.navigate('serviceProviderHome');
            }
            else{
                navigation.navigate('Sp_CreateProfile')
            }
        }
            }
            });







    }, [])


    const { colors } = useTheme();


    const anonymouseUser = () => {
        signInAnonymously(auth)
            .then(() => {
                navigation.replace('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='blue' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../images/logo.jpeg')}
                    style={[styles.logo, { borderRadius: 120 }]}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: colors.text
                }]}>Build Your Dream House With Us!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registration')}>
                        <Text style={{ color: 'white', fontWeight: "bold", justifyContent: "center" }}>
                            Signup
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: 'white', fontWeight: "bold", justifyContent: "center" }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }}
                    onPress={anonymouseUser}
                >
                    <Text style={{ fontWeight: 'bold', color: '#007AFF', fontSize: 17 }}>Continue as a guest</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}
export { Splashscreen };
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007AFF'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {

        marginTop: 20,
        backgroundColor: '#007AFF',
        elevation: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 70
    },

});