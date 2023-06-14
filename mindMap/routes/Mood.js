import {Alert, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';

export default function App({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState('');
    
    return ( isVisible ? (
        <View style={styles.trueView}>
        <Text style={styles.headerText}>How are you feeling today?</Text>
        <View style={styles.emojiView}>
            <TouchableOpacity>
                <Image source={require('../assets/angry.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/laughing-emoji.png')} style={styles.imageStyle}/>    
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/sad.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
        </View>
        </View>) :
        <View>
            <Calendar style= {styles.calendarStyle} onDayPress={day => { setSelected(day.dateString);}}
                      markedDates={{[selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
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
        height: 350,
    }
});