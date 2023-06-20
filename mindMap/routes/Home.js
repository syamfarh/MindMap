import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import JournalEntry from './JournalEntry';
import Mood from './Mood';
import Statistic from './Statistic';

const Tab = createMaterialBottomTabNavigator();

export default function App({ navigation }) {
    return(
        <Tab.Navigator initialRouteName='Homepage'>
            <Tab.Screen name="Journal" component={JournalEntry}/>
            <Tab.Screen name="Homepage" component={Statistic} />
            <Tab.Screen name="Mood" component={Mood}/>
        </Tab.Navigator>
    )
}