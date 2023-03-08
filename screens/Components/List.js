import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);




// the filter
const List = ({ searchPhrase, setCLicked, data}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <TouchableOpacity
      onPress={()=>{
        item.name==='Architect'? navigation.navigate('Architecture'):
        item.name==='Plumber'? navigation.navigate('Plumber'): 
        item.name==='Electrician'? navigation.navigate('Electrician'): 
        item.name==='Carpentar'? navigation.navigate('Carpenter'): 
        item.name==='Painter'? navigation.navigate('Painter'): 
        item.name==='Civil Engineer'? navigation.navigate('CivilEngineer'): 
        item.name==='Ceiling Installer'? navigation.navigate('CeilingInstaller'): 
        item.name==='Marble Installer'? navigation.navigate('MarbleSetters'): 
        item.name==='Glazier'? navigation.navigate('Glazier'): ''
      }}><Item name={item.name}/></TouchableOpacity> ;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <TouchableOpacity
      onPress={()=>{
        item.name==='Architect'? navigation.navigate('Architecture'):
        item.name==='Plumber'? navigation.navigate('Plumber'): 
        item.name==='Electrician'? navigation.navigate('Electrician'): 
        item.name==='Carpentar'? navigation.navigate('Carpenter'): 
        item.name==='Painter'? navigation.navigate('Painter'): 
        item.name==='CivilEngineer'? navigation.navigate('CivilEngineer'): 
        item.name==='Ceiling Installer'? navigation.navigate('CeilingInstaller'): 
        item.name==='Marble Installer'? navigation.navigate('MarbleSetters'): 
        item.name==='Glazier'? navigation.navigate('Glazier'): ''
      }}><Item name={item.name}/></TouchableOpacity> ;
    }
    }
    return (
        <SafeAreaView style={styles.list__container}>
          <View
            onStartShouldSetResponder={() => {
              setCLicked(false);
            }}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
            />
          </View>
        </SafeAreaView>
      );
  };

  
    


export {List};

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});