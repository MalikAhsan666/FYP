import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';



const Sp_CreateProfile = ({ navigation, route }) => {
    const [firstname, setfirstname] = useState("");
    const [username, setUserName] = useState('');
    const [lastname, setlastname] = useState("");
    const [phone, setphone] = useState("");
    const [Country, setCountry] = useState("");
    const [City, setCity] = useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [experience, setExperience] = useState('');



    const services = [
        {

            id: 1, item: 'Architect'
        },
        {
            id: 2, item: 'Plumber'
        },
        {
            id: 3, item: 'Electrician'
        },
        {
            id: 4, item: 'Glazier'
        },
        {
            id: 5, item: 'Civil Engineer'
        },
        {
            id: 6, item: 'Marbel Setter'
        },
        {
            id: 7, item: 'Ceiling Installer'
        },
        {
            id: 8, item: 'Carpentar'
        },
        {
            id: 9, item: 'Painter'
        }

    ];

    const next=()=>{
        navigation.navigate('Sp_CreateProfile2',{n: firstname, l: lastname, p: phone, cntry: Country, city: City, exp: experience, serv: selectedServices})
    }

   

    function onMultiChange() {
        return (item) => setSelectedServices(xorBy(selectedServices, [item], 'id'))
    }


    return (
        <ScrollView>
        <View style={styles.container}>

            <View style={{ margin: 20 }}>
                <View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {username}
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="First Name"
                        style={styles.textInput}
                        onChangeText={(name) => { setfirstname(name) }}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="Last Name"
                        style={styles.textInput}
                        onChangeText={(name) => { setlastname(name) }}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="Phone"
                        keyboardType="number-pad"
                        style={styles.textInput}
                        onChangeText={(phone) => { setphone(phone) }}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="globe" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="Country"
                        style={styles.textInput}
                        onChangeText={(country) => { setCountry(country) }}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="City"
                        style={styles.textInput}
                        onChangeText={(city) => { setCity(city) }}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" size={20} color="#2196F3" />
                    <TextInput
                        placeholder="Experience e-g 10 Years"
                        style={styles.textInput}
                        onChangeText={(exp) => { setExperience(exp) }}
                    />
                </View>
                
                <SelectBox
                    label="Services you provide"
                    options={services}
                    selectedValues={selectedServices}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                />

<TouchableOpacity style={[styles.commandButton, { backgroundColor: "#2196F3" }]}
                    onPress={next}>
                    <Text style={styles.panelButtonTitle}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

export { Sp_CreateProfile };


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

