import {Alert, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image, Modal} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { createMood, getMoodDatabase, getMoodQueue, editMoodDatabase, editMood} from '../helper';
import { auth } from "../firebase-setup";
import { onSnapshot } from 'firebase/firestore';

export default function App({ navigation }) {

    const [moodList, setMoodLists] = useState({}); 
    const [moodData, setMoodData] = useState({}); 
    var date = new Date().getDate().toString(); //Current Date
    var month = (new Date().getMonth() + 1).toString(); //Current Month
    var year = new Date().getFullYear().toString(); //Current Year
    var todayDate = Date.now();
    if (date.length == 1) {
        date = '0' + date;
    }
    if (month.length == 1) {
        month = '0' + month;
    }
    const [currentDate, setCurrentDate] = useState(year + '-' + month + '-' + date);
    const [isVisible, setIsVisible] = useState(true);
    const [editedDate, setEditedDate] = useState(currentDate);


    const newMood = (tdy) => {
        var currentMood;
        console.log(editedDate);
        if (moodList.hasOwnProperty(editedDate)) {
            currentMood = moodList[editedDate]['mood'];
            editMood(moodList[editedDate]['itemID'],
                {
                  mood: tdy,
                  date: editedDate,
                  userId: auth.currentUser.uid
                }
              )
        } else {
            createMood({
                mood: tdy,
                date: editedDate,
                userId: auth.currentUser.uid
            });
        }
        if (tdy === 'happy') {
            moodData[0].happy = moodData[0].happy + 1;
        } else if (tdy === 'sad') {
            moodData[0].sad = moodData[0].sad + 1;
        } else if (tdy === 'angry') {
            moodData[0].angry = moodData[0].angry + 1;
        };
        if (currentMood === 'happy') {
            moodData[0].happy = moodData[0].happy - 1;
        } else if (currentMood === 'sad') {
            moodData[0].sad = moodData[0].sad - 1;
        } else if (currentMood === 'angry'){
            moodData[0].angry = moodData[0].angry - 1;
        };

        editMoodDatabase(moodData[0].itemID,
            {
                happy: moodData[0].happy,
                sad: moodData[0].sad,
                angry: moodData[0].angry,
                userId: moodData[0].userId,
            }
        );


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
                            
                            newMoods.push({date: doc.data().date, mood: doc.data().mood,itemID: doc.id});
                            if (doc.data().date == currentDate) {
                                setIsVisible(false);
                            };
                            });
                            var exist = {};
                            newMoods.forEach((a) => {
                                exist[a.date] = {}; 
                                exist[a.date]['mood'] = a.mood; 
                                exist[a.date]['itemID'] = a.itemID
                            })
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
    
    function Mapper(date, mood, itemID) {
        this.date = date;
        this.mood = mood;
        this.itemID = itemID;
    }
    return (
        <View style={styles.trueView}>
        <Calendar style= {styles.calendarStyle} onDayPress={day => { setSelected(day.dateString);}}
            markingType="custom"
            dayComponent={({date, state}) => {
                return (
                    (moodList.hasOwnProperty(date.dateString)) ? 
                        (moodList[date.dateString]['mood'] === 'sad') ? (
                            <TouchableOpacity onPress={() => {setEditedDate(date.dateString); setIsVisible(true)}}>
                                <Image source={require('../assets/sad.png')} style={styles.dayStyle}/>  
                            </TouchableOpacity>
                        ):
                        (moodList[date.dateString]['mood'] === 'happy' ? (
                            <TouchableOpacity onPress={() => {setEditedDate(date.dateString); setIsVisible(true)}}>
                                <Image source={require('../assets/laughing-emoji.png')} style={styles.dayStyle}/>  
                            </TouchableOpacity>
                        ):
                            ( 
                                <TouchableOpacity onPress={() => {setEditedDate(date.dateString); setIsVisible(true)}}>
                                    <Image source={require('../assets/angry.png')} style={styles.dayStyle}/>  
                                </TouchableOpacity>
                            )
                        ):
                        (<TouchableOpacity onPress={() => {if (todayDate > date.timestamp) {setIsVisible(true)}; 
                                                                                            setEditedDate(date.dateString); 
                                                          }}>
                            <Text> {date.day} </Text>
                        </TouchableOpacity>
                        )
                    );
                }}
                    
        />
        <Modal 
        style={styles.trueView}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        >
            <Text style={styles.headerText}>How are you feeling on {editedDate} ?</Text>
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
        </Modal>
    </View>
    );
}


const styles = StyleSheet.create({
    trueView: {
        flex:1,
    },

    modal: {
        flex: 1,
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