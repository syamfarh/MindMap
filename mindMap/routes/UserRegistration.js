//import React, { FC, ReactElement, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput, View, Touchable } from "react-native";

export default function App() {
  return (
    <View>
      
      <Text >Create Account</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Your Username"}
          autoCapitalize={"none"}
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Your Email Address"}
          autoCapitalize={"none"}
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Phone Number"}
          autoCapitalize={"none"}
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Enter Password"}
          secureTextEntry
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Confirm Password"}
          secureTextEntry
        />
      </View>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#246AA9",
    padding: 10,
    width: "70%",
    borderRadius: 5,
    alignItems: "center"
},

});