import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { styles } from '../StyleSheet/Styles';
import { async } from '@firebase/util';
import {db, auth, storage} from '../firebase/config';
import { setDoc, doc, updateDoc, getDoc, arrayUnion} from 'firebase/firestore';

const EditServices = ({navigation}) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [preServices, setPreServices] = useState([]);
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

    const checkServices = async () => {
        setPreServices([]);
        const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        const a = [];
        const b=[];
        docSnap.data().services.map(doc => { a.push(doc.item); b.push({id:doc.id, item:doc.item}) })
        setPreServices(a)
        setSelectedServices(b)

    }

    useEffect(()=>{
        checkServices();
    },[])
    
    const updateServices = async() => {
        console.log(selectedServices)
        const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
        await updateDoc(docRef, {
            services:selectedServices 
        },{merge:true});
        navigation.navigate('serviceProviderHome')
    }



    function onMultiChange() {
        return (item) => setSelectedServices(xorBy(selectedServices, [item], 'id'))
    }

    
    return (
        <View style={{marginTop:40}}>
            <Text style={styles.postHeading}>Your previous selected services</Text>
            <Text></Text>
            <FlatList
            data={preServices}
            renderItem={({item, index})=>
            <View>
                <Text style={[styles.postSubheading,{fontSize:18, color:'#2196F3'}]}>{index+1}. {item}</Text>
            </View>
            }
            >
            </FlatList>
            <Text></Text>
            <Text></Text>
            <SelectBox
                label="Add new Services"
                options={services}
                selectedValues={selectedServices}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
            />
            <TouchableOpacity style={{ marginTop:300, elevation: 10, backgroundColor: "#2196F3", borderRadius: 30, paddingVertical: 10, width: 200, alignSelf: "center", }}
                    onPress={()=>{updateServices()}}>
                        <Text style={{fontSize:15, color:'white', fontWeight:'bold', alignSelf:'center', fontSize:18}}>Add services</Text>
                </TouchableOpacity>
        </View>
    )
}

export { EditServices }