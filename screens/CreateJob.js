import React, { useEffect, useState } from 'react';
import { Text, Button, SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { db, auth, storage } from '../firebase/config';
import { setDoc, doc, collection, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { async } from '@firebase/util';
import { styles } from '../StyleSheet/Styles';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




function CreateJob({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('None');
    const [jobtitle, setjobtitle] = useState('');
    const [jobdescription, setjobdescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');
    const [services, setServices] = useState([]);

    const [price, setPrice] = useState(0);

    const checkServices = async () => {
        setServices([]);
        const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        const a = [];
        docSnap.data().services.map(doc => { a.push(doc.item) })
        setServices(a)

    }



    useEffect(() => {
        //check the selected services of the service provider
        checkServices()


    }, [])






    const checkCategory = async () => {

        if (selectedCategory === 'Architect') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                architect: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email

            }, { merge: true });
        }

        if (selectedCategory === 'Carpentar') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                carpentar: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email


            }, { merge: true });
        }

        if (selectedCategory === 'Ceiling Installer') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                ceilingInstaller: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription
                    , postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email,



            }, { merge: true });
        }
        if (selectedCategory === 'Civil Engineer') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                civilEngineer: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email



            }, { merge: true });
        }
        if (selectedCategory === 'Electrician') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                electrician: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email



            }, { merge: true });
        }
        if (selectedCategory === 'Glazier') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                glazier: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email



            }, { merge: true });
        }
        if (selectedCategory === 'Marble Setters') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                marbleSetters: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email



            }, { merge: true });
        }
        if (selectedCategory === 'Painter') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e = docSnap.data().email;
            let f_name = docSnap.data().firstName;
            let l_name = docSnap.data().lastName;
            let orders = docSnap.data().ordersCompleted;
            let rating = docSnap.data().rating;
            let phone = docSnap.data().phone;
            let country = docSnap.data().country;
            let city = docSnap.data().city;
            let about = docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                painter: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email


            }, { merge: true });
        }
        if (selectedCategory === 'Plumber') {
            const docRef = doc(db, 'serviceProviderProfiles', auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            let e =         docSnap.data().email;                       
            let f_name =    docSnap.data().firstName;
            let l_name =    docSnap.data().lastName;
            let orders =    docSnap.data().ordersCompleted;
            let rating =    docSnap.data().rating;
            let phone =     docSnap.data().phone;
            let country =   docSnap.data().country;
            let city =      docSnap.data().city;
            let about =     docSnap.data().about;
            await setDoc(doc(db, "spPosts", auth.currentUser.email), {
                plumber: {
                    category: selectedCategory, jobTitle: jobtitle, jobDescription: jobdescription,
                    postAt: serverTimestamp(),
                    price: price,
                    email: e,
                    firstName: f_name,
                    lastName: l_name,
                    ordersCompleted: orders,
                    rating: rating,
                    phone: phone,
                    country: country,
                    city: city,
                    about: about
                },
                email: auth.currentUser.email,



            }, { merge: true });
        }
    }


    const validate = () => {
        if (selectedCategory === 'None') {
            alert('Job Category is null!')
        }
        if (jobtitle === '') {
            setErrorMsg('*Please Fill this Field')
        }
        else if (price == 0) {
            setErrorMsg2('*Please Fill this Field')
        }
        else {
            checkCategory()
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


    console.log(services)




    return (
        <ScrollView style={[styles.container, { marginTop: 100 }]}>

            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: 'bold' }}>Create Gig</Text>
            <SafeAreaView>
                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}> Category:</Text>
                <Picker
                    style={{ backgroundColor: "lightgrey" }}
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                    }>
                    <Picker.Item label="None" value="None" />
                    <Picker.Item
                        enabled={services.includes('Architect') ? true : false}
                        style={!services.includes('Architect') && { color: 'grey' }} label="Architect" value="Architect" />
                    <Picker.Item
                        enabled={services.includes('Carpentar') ? true : false}
                        style={!services.includes('Carpentar') && { color: 'grey' }} label="Carpentar" value="Carpentar" />
                    <Picker.Item
                        enabled={services.includes('Ceiling Installer') ? true : false}
                        style={!services.includes('Ceiling Installer') && { color: 'grey' }} label="Ceiling Installer" value="Ceiling Installer" />
                    <Picker.Item
                        enabled={services.includes('Civil Engineer') ? true : false}
                        style={!services.includes('Civil Engineer') && { color: 'grey' }} label="Civil Engineer" value="Civil Engineer" />
                    <Picker.Item
                        enabled={services.includes('Electrician') ? true : false}
                        style={!services.includes('Electrician') && { color: 'grey' }} label="Electrician" value="Electrician" />
                    <Picker.Item
                        enabled={services.includes('Glazier') ? true : false}
                        style={!services.includes('Glazier') && { color: 'grey' }} label="Glazier" value="Glazier" />
                    <Picker.Item
                        enabled={services.includes('Marble Setters') ? true : false}
                        style={!services.includes('Marble Setters') && { color: 'grey' }} label="Marble Setters" value="Marble Setters" />
                    <Picker.Item
                        enabled={services.includes('Painter') ? true : false}
                        style={!services.includes('Painter') && { color: 'grey' }} label="Painter" value="Painter" />
                    <Picker.Item
                        enabled={services.includes('Plumber') ? true : false}
                        style={!services.includes('Plumber') && { color: 'grey' }} label="Plumber" value="Plumber" />
                </Picker>

                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Gig Title:</Text>
                <TextInput
                    placeholder='I will do.....'
                    style={{ height: 70, backgroundColor: "lightgrey" }} multiline maxLength={40} onChangeText={(txt) => { setjobtitle(txt) }}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'red' }}>{errorMsg}</Text>
                    <Text style={{ fontSize: 10, color: "red", alignSelf: 'center' }}>{errorMsg === '' ? 'max word count:40' : ''}</Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Pricing:</Text>
                <TextInput
                    placeholder='e-g 60/sqft'
                    style={{ height: 70, backgroundColor: "lightgrey" }} onChangeText={(txt) => { setPrice(txt) }}>
                </TextInput>
                <Text style={{ color: 'red' }}>{errorMsg2}</Text>

            </SafeAreaView>


            <SafeAreaView>

                <Text style={{ fontSize: 15, fontWeight: "bold", fontStyle: "italic" }}>Gig Description:</Text>
                <TextInput style={{ backgroundColor: "lightgrey" }} multiline maxLength={2000} onChangeText={(txt) => { setjobdescription(txt) }}>
                </TextInput>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 10, color: "red", textAlign: 'right', marginRight: 5 }}>max word count:2000</Text>
                </View>

                <TouchableOpacity style={{ elevation: 10, backgroundColor: "#2196F3", borderRadius: 30, paddingVertical: 10, width: 200, alignSelf: "center", }}
                    onPress={validate}>
                    <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>Create Gig</Text>
                </TouchableOpacity>




            </SafeAreaView>

        </ScrollView>
    );
}
export { CreateJob };