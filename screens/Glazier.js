import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View,Dimensions, ScrollView,Image, TouchableOpacity } from 'react-native';
import {Avatar} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Glazier = ({navigation}) => {return(<Text style={{textAlign:"center",fontSize:20,fontWeight:'bold'}}>Glazier</Text>)}
export{Glazier};