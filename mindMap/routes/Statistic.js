import Entypo from 'react-native-vector-icons/Entypo'
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import { getMoodDatabase } from '../helper';
import { auth } from "../firebase-setup";
import { onSnapshot } from 'firebase/firestore';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default function App({ route, navigation }) {
    const [moodData, setMoodData] = useState({}); 
    const [moodList, setMoodList] = useState([]); 
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
                        if (moodList.length < 3) {
                            moodList.push(newMoods[0].happy);
                            moodList.push(newMoods[0].sad);
                            moodList.push(newMoods[0].angry);
                        }
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
    return (
        <View>
            <Text> Test </Text>
        <BarChart
            data={{
            labels: ["Happy", "Sad", "Angry"],
            datasets: [
                {
                data: moodList
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
})

