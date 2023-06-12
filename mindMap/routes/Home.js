import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import JournalEntry from './JournalEntry';
import Journal from './Journal';

const Tab = createMaterialBottomTabNavigator();

export default function App({ navigation }) {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Journal" component={JournalEntry}/>
            
        </Tab.Navigator>
    )
}