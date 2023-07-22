import React, { useState, useEffect } from "react";
import { Event } from "./Event";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

const EventList = ({ events, onEventPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onEventPress(item)}>
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.date}
      style={styles.flatList}
    />
  );
};

const EventDetails = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Text>Date: {event.date}</Text>
      {/*additional details*/}
    </View>
  );
};

import { getEventQueue } from "../helper";
import { onSnapshot } from "firebase/firestore";

export default function App({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let q = getEventQueue();
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setEvents([]);
        } else {
          const newEvents = [];
          querySnapshot.docs.forEach((doc) => {
            newEvents.push({ ...doc.data(), itemID: doc.id });
          });
          setEvents(newEvents);
          console.log(events);
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

  const handleEventPress = (event) => {
    navigation.getParent().navigate("Event", { item: event });

    console.log("Selected event:", event);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>What's Going On?</Text>
      <EventList events={events} onEventPress={handleEventPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fdfcdc",
  },
  headerText: {
    width: "100%",
    height: 100,
    // top: 45,
    fontWeight: 700,
    fontSize: 30,
    padding: 20,
    textAlign: "center",
    color: "#42555E",
  },
  item: {
    padding: 16,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor: "#ddd",
    borderRightColor: "#ddd",
    backgroundColor: "#63C1F5",
    borderRadius: 20,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    // marginBottom: 8,
    alignContent: "center",
    justifyContent: "center",
    color: "#42555E",
  },
  description: {
    color: "#42555E",
  },
  flatList: {},
});
