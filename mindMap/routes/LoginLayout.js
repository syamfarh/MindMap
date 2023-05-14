//import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>       
      <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
          />
      </View>

      <View style={styles.inputView}>
          <TextInput 
            style={styles.TextInput} 
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
          />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
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
  