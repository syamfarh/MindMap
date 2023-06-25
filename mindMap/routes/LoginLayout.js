import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-setup";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => {
        console.log(error.message);
        window.alert("Invalid password. Try again");
      });
  };

  const pressedReg = () => {
    navigation.replace("Registration");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back! Glad to see you again!
      </Text>
      <TextInput
        style={styles.emailInput}
        placeholder="Enter your email"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.regNow}>
        Don't have an account?
        <Text style={styles.regLink} onPress={pressedReg}>
          {" "}
          Register Now
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
    top: -10,
  },
  welcomeText: {
    width: 331,
    height: 78,
    fontWeight: 700,
    fontSize: 30,
  },

  emailInput: {
    width: 331,
    height: 56,
    borderRadius: 8,
    borderColor: "#1E232C",
    borderWidth: 1,
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
    padding: 20,
  },

  passwordInput: {
    width: 331,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
    padding: 20,
  },

  loginBtn: {
    width: 331,
    height: 56,
    backgroundColor: "#1E232C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  loginText: {
    width: "100%",
    height: 20,
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    verticalAlign: "middle",
  },

  regNow: {
    width: 253,
    height: 21,
  },

  regLink: {
    color: "#35C2C1",
  },
});
