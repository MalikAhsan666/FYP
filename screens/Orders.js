import { View, Text } from 'react-native'
import React from 'react'
import {styles} from '../StyleSheet/Styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {PendingOrders} from './SpOrder/PendingOrders'
import {CompletedOrders} from './SpOrder/CompletedOrders'
import {RejectedOrders} from './SpOrder/RejectedOrders'

const Tab= createBottomTabNavigator();

const Orders = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='Pending'
        component={PendingOrders}
        >
        </Tab.Screen>

        <Tab.Screen
        name='Completed'
        component={CompletedOrders}
        >
        </Tab.Screen>

        <Tab.Screen
        name='Rejected'
        component={RejectedOrders}
        >
        </Tab.Screen>

    </Tab.Navigator>
  )
}

export  {Orders}