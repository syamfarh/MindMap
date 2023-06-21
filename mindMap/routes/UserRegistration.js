import React, { FC, ReactElement, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput, View, Alert } from "react-native";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-setup";
import { createMoodDatabase } from '../helper';

export default function App({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPass, setconPass] = useState('');

  const handleSignUp = () => {
    if (!validateEmail()) {
      Alert.alert("Please enter a valid email address");
      return;
    } else if (!validatePassword()) {
        Alert.alert("You password must be at least 8 character");
    } else if (conPass !== password) {
        alert("password not the same");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        alert("successful");
        console.log(user.email);
        createMoodDatabase({
          happy: 0,
          sad: 0,
          angry: 0,
          userId: auth.currentUser.uid
      });
      })
      .catch(error => {console.log(error.message); Alert.alert(error.message);})
    }
  }

  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
        console.log("Email is Correct");
        return true;
    }
  }

  validatePassword = () => {
    if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  const pressedLogin = () => {
    navigation.replace("Login");
  }
  
    return (
    <View style={styles.container}>

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
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
    top:-10,
  },

  welcomeText: {
    width: 280,
    height: 78,
    fontWeight: 700,
    fontSize: 30,
  },

  emailInput: {
    width: 331,
    height: 56,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  passwordInput: {
    width: 331,
    height: 56,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  confirmInput: {
    width: 331,
    height: 56,
    borderRadius: 8,
    borderColor: '#1E232C',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderColor: '#E8ECF4',
    padding:20,
  },

  registerButton: {
    width: 331,
    height: 56,
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
    width: 253,
    height: 21,
  },

  loginLink: {
    color: '#35C2C1',
  }

});