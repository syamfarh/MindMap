import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ["Happy", "Sad", "Angry"],
    datasets: [
      {
        data: moodList,
      },
    ],
  });
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
  const onRefresh = () => {
    setRefreshing(true);
    refreshChart();
    console.log("refreshed");
    setRefreshing(false);
  };

  const refreshChart = () => {
    const newData = {
      labels: ["Happy", "Sad", "Angry"],
      datasets: [
        {
          data: moodList,
        },
      ],
    };
    setChartData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.titleText}>Mood Count</Text>

        <BarChart
          data={chartData}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          fromZero
          chartConfig={{
            backgroundColor: "#00afb9",
            backgroundGradientFrom: "#63C1F5",
            backgroundGradientTo: "#63C1F5",
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ADDDF7",
    paddingTop: "10%",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#ADDDF7",
    justifyContent: "center",
    alignItems: "center",
  },

  titleText: {
    fontWeight: 700,
    fontSize: 30,
    color: "#42555E",
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
    top: "10%",
    height: 56,
    backgroundColor: "#42555E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
