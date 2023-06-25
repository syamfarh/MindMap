import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import JournalEntry from "./JournalEntry";
import Events from "./Events";
import Statistic from "./Statistic";
import Mood from "./Mood";
import Help from "./Help";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";

const Tab = createMaterialBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      barStyle={{ height: 90 }}
      backBehavior="history"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Homepage") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "ios-journal-sharp" : "ios-journal-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "ios-megaphone" : "ios-megaphone-outline";
          } else if (route.name === "Help") {
            iconName = focused ? "ios-help-buoy" : "ios-help-buoy-outline";
          } else if (route.name === "Mood") {
            iconName = focused ? "ios-happy" : "ios-happy-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={25}
              color={color}
              //   style={Styles.icon}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Journal" component={JournalEntry} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Homepage" component={Statistic} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="Mood" component={Mood} />
    </Tab.Navigator>
  );
}

// const Styles = StyleSheet.create({
//   icon: {
//     alignContent: "center",
//     justifyContent: "center",
//   },
// });
