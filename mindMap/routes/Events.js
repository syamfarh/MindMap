import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Events = () => {
  return (
    <View>
      <Text style={styles.headerText}>What's Going On?</Text>
      {}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  headerText: {
    width: "100%",
    height: 100,
    top: 45,
    fontWeight: 700,
    fontSize: 30,
    padding: 20,
    textAlign: "center",
  },
});

// //events list that when clicked
// //gives description and can be added to planner automatically as event
// //via another button

// import {
//     Alert,
//     View,
//     TextInput,
//     Button,
//     StyleSheet,
//     TouchableOpacity,
//     Text,
//     SafeAreaView,
//   } from "react-native";

// export default function App({ navigation }) {
//   const editNewJournal = (q) => {
//     navigation.getParent().navigate("Journal", { item: q.item });
//   };

//   const renderButton = (q) => {
//     return (
//       <View style={styles.container}>
//         {/* <Entypo name="book" size={15}></Entypo> */}
//         <TouchableOpacity>
//           <Text style={styles.eachEvent} onPress={() => editNewJournal(q)}>
//             {" "}
//             {q.item.name}{" "}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Entypo
//             name="circle-with-cross"
//             size={20}
//             onPress={() => deleteCross(q.item.itemID)}
//           ></Entypo>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={(flex = 1)}>
//       <Text style={styles.headerText}>What's Going On?</Text>
//       <SafeAreaView style={styles.flat}>
//         <FlatList
//           data={journals}
//           keyExtractor={(item) => item.itemID}
//           renderItem={renderButton}
//         />
//       </SafeAreaView>
//       <TouchableOpacity style={styles.button} onPress={addNewJournal}>
//         <Text style={styles.buttonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerText: {
//     width: "100%",
//     height: 78,
//     top: 45,
//     fontWeight: 700,
//     fontSize: 30,
//     padding: 20,
//     textAlign: "center",
//   },

//   flat: {
//     justifyContent: "center",
//     paddingTop: 50,
//     paddingBottom: 163,
//   },

//   eachJournal: {
//     padding: 10,
//     borderWidth: 0,
//     flex: 1,
//     height: 60,
//     top: 10,
//     width: 330,
//   },
//   entryScreenContainer: {
//     flex: 1,
//     bottom: -300,
//   },
//   input: {
//     height: 200,
//     borderColor: "gray",
//     borderWidth: 10,
//     marginBottom: 16,
//     padding: 100,
//     alignItems: "flex-end",
//   },
//   button: {
//     width: 70,
//     height: 70,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: "#d16994",
//     position: "absolute",
//     right: 40,
//     top: 610,
//   },

//   buttonText: {
//     bottom: 8,
//     fontSize: 40,
//     fontWeight: 300,
//   },
// });
