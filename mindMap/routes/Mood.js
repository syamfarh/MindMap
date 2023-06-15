import {Alert, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { createMood, getMoodDatabase, getMoodQueue, editMoodDatabase } from '../helper';
import { auth } from "../firebase-setup";
import { onSnapshot } from 'firebase/firestore';

export default function App({ navigation }) {

    const [selected, setSelected] = useState('');
    const [moodList, setMoodLists] = useState({}); 
    const [moodData, setMoodData] = useState({}); 
    const [filteredList, setfilteredList] = useState([]);
    var date = new Date().getDate().toString(); //Current Date
    var month = (new Date().getMonth() + 1).toString(); //Current Month
    var year = new Date().getFullYear().toString(); //Current Year
    if (date.length == 1) {
        date = '0' + date;
    }
    if (month.length == 1) {
        month = '0' + month;
    }
    const [currentDate, setCurrentDate] = useState(year + '-' + month + '-' + date);
    const [isVisible, setIsVisible] = useState(true);


    const newMood = (tdy) => {
        createMood({
            mood: tdy,
            date: currentDate,
            userId: auth.currentUser.uid
        });
        if (tdy === 'happy') {
            moodData[0].happy = moodData[0].happy + 1;
        } else if (tdy === 'sad') {
            moodData[0].sad = moodData[0].sad + 1;
        } else {
            moodData[0].angry = moodData[0].angry + 1;
        };
        editMoodDatabase(moodData[0].itemID,
            {
                happy: moodData[0].happy,
                sad: moodData[0].sad,
                angry: moodData[0].angry,
                userId: moodData[0].userId,
            }
          )

    }

    useEffect(() => {
        let q = getMoodQueue();
        const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    if (querySnapshot.empty) {
                        setMoodLists([]);  
                    } else {
                        const newMoods = [];
                        querySnapshot.docs.forEach((doc) => {
                            newMoods.push({...doc.data()});
                            if (doc.data().date == currentDate) {
                                setIsVisible(false);
                            };
                            });
                            var exist = {};
                            newMoods.map((a) => exist[a.date] = a.mood);
                            setMoodLists(exist);
                            
                        }
                    },
                (err) => {
                    console.log(err);
                }
            );
            
            return () => {
                unsubscribe();
            };
            
      },[])

      useEffect(() => {
        let q = getMoodDatabase();
        const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    if (querySnapshot.empty) {
                        setMoodData([]);  
                    } else {
                        const newMoods = [];
                        querySnapshot.docs.forEach((doc) => {
                            newMoods.push({...doc.data(),itemID: doc.id});
                            });
                        setMoodData(newMoods);
                        }
                    },
                (err) => {
                    console.log(err);
                }
            );
            
            return () => {
                unsubscribe();
            };
            
      },[])


    return ( isVisible ? (
        <View style={styles.trueView}>
        <Text style={styles.headerText}>How are you feeling today?</Text>
        <View style={styles.emojiView}>
            <TouchableOpacity onPress={() => newMood('angry')}>
                <Image source={require('../assets/angry.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => newMood('happy')}>
                <Image source={require('../assets/laughing-emoji.png')} style={styles.imageStyle}/>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => newMood('sad')}>
                <Image source={require('../assets/sad.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
        </View>
        </View>) :
        <View>
            <Calendar style= {styles.calendarStyle} onDayPress={day => { setSelected(day.dateString);}}
                    markingType="custom"
                    dayComponent={({date, state}) => {
                        return (
                            (moodList.hasOwnProperty(date.dateString)) ? 
                                (moodList[date.dateString] === 'sad') ? (
                                    <View>
                                        <Image source={require('../assets/sad.png')} style={styles.dayStyle}/>  
                                    </View>
                                ):
                                (moodList[date.dateString] === 'happy' ? (
                                    <View>
                                        <Image source={require('../assets/laughing-emoji.png')} style={styles.dayStyle}/>  
                                    </View>
                                ):
                                ( 
                                    <View>
                                        <Image source={require('../assets/angry.png')} style={styles.dayStyle}/>  
                                    </View>
                                )
                            ):
                            (<Text>{date.day}</Text>)
                        );
                    }}
                        
            />
        </View>
    );
  }


const styles = StyleSheet.create({
    trueView: {
        flex:1,
    },
    headerText: {
        padding:20,
        top:150,
        fontSize:35,
    },
    emojiView: {
        borderRadius: 50,
        top:200,
        padding:30,
        flexDirection:'row',
        gap: 20,
        backgroundColor: "#B4B6B8",

    },

    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },

    calendarStyle: {
        top: 100,
        height: 300,
        borderRadius: 50
    },

    dayStyle: {
        height: 20,
        width: 20,
    }
});