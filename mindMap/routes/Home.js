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

const Tab = createMaterialBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Homepage"
      barStyle={{ height: 90 }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Journal"
        component={JournalEntry}
        /*options={{ tabBarBadge: Entypo }}*/
      />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Homepage" component={Statistic} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="Mood" component={Mood} />
    </Tab.Navigator>
  );
}
