import Entypo from "react-native-vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
} from "react-native";
import { createJournal, editJournal } from "../helper";
import { auth } from "../firebase-setup";
import { SafeAreaView } from "react-native-safe-area-context";
import { waitForPendingWrites } from "firebase/firestore";
// import CalendarEvents from "react-native-calendar-events";
import RNCalendarEvents from "react-native-calendar-events";

const checkCalendarPermissions = async () => {
  try {
    const status = await RNCalendarEvents.checkPermissions({
      readOnly: false, // Set this to true if you only need read access to calendar events
    });

    if (status === "authorized") {
      // User has granted calendar permissions
      console.log("Calendar permissions granted.");
    } else if (status === "denied") {
      // User has denied calendar permissions
      console.log("Calendar permissions denied.");
    } else {
      // Permissions have not been requested yet
      console.log("Calendar permissions not requested yet.");
    }
  } catch (error) {
    // Handle any error that occurred while checking permissions
    console.log("Error checking calendar permissions:", error);
  }
};

export default function App({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.headerText}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.subBox}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.button}>Add to calendar +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30 + StatusBar.currentHeight,
    padding: 30,
    backgroundColor: "#fdfcdc",
    flex: 1,
  },
  box: {
    padding: 20,
    // borderColor: "black",
    borderRadius: 30,
    // borderWidth: ,
    backgroundColor: "#63C1F5",
    flex: 1,
    borderBottomColor: "#aaa",
    borderRightColor: "#aaa",
    borderBottomWidth: 10,
    borderRightWidth: 10,
    // alignContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#d16994",
  },
  date: {
    margin: 20,
    fontWeight: "bold",
    fontSize: 15,
  },
  subBox: {
    padding: 20,
    backgroundColor: "#fed9b7",
    borderRadius: 30,
    flex: 1,
    borderWidth: 3,
    borderColor: "#aaa",
  },
  description: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  button: {
    fontSize: 20,
    color: "#555",
    backgroundColor: "#ddd",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
    height: 50,
    borderRadius: 30,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#aaa",
    fontWeight: "bold",
  },
});
