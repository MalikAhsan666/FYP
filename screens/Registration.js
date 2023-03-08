import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { styles } from '../StyleSheet/Styles';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";

const RegistrationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


   


    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
        
            navigation.navigate('RegistrationPage2', { email: email, password: password })


    }

    return (
        <View style={styles.container}>
             <Image
            style={[styles.logos, {borderRadius:120}]}
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
                onPress={() => onRegisterPress()}>
                <Text style={styles.buttonTitle}>Next</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
            </View>
        </View>
    )
}

export { RegistrationScreen };