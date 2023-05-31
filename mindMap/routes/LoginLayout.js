import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, FC, ReactElement, useState } from "react";
import { auth } from "../firebase";

export default function App({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
  signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => {
        console.log(error.message);
        window.alert("Invalid password. Try again");})
    }
 
  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Journal'}],
        });
      }
    })
    return unsubsribe
  }, [])

  const pressedReg = () => {
    navigation.navigate("Registration");
  }

  return (
    <View > 
      <Text style={styles.welcomeText}>
        Welcome back! Glad to see you again!
      </Text>
      <TextInput
        style={styles.emailInput}
        placeholder="Enter your email"
        placeholderTextColor="#003f5c"
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
            style={styles.passwordInput} 
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
      
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.regNow}>Don't have an account? 
        <Text style={styles.regLink}  onPress={pressedReg}> Register Now</Text>
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
      top: 306,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: '#F7F8F9',
      borderColor: '#E8ECF4',
      padding:20,
    },

    loginBtn: { 
      position: 'absolute',
      width: 331,
      height: 56,
      left: 22,
      top: 424,
      backgroundColor: '#1E232C',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },

    loginText: {
      position: 'absolute',
      width: "100%",
      height: 20,
      top: 18,
      color: '#FFFFFF',
      fontSize: 15,
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    regNow: {
      position: 'absolute',
      width: 253,
      height: 21,
      left: 70,
      top: 520
    },
  
    regLink: {
      color: '#35C2C1',
    }
  
  });
  