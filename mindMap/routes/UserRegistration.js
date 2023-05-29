import React, { FC, ReactElement, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput, View, Touchable } from "react-native";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export default function App({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPass, setconPass] = useState('');

  const handleSignUp = () => {
    if (conPass !== password) {
        alert("password not the same");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        alert("successful");
        console.log(user.email);
      })
      .catch(error => console.log(error.message))
    }
  }

  
    return (
    <View>
      
      <Text style={styles.top}>Create Account</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Your Email Address"}
          autoCapitalize={"none"}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Enter Password"}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Confirm Password"}
          onChangeText={text => setconPass(text)}
          secureTextEntry
        />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text> Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  top: {
    marginTop:200,
  },

  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#246AA9",
    padding: 10,
    width: 100,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,

},

});