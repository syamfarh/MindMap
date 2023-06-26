import React, { useState } from "react";
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
      keyExtractor={(item) => item.id.toString()}
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

export default function App({ navigation }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Workshop: Stress Management Techniques",
      date: "2023-07-01",
      description:
        "Learn effective stress management techniques to improve your overall well-being as a student.",
    },
    {
      id: 2,
      title: "Yoga and Meditation Session",
      date: "2023-07-05",
      description:
        "Join us for a rejuvenating yoga and meditation session to relax and de-stress.",
    },
    {
      id: 3,
      title: "Healthy Cooking Class",
      date: "2023-07-10",
      description:
        "Learn how to prepare nutritious and delicious meals on a student budget.",
    },
    {
      id: 4,
      title: "Group Fitness Session",
      date: "2023-07-15",
      description:
        "Join a fun group fitness session to stay active and improve your physical well-being.",
    },
    {
      id: 5,
      title: "Art Therapy Workshop",
      date: "2023-07-20",
      description:
        "Explore your creativity and enhance your emotional well-being through art therapy.",
    },
    {
      id: 6,
      title: "Career Planning Seminar",
      date: "2023-07-25",
      description:
        "Get valuable insights and tips for planning your career path as a student.",
    },
    {
      id: 7,
      title: "Outdoor Adventure Day",
      date: "2023-07-30",
      description:
        "Join us for an exciting day of outdoor activities to boost your mental and physical well-being.",
    },
    {
      id: 8,
      title: "Self-Care Workshop",
      date: "2023-08-05",
      description:
        "Learn practical self-care strategies to prioritize your well-being as a student.",
    },
    {
      id: 9,
      title: "Time Management Seminar",
      date: "2023-08-10",
      description:
        "Enhance your productivity and time management skills to reduce stress and achieve academic success.",
    },
    {
      id: 10,
      title: "Mindfulness Workshop",
      date: "2023-08-15",
      description:
        "Discover the power of mindfulness and how it can positively impact your mental well-being.",
    },
  ]);

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
