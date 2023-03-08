
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginPage';
import { RegistrationScreen } from './screens/Registration';
import { Home } from './screens/Home';
import { ServiceProviderHome } from './screens/ServiceProviderHome';
import { RegistrationPage2 } from './screens/RegistrationPage2';
import { CreateProfile } from './screens/CreateProfile';
import { Architecture } from './screens/Architecture';
import { CivilEngineer } from './screens/Civil-Engineer';
import { Electrician } from './screens/Electrician';
import { Plumber } from './screens/Plumber.';
import { Painter } from './screens/Painter';
import { Carpenter } from './screens/Carpenter';
import { Glazier } from './screens/Glazier';
import { MarbleSetters } from './screens/MarbleSetters';
import { CeilingInstaller } from './screens/CeilingInstaller';
import { Splashscreen } from './screens/splashscreen';
import { Sp_CreateProfile } from './screens/Sp_CreateProfile';
import { Sp_CreateProfile2 } from './screens/Sp_CreateProfile2';
import {CreateJob} from './screens/CreateJob';
import { Description } from './screens/Description';
import { EditPosts } from './screens/EditPosts';
import { EditServices } from './screens/EditServices';
import { GigsDescription } from './screens/GigsDescription';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splashscreen'>
        <Stack.Screen name='Splashscreen' component={Splashscreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}} />
        <Stack.Screen name="Registration" component={RegistrationScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home}  options={{headerShown:false}}/>
        <Stack.Screen name="serviceProviderHome" component={ServiceProviderHome}  options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="RegistrationPage2" component={RegistrationPage2}  options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="CreateProfile" component={CreateProfile}  options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='Sp_CreateProfile' component={Sp_CreateProfile}></Stack.Screen>
        <Stack.Screen name="Architecture" component={Architecture}  options={{headerShown:false}} />
        <Stack.Screen name="CivilEngineer" component={CivilEngineer}  options={{headerShown:false}}/>
        <Stack.Screen name="Plumber" component={Plumber}  options={{headerShown:false}}/>
        <Stack.Screen name="Electrician" component={Electrician}  options={{headerShown:false}}/>
        <Stack.Screen name="Painter" component={Painter}  options={{headerShown:false}}/>
        <Stack.Screen name="Carpenter" component={Carpenter}  options={{headerShown:false}}/>
        <Stack.Screen name="Glazier" component={Glazier}  options={{headerShown:false}}/>
        <Stack.Screen name="MarbleSetters" component={MarbleSetters}  options={{headerShown:false}}/>
        <Stack.Screen name="CeilingInstaller" component={CeilingInstaller}  options={{headerShown:false}}/>
        <Stack.Screen name="Sp_CreateProfile2" component={Sp_CreateProfile2}  options={{headerShown:false}}/>
        <Stack.Screen name="CreateJob" component={CreateJob}  options={{headerShown:false}}/>
        <Stack.Screen name="Description" component={Description}  options={{headerShown:false}}/>
        <Stack.Screen name="EditPosts" component={EditPosts}  options={{headerShown:false}}/>
        <Stack.Screen name="EditServices" component={EditServices}  options={{headerShown:false}}/>
        <Stack.Screen name="GigsDescription" component={GigsDescription}  options={{headerShown:false}}/>




      </Stack.Navigator>
    </NavigationContainer>
  );
}