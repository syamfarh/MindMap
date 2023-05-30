import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <Entypo name="back" size={30}></Entypo>
                <TextInput style={styles.docHeader} placeholder='New Document' maxLength={20} caretHidden = {true}></TextInput>
                <Entypo name="menu" size={30}></Entypo>
            </View> 
            <TextInput style={styles.textInput} multiline={true}></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#E0E0E0",
      flex: 1,
    },
    bar: {
        backgroundColor: '#757575',
        position: 'absolute',
        height: 60,
        top: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    
    docHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        width: 300,
    },

    textInput: {
        borderWidth: 1,
        top: 110,
        flex:1,
        padding: 10,
        textAlign:'left',
        textAlignVertical: 'top',
    },
  });

