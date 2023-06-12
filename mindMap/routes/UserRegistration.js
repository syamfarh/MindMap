import React, { FC, ReactElement, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput, View, Touchable } from "react-native";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-setup";


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

  const pressedLogin = () => {
    navigation.navigate("Login");
  }
  
    return (
    <View>
      
      <Text style={styles.welcomeText}>
        Hello! Register to get started
      </Text>

      <View>
        <TextInput
          style={styles.emailInput}
          placeholder={"Email"}
          autoCapitalize={"none"}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View>
        <TextInput
          style={styles.passwordInput}
          placeholder={"Enter Password"}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View>
        <TextInput
          style={styles.confirmInput}
          placeholder={"Confirm Password"}
          onChangeText={text => setconPass(text)}
          secureTextEntry
        />
      </View>

      <View>
        <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
          <Text style={styles.regText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.loginNow}>Already have an account? 
        <Text style={styles.loginLink}  onPress={pressedLogin}> Login now</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  welcomeText: {
    position: 'absolute',
    width: 280,
    height: 78,
    left: 22,
    top: 125,
    fontWeight: 700,
    fontSize: 30,
  },

  emailInput: {
    position: 'absolute',
    width: 331,
    height: 56,
    left: 22,
    top: 235,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  passwordInput: {
    position: 'absolute',
    width: 331,
    height: 56,
    left: 22,
    top: 303,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  confirmInput: {
    position: 'absolute',
    width: 331,
    height: 56,
    left: 22,
    top: 371,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  registerButton: {
    position: 'absolute',
    width: 331,
    height: 56,
    left: 22,
    top: 439,
    backgroundColor: '#1E232C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
},
  regText: {
    position: 'absolute',
    width: "100%",
    height: 20,
    top: 18,
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    verticalAlign: 'middle',
},

  loginNow: {
    position: 'absolute',
    width: 253,
    height: 21,
    left: 70,
    top: 520
  },

  loginLink: {
    color: '#35C2C1',
  }

});