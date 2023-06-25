import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { getMoodDatabase } from "../helper";
import { auth } from "../firebase-setup";
import { onSnapshot } from "firebase/firestore";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { signOut } from "firebase/auth";

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
            newMoods.push({ ...doc.data(), itemID: doc.id });
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mood Count</Text>
      <BarChart
        data={{
          labels: ["Happy", "Sad", "Angry"],
          datasets: [
            {
              data: moodList,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        fromZero
        chartConfig={{
          backgroundColor: "#63C1F5",
          backgroundGradientFrom: "#63C1F5",
          backgroundGradientTo: "#96D1F1",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <TouchableOpacity
        style={styles.LogOutButton}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.logOutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    fontWeight: 700,
    fontSize: 20,
  },

  logOutText: {
    position: "absolute",
    width: "100%",
    height: 30,
    top: 12,
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    verticalAlign: "middle",
  },

  LogOutButton: {
    width: 330,
    top: 150,
    height: 56,
    backgroundColor: "#1E232C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
