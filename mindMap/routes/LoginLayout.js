//import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, FC, ReactElement, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from '@react-navigation/core';


export default function App({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
  signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => console.log(error.message))
    }
 


  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("JournalEntry")
      }
    })
    return unsubsribe
  }, [])

  return (
    <View style={styles.container}>       
      <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={text => setEmail(text)}
          />
      </View>

      <View style={styles.inputView}>
          <TextInput 
            style={styles.TextInput} 
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: "#fff", 
      alignItems: "center", 
      justifyContent: "center", 
    },
  
    image: {  
      marginBottom: 40,
    },
  
    inputView: { 
      backgroundColor: "#43A0F3",
      borderRadius: 30,
      width: 200,
      height: 45,
      marginBottom: 20,
      alignItems: "stretch",
    },
  
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
  
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
  
    loginBtn: { 
      width: 50, 
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#246AA9", 
    },
  
  });
  