import Entypo from 'react-native-vector-icons/Entypo'
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, BackHandler, Alert } from 'react-native';
import { createJournal } from '../helper';
import { auth } from "../firebase-setup";

export default function App({ navigation }) {
    const [diary, setDiary] = useState("");
    const [name, setName] = useState("New Document");
    const [change, setChange] = useState(true);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    const [currentDate, setCurrentDate] = useState(date + '/' + month + '/' + year + ' ' + hours + ':' + min);

    const pressedBack = () => {
        setChange(false);
        console.log(name);
        console.log(diary);
        console.log(auth.currentUser.uid);
        console.log(change);
    }
    const createDia = () => {
        createJournal({
            name: name,
            description: diary,
            date: currentDate,
            userId: auth.currentUser.uid
        });
    }

    useEffect(
      () =>
        navigation.addListener('beforeRemove', (e) => {
          console.log(change);
          if (!change) {
            // If we don't have unsaved changes, then we don't need to do anything
            createDia();
            return;
          }
  
          // Prevent default behavior of leaving the screen
          e.preventDefault();
  
          // Prompt the user before leaving the screen
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => {console.log(diary);navigation.dispatch(e.data.action)},
              },
            ]
          );
        }),
      [navigation, change]
    );

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <TouchableOpacity onPress={pressedBack}>
                    <Entypo name="save" size={30}></Entypo>
                </TouchableOpacity>
                <TextInput style={styles.docHeader} defaultValue='New Document' maxLength={20} caretHidden = {true} 
                onChangeText={setName}></TextInput>
                <Entypo name="menu" size={30}></Entypo>
            </View> 
            <View>
                <Text style={styles.dateStyle}>{currentDate}</Text>
            </View>
            <TextInput style={styles.textInput} multiline={true} onChangeText={text => {setDiary(text);if(!change)setChange(true)}}></TextInput>
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

    dateStyle: {
        position: 'absolute',
        height: 50,
        width: "100%",
        padding:5,
        top: 110,
        left: 150,
    },

    textInput: {
        top: 130,
        flex:1,
        padding: 5,
        textAlign:'left',
        textAlignVertical: 'top',
    },
  });

