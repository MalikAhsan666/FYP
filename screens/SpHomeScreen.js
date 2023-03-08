import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { styles } from '../StyleSheet/Styles';
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { doc, setDoc, query, where, getDoc, collection, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase/config';
import { async } from '@firebase/util';
import { Avatar } from 'react-native-paper';




const SpHomeScreen = ({ navigation }, props) => {
    const [posts, setPosts] = useState([]);
    //const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    const readData = async () => {
        setPosts([]);
        const docRef = doc(db, 'spPosts', auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const arr = []
            arr.push(docSnap.data())
            setPosts(arr)
        }


    }



    useEffect(() => {
        if (isFocused) {
            readData()
        }


    }, [props, isFocused]);
    return (
        <ScrollView style={{ marginTop: 40 }}>
            <Avatar.Image style={{alignSelf:'center'}} size={150} source={require('../images/logo.jpeg')}></Avatar.Image>
            
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#2196F3' }]}
                onPress={() => { navigation.navigate('CreateJob') }}>
                <Text style={[styles.buttonTitle, {fontSize:20}]}>Create Gig</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize:20 , marginTop:30, fontStyle:'italic'}}>Your Gigs</Text>
            {posts != '' ? (
                <FlatList
                    data={posts}
                    renderItem={({ item }) =>
                        <View>
                            {/* item.architect.jobCategory? is used to check that architect gig exists or not? */}

                            {
                                item.architect?.category ? (
                                    <>

                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.architect?.jobDescription, categ: 'architect',
                                                    price: item.architect.price, title: item.architect.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postsStyle}>
                                                <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/architect.jpg')}></Avatar.Image>
                                                <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                    <Text style={[styles.postText, styles.postHeading]}>{item.architect.category}</Text>
                                                    <Text>{item.architect.jobTitle}</Text>
                                                    <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.architect.price}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : ''
                            }

                            {
                                item.ceilingInstaller?.category ? (
                                    <>

                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.ceilingInstaller?.jobDescription, categ: 'ceilingInstaller'
                                                    , price: item.ceilingInstaller.price, title: item.ceilingInstaller.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postStyle}>
                                            <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.ceilingInstaller.category}</Text>
                                                <Text>{item.ceilingInstaller.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.ceilingInstaller.price}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </>

                                ) : ''
                            }

                            {
                                item.plumber?.category ? (
                                    <>

                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.plumber?.jobDescription, categ: 'plumber', price: item.plumber.price,
                                                    title: item.plumber.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postsStyle}>
                                            <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.plumber?.category}</Text>
                                                <Text>{item.plumber?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.plumber?.price}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : ''
                            }
                            {
                                item.painter?.category ? (
                                    <>

                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.painter?.jobDescription, categ: 'painter', price: item.painter.price,
                                                    title: item.painter.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postsStyle}>
                                            <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.painter?.category}</Text>
                                                <Text>{item.painter?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.painter?.price}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : ''
                            }
                            {
                                item.marbleSetters?.category ? (
                                    <>

                                        <TouchableOpacity style={styles.btn} onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.marbleSetters?.jobDescription, categ: 'marbleSetters',
                                                    price: item.marbleSetters.price, title: item.marbleSetters.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postsStyle}>
                                            <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>

                                                <Text style={[styles.postText, styles.postHeading]}>{item.marbleSetters?.category}</Text>
                                                <Text>{item.marbleSetters?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.marbleSetters?.price}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : ''
                            }
                            {
                                item.glazier?.category ? (


                                    <TouchableOpacity style={styles.btn} onPress={() => {
                                        navigation.navigate('Description',
                                            {
                                                desc: item.glazier?.jobDescription, categ: 'glazier',
                                                price: item.glazier.price, title: item.glazier.jobTitle
                                            })
                                    }}>
                                        <View style={styles.postsStyle}>
                                        <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                        <View style={{ marginLeft: 10, marginTop: 17 }}>
                                            <Text style={[styles.postText, styles.postHeading]}>{item.glazier?.category}</Text>
                                            <Text>{item.glazier?.jobTitle}</Text>
                                            <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.glazier?.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ) : ''
                            }
                            {
                                item.electrician?.category ? (


                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Description',
                                            {
                                                desc: item.electrician?.jobDescription, categ: 'electrician',
                                                price: item.electrician.price, title: item.electrician.jobTitle
                                            })
                                    }}>
                                        <View style={styles.postsStyle}>
                                            <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.electrician?.category}</Text>
                                                <Text>{item.electrician?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>  {item.electrician?.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ) : ''
                            }
                            {
                                item.civilEngineer?.category ? (


                                    <TouchableOpacity style={styles.btn} onPress={() => {
                                        navigation.navigate('Description',
                                            {
                                                desc: item.civilEngineer?.jobDescription, categ: 'civilEngineer',
                                                price: item.civilEngineer.price, title: item.civilEngineer.jobTitle
                                            })
                                    }}>
                                        <View style={styles.postsStyle}>
                                        <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                            <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.civilEngineer?.category}</Text>
                                                <Text>{item.civilEngineer?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.civilEngineer?.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ) : ''
                            }
                            {
                                item.carpentar?.category ? (
                                    <>

                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Description',
                                                {
                                                    desc: item.carpentar?.jobDescription, categ: 'carpentar',
                                                    price: item.carpentar.price, title: item.carpentar.jobTitle
                                                })
                                        }}>
                                            <View style={styles.postsStyle}>
                                                <Avatar.Image style={{ marginTop: 10 }} size={75} source={require('../images/electric.jpg')}></Avatar.Image>
                                                <View style={{ marginLeft: 10, marginTop: 17 }}>
                                                </View>
                                                <Text style={[styles.postText, styles.postHeading]}>{item.carpentar?.category}</Text>
                                                <Text>{item.carpentar?.jobTitle}</Text>
                                                <Text><Text style={styles.postSubheading}>Starting At PKR</Text>{item.carpentar?.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                ) : ''
                            }

                        </View>
                    }
                >
                </FlatList>
            ) : <Text style={{alignSelf:'center', marginTop:140}}>No Gigs To Show</Text>
            }
        </ScrollView>
    )
}

export { SpHomeScreen }