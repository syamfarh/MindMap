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
import { StyleSheet, View } from "react-native";

const Tab = createMaterialBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      barStyle={Styles.bar}
      activeColor="black"
      inactiveColor="#42555E"
      backBehavior="history"
      //   shifting={true}
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
            <View style={Styles.icons}>
              <Ionicons
                name={iconName}
                size={25}
                color={"#42555E"}
                //   backgroundColor={route.name === "Homepage" ? "red" : "#FFFFF7"}

                //   style={Styles.icon}
              />
            </View>
          );
        },
        tabBarColor: "#FFFFF7",
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

const Styles = StyleSheet.create({
  bar: {
    paddingTop: 5,
    height: 90,
    backgroundColor: "#FFFFF7",
  },
});
