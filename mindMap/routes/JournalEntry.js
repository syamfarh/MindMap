import Entypo from "react-native-vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { onSnapshot } from "firebase/firestore";
import { getJournalQueue, deleteJournal } from "../helper";

export default function App({ navigation }) {
  const [journals, setjournals] = useState([]);
  const [visible, setVisible] = useState(false);

  const addNewJournal = () => {
    navigation.getParent().navigate("Journal", { item: {} });
  };

  const editNewJournal = (q) => {
    navigation.getParent().navigate("Journal", { item: q.item });
  };

  const renderButton = (q) => {
    return (
      <View style={styles.container}>
        <Entypo name="book" size={15}></Entypo>
        <TouchableOpacity>
          <Text style={styles.eachJournal} onPress={() => editNewJournal(q)}>
            {" "}
            {q.item.name}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="circle-with-cross"
            size={20}
            onPress={() => deleteCross(q.item.itemID)}
          ></Entypo>
        </TouchableOpacity>
      </View>
    );
  };

  deleteCross = (q) => {
    Alert.alert("Delete?", "Press confirm to delete", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "DELETE", onPress: () => pressDeleteJournal(q) },
    ]);
  };

  async function pressDeleteJournal(q) {
    try {
      await deleteJournal(q);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    let q = getJournalQueue();
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setjournals([]);
        } else {
          const newdiaries = [];
          querySnapshot.docs.forEach((doc) => {
            newdiaries.push({ ...doc.data(), itemID: doc.id });
          });
          setjournals(newdiaries);
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
    <View style={(flex = 1)}>
      <Text style={styles.headerText}>My Journal</Text>
      <SafeAreaView style={styles.flat}>
        <FlatList
          data={journals}
          keyExtractor={(item) => item.itemID}
          renderItem={renderButton}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={addNewJournal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#63C1F5",
    width: "100%",
    borderColor: "#FFFFFF",
    borderWidth: 0.25,
    borderRadius: 20,
  },

  headerText: {
    width: "100%",
    height: 78,
    top: 30,
    fontWeight: 700,
    fontSize: 30,
    padding: 20,
  },

  flat: {
    justifyContent: "center",
    paddingTop: 30,
  },

  eachJournal: {
    padding: 10,
    borderWidth: 0,
    flex: 1,
    height: 60,
    top: 10,
    width: 330,
  },
  entryScreenContainer: {
    flex: 1,
    bottom: -300,
  },
  input: {
    height: 200,
    borderColor: "gray",
    borderWidth: 10,
    marginBottom: 16,
    padding: 100,
    alignItems: "flex-end",
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#63C1F5",
    position: "absolute",
    right: 50,
    top: 625,
  },

  buttonText: {
    bottom: 8,
    fontSize: 40,
    fontWeight: 300,
  },
});
