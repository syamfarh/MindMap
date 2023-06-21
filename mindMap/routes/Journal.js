import Entypo from 'react-native-vector-icons/Entypo'
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { createJournal, editJournal } from '../helper';
import { auth } from "../firebase-setup";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({ route, navigation }) {
    const { item } = route.params;
    const [diary, setDiary] = useState("");
    const [name, setName] = useState("New Document");
    const [change, setChange] = useState(true);
    const [edited, setEdited] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    var date = new Date().getDate().toString(); //Current Date
    var month = (new Date().getMonth() + 1).toString(); //Current Month
    var year = new Date().getFullYear().toString(); //Current Year
    var hours = new Date().getHours().toString(); //Current Hours
    var min = new Date().getMinutes().toString(); //Current Minutes
    if (date.length == 1) {
      date = '0' + date;
    }
    if (month.length == 1) {
      month = '0' + month;
    }
    if (min.length == 1) {
      min = '0' + min;
    }
    const [currentDate, setCurrentDate] = useState(year + '-' + month + '-' + date + ' ' + hours + ':' + min);


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

    const editDia = () => {
      editJournal(item.itemID,
        {
          name: name,
          description: diary,
          date: currentDate,
          userId: auth.currentUser.uid
        }
      )

    }

    useEffect( 
      () => {
        if (Object.keys(item).length) {
          setDiary(item.description);
          setName(item.name);
          setEdited(true);
        };
      },[]
    )


    useEffect(
      () =>
        navigation.addListener('beforeRemove', (e) => {
          if (!change) {
            if (!edited) {
              console.log("creating...");
              createDia();
            } else {
              console.log("editing...");
              editDia();
            };
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

    useEffect(() => {
      // array of words
      const words = diary.split(' ');
  
      // update word count
      let wordCount = 0;
      words.forEach((word) => {
        if (word.trim() !== '') {
          wordCount++;
        }
      });
      setWordCount(wordCount);
    }, [diary]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bar}>
                <TouchableOpacity onPress={pressedBack}>
                    <Entypo name="save" size={30}></Entypo>
                </TouchableOpacity>
                <TextInput style={styles.docHeader} defaultValue={name} maxLength={20} caretHidden = {true} 
                onChangeText={setName}></TextInput>
                <Entypo name="menu" size={30}></Entypo>
            </View> 
            <View style={styles.subHeader}>
              <Text >{wordCount} words</Text>
              <Text style={styles.dateStyle}>{currentDate}</Text>
            </View>
            <TextInput style={styles.textInput} multiline={true} defaultValue={diary} 
            onChangeText={text => {setDiary(text);if(!change)setChange(true)}}>
            </TextInput>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#E0E0E0",
      flex: 1,
    },
    bar: {
        backgroundColor: '#63C1F5',
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        borderWidth: 0.5,
    },

    subHeader: {
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 5,
      paddingBottom: 10,
    },
    
    docHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        width: 300,
    },

    dateStyle: {
        left: 95,
    },

    textInput: {
        padding: 5,
        textAlign:'left',
        textAlignVertical: 'top',
        height:'100%',
        
    },
  });

