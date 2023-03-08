import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slideshow from "react-native-image-slider-show";
import { Searchbar } from './Components/Searchbar';
import { List } from './Components/List';



const dataSource = [
  {
    url: 'https://scontent.fisb5-1.fna.fbcdn.net/v/t39.30808-1/300774460_408383621398651_1488990632436172364_n.jpg?stp=cp0_dst-jpg_e15_q65_s240x240&_nc_cat=106&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=3mHNC3v-ZHAAX_QbO6L&_nc_ht=scontent.fisb5-1.fna&oh=00_AfDfR4wCSAXSC3_GuNBkkcDquxRNUQMQTMe7f0J9RYow1A&oe=6398A51B'

  },
  {

    url:
      'https://c8.alamy.com/comp/2BT7P8X/construction-plans-and-yellow-helmet-on-the-background-of-a-dream-house-2BT7P8X.jpg'
  },

  {

    url:
      'https://constructionreviewonline.com/wp-content/uploads/2021/07/Home-construction.jpg'
  },
  {
    url:
      'https://www.primegoldgroup.com/wp-content/uploads/2022/01/Building-my-dream-house.jpg'
  },
  {
    url: 'https://designthoughts.org/wp-content/uploads/2022/01/pluming-Electrical-Architecture-Design.jpg'
  }
];

const img = { uri: "https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg?w=360&t=st=1670650096~exp=1670650696~hmac=3485ce260ef312a45ec906bbccc27c3d002026995060b92fa7419577a53311b9" };


const ClientHomeScreen  = ({ navigation, route }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setCLicked] = useState(false);
  const myData = [{ name: 'Architect' },
  { name: 'Plumber' },
  { name: 'Electrician' },
  { name: 'Carpentar' },
  { name: 'Painter' },
  { name: 'Civil Engineer' },
  { name: 'Ceiling Installer' },
  { name: 'Marble Installer' },
{name: 'Glazier'}];

  const [position, setPosition] = useState(0)

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 2000);
    return () => clearInterval(toggle);
  })

  return (

   


      <ScrollView vertical showsverticallScrollIndicator={false}>
      

        <SafeAreaView style={[styles.container, {marginTop:40}]} >
        <SafeAreaView >
                <Searchbar
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setCLicked={setCLicked}
                  />
                {clicked && (

                    <List
                        searchPhrase={searchPhrase}
                        data={myData}
                        setCLicked={setCLicked}
                    />

                )}

            </SafeAreaView>

          <View>
            <Slideshow position={position} dataSource={dataSource} />
          </View>


      
          <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Hire Service Professionals</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 20, position: 'relative' }}>


            <TouchableOpacity onPress={() => navigation.navigate('Architecture')}>
              <Avatar.Image source={{ uri: 'https://www.nicepng.com/png/detail/893-8937187_industrial-worker-clipart-architecture-construction-ouvrier-chantier-png.png', }}
                size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Architecture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CivilEngineer')}>
              <Avatar.Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/005/084/919/non_2x/civil-engineering-tools-supervise-construction-and-planning-such-as-rulers-verniers-calipers-helmets-pencils-boots-plans-blueprint-tape-measure-crane-laptop-free-vector.jpg', }}
                size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Civil-Engineer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Plumber')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/friendly-plumber-he-dressed-work-600w-274858382.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Plumber</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Electrician')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/electrician-600w-136825310.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Electrician</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Painter')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/caucasian-smiling-painter-uniform-holding-600w-549338014.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Painter</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Carpenter')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/carpenter-sawing-wood-on-table-600w-1212641593.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Carpenter</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Glazier')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/plastic-windows-install-repair-service-600w-1734276611.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Glazier</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('MarbleSetters')}>
              <Avatar.Image source={{ uri: 'https://media.istockphoto.com/id/1400404924/vector/isometric-style-illustration-of-a-tiler-at-work.webp?s=612x612&w=is&k=20&c=m1RTfaBueRriZVvDwjhQNq52BLCRRRCbSy2YUcskjGA=', }} size={80} />
              <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>MarbleSetters</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CeilingInstaller')}>
              <Avatar.Image source={{ uri: 'https://www.9wood.com/wp-content/uploads/2020/05/shutterstock_1180654882-1536x1024.jpg', }} size={80} />
              <Text style={{ fontWeight: 'bold' }}>CeilingInstaller</Text>
            </TouchableOpacity>

          </View>


          <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}>Buy Materials</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 22, position: 'relative' }}>


            <TouchableOpacity onPress={() => navigation.navigate('Architecture')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/cement-bags-paper-sacks-isolated-600w-1695443854.jpg', }}
                size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Cement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CivilEngineer')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/heap-sand-isolated-600w-1102885712.jpg', }}
                size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Sand</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Plumber')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/set-5-metal-parts-structures-600w-1976025920.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Steel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Electrician')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/isometric-vector-illustration-gravel-pile-600w-1874013214.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Concrete</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Painter')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/vector-illustration-set-transparent-glass-600w-633304970.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Glass</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Carpenter')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/wooden-sign-old-texture-3d-600w-1927261718.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Wood</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('Glazier')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/realistic-vector-brick-wall-seamless-600w-1761886034.jpg', }} size={80} />
              <Text style={{ marginLeft: 15, fontWeight: 'bold' }}>Brick</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('MarbleSetters')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/rock-stone-cartoon-banner-set-600w-1485348935.jpg', }} size={80} />
              <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>Stone</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CeilingInstaller')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/false-ceiling-installation-isolated-concept-600w-2181445923.jpg', }} size={80} />
              <Text style={{ fontWeight: 'bold' }}>Ceiling</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CeilingInstaller')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/traditional-ornate-portuguese-decorative-color-600w-1195796191.jpg', }} size={80} />
              <Text style={{ fontWeight: 'bold' }}>Tiles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CeilingInstaller')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/set-violet-gold-marble-abstract-600w-1875677461.jpg', }} size={80} />
              <Text style={{ fontWeight: 'bold' }}>Marble</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CeilingInstaller')}>
              <Avatar.Image source={{ uri: 'https://www.shutterstock.com/image-vector/apartment-building-people-open-window-600w-1643393476.jpg', }} size={80} />
              <Text style={{ fontWeight: 'bold' }}>Windows</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView></ScrollView>
   
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
export { ClientHomeScreen }