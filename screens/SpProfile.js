import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, RefreshControl, ScrollView,Image} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { db, auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { doc, setDoc, collection, onSnapshot, query, where, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { async } from '@firebase/util';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const SpProfile = ({ navigation, route }, props) => {
    
    
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [experience, setExperience] = useState(null);
  const [services, setServices] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [rating, setRating] = useState(null);
  const [about, setAbout] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {

    if (isFocused) {
      FetchFromSpProfiles();
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


  const FetchFromSpProfiles = async () => {
    const docRef = doc(db, "serviceProviderProfiles", auth.currentUser.email);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      setFirstName(docSnap.data().firstName)
      setLastName(docSnap.data().lastName)
      setPhone(docSnap.data().phone)
      setCountry(docSnap.data().country)
      setCity(docSnap.data().city)
      setExperience(docSnap.data().experience)
      //setCreatedAt(docSnap.data().createdAt)
      setRating(docSnap.data().rating)
      //setServices(docSnap.data().services)
      setAbout(docSnap.data().about)
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
                 <Avatar.Image size={60} source={require('../images/purple.jpg')}></Avatar.Image>
              <View style={{ marginLeft: 20 }}>
                <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{firstname+" "+lastname}</Title>
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

            <View style={styles.row}>
              <Icon name="certificate" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{experience}</Text>
            </View>
            <View style={styles.row}>
              <Icon2 name="design-services" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{services}</Text>
            </View>
            <View style={styles.row}>
              <Icon2 name="date-range" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{createdAt}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="face-man-profile" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>{about}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="star" color="#2196F3" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>Rating {rating}</Text>
            </View>

          </View>

          

          <View style={styles.menuWrapper}>
            <TouchableRipple
              //when already setup profile ripple name = edit profile
              onPress={() => {
                navigation.navigate('Sp_CreateProfile')
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
            <TouchableRipple onPress={()=>{navigation.navigate('EditServices')}}
              >
              <View style={styles.menuItem}>
                <Icon name="clipboard-edit-outline" color="#2196F3" size={25} />
                <Text style={styles.menuItemText}>Edit Services</Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() =>{logOut()}}>
              <View style={styles.menuItem}>
                <Icon name="key" color="#2196F3" size={25} />
                <Text style={styles.menuItemText}>Log Out</Text>
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
export { SpProfile };