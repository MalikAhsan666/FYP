
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../StyleSheet/Styles';
import { RadioButton } from 'react-native-paper';
import { doc, setDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase/config';
import { async } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
    {
        item: 'client'
    },
    {
        item: 'ServiceProvider'
    }

]

const RegistrationPage2 = ({ navigation, route }) => {
    const [checked, setChecked] = React.useState({});




    const onSubmitPress = async () => {
        


        createUserWithEmailAndPassword(auth, route.params.email, route.params.password)
            .then(async (userCredential) => {
                if (checked.item === 'client') {

                    await setDoc(doc(db, "clients", route.params.email), {
                        email: route.params.email,
                        status: 'client'
                    });
                }
                if (checked.item === 'ServiceProvider') {
                    await setDoc(doc(db, "serviceProviders", route.params.email), {
                        email: route.params.email,
                        status: 'serviceProvider'
                    });
                }

                

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
            alert('Registered Successfully!');

    }


    function onChange() {
        return (val) => setChecked(val)
      }

    return (
        
        <View style={styles.container}>
            <Image
                style={[styles.logos, { borderRadius: 120, marginTop: 50 }]}
                source={require('../images/logo.jpeg')}
            ></Image>
            <Text style={{ fontSize: 20, paddingBottom: 10 , alignSelf:'center', marginTop:20}}>Who are you?</Text>
            <View style={{marginLeft:10}}>
            <SelectBox
                label="Select single"
                options={K_OPTIONS}
                value={checked}
                onChange={onChange()}
                hideInputFilter={false}
            />

            </View>
            
           
            <TouchableOpacity
                style={[styles.button, {backgroundColor:'#2196F3'}]}
                onPress={() => onSubmitPress()}>
                <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export { RegistrationPage2 };