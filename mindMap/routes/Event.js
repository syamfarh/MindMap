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
  Linking,
} from "react-native";
import { createJournal, editJournal } from "../helper";
import { auth } from "../firebase-setup";
import { SafeAreaView } from "react-native-safe-area-context";
import { waitForPendingWrites } from "firebase/firestore";
// import CalendarEvents from "react-native-calendar-events";
import RNCalendarEvents from "react-native-calendar-events";

const openCalendar = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("calshow:");
  } else if (Platform.OS === "android") {
    Linking.openURL("content://com.android.calendar/time/");
  }
};

export default function App({ route, navigation }) {
  const { item } = route.params;

  // React.useEffect(() => {
  //   RNCalendarEvents.requestPermissions()
  //     .then((res) => {
  //       console.log("Premission Response", res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const [eventTitle, setEventTitle] = React.useState("");
  // const [eventLocation, setEventLocation] = React.useState("");
  // const [date, setDate] = React.useState("");
  // const [open, setOpen] = React.useState("");
  // const [dateValue, setDateValue] = React.useState("");

  // const createEvent = () => {
  //   const newDate = new Date(date);
  //   newDate.setHours(newDate.getHours() + 2);

  //   RNCalendarEvents.saveEvent(eventTitle, {
  //     calendarID: "3",
  //     startDate: date.toISOString(),
  //     endDate: newDate.toISOString(),
  //     location: eventLocation,
  //   })
  //     .then((value) => {
  //       console.Console.log("Event ID-->", value);
  //     })
  //     .catch((error) => {
  //       console.log(" Did Not Work Threw an error -->", error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.headerText}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.subBox}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        {/* <TouchableOpacity>
          <Text style={styles.button} onPress={createEvent}>
            Add to calendar +
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Text style={styles.button} onPress={openCalendar}>
            Open Calendar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// export default function App({ route, navigation }) {
//   const { item } = route.params;

//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <Text style={styles.headerText}>{item.title}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//         <View style={styles.subBox}>
//           <Text style={styles.description}>{item.description}</Text>
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.button} onPress={checkCalendarPermissions}>
//             Add to calendar +
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

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
    marginTop: 15,
    borderWidth: 3,
    borderColor: "#aaa",
    fontWeight: "bold",
  },
});
