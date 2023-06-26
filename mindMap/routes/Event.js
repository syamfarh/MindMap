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

export default function App({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.headerText}>{item.title}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <View style={styles.subBox}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
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
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#d16994",
  },
  date: {
    margin: 20,
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
});
