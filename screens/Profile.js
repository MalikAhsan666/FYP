import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, RefreshControl, ScrollView,Image} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { doc, setDoc, collection, onSnapshot, query, where, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { async } from '@firebase/util';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const Profile = ({ navigation, route }, props) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [image, setImage] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {

    if (isFocused) {
      FetchFromClientProfiles();
    }


  }, [props, isFocused]);


  //logout
  const logOut = () => {
    signOut(auth).then(() => {
      
      navigation.replace('Login')
    }).catch((error) => {
      // An error happened.
    });

  }


  const FetchFromClientProfiles = async () => {
    const docRef = doc(db, "clientProfiles", auth.currentUser.email);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      setFirstName(docSnap.data().firstName)
      setLastName(docSnap.data().lastName)
      setPhone(docSnap.data().phone)
      setCountry(docSnap.data().country)
      setCity(docSnap.data().city)
      setImage(docSnap.data().picture)

      

    }





  }



  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);





 


  return (
    <>

      <SafeAreaView style={[styles.container, {marginTop:50}]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {/* <Image source={{url:image}} style={{height:50, width:50, borderRadius:100}}
                 /> */}
                 <Image style={{height:100, width:100, borderRadius:100}}  source={{uri:image}}></Image>
              <View style={{ marginLeft: 20 }}>
                <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{firstname===''? 'Anonymous': firstname+" "+lastname}</Title>
                <Caption style={styles.caption}>userid</Caption>

              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{City}, {Country}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{phone}</Text>
            </View>

          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple
              //when already setup profile ripple name = edit profile
              onPress={() => {
                if(firstname!=''){
                navigation.navigate('CreateProfile')
                }
                else{
                  alert('Sign up required!')
                }
              }
              }
                >
              <View style={styles.menuItem}>
                <Icon name="account" color="#2196F3" size={25} />
                <Text style={styles.menuItemText}>{firstname === "" ? "Create Profile" : "Edit Profile"}</Text>
              </View>
            </TouchableRipple>
          </View>


          <View style={styles.menuWrapper}>
            {/* <TouchableRipple onPress={()=>{
              if(firstname!=''){
                navigation.navigate('Posts')
                }
                else{
                  alert('Sign up required!')
                }
            }
            }
              >
              <View style={styles.menuItem}>
                <Icon name="cart" color="#2196F3" size={25} />
                <Text style={styles.menuItemText}>Posts</Text>
              </View>
            </TouchableRipple> */}
          </View>
          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() =>{
              if(firstname===''){
                navigation.navigate('Registration')
              }
              else{logOut()}
              }}>
              <View style={styles.menuItem}>
                <Icon name="key" color="#2196F3" size={25} />
                <Text style={styles.menuItemText}>{firstname===''? 'Signu Up' : 'Log Out'}</Text>
              </View>
            </TouchableRipple>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>

  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
export { Profile };