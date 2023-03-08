import { Text, Stylesheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { ClientHomeScreen } from './ClientHomeScreen';
import { StackActions } from '@react-navigation/native';
import { CreateProfile } from './CreateProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { auth } from '../firebase/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();


const Home = () => {


  return (
    <>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ClientHomeScreen') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#2196F3',
      })}>
        <Tab.Screen name="ClientHomeScreen"
          component={ClientHomeScreen}
          options={{
            headerShown: false, tabBarLabel: "", 
          }}

        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false, tabBarLabel: ""
          }}
        />
      </Tab.Navigator>

    </>
  )
}

export { Home };