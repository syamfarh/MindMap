import { Image, View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function App({ navigation }) {
    const pressedLog = () => {
        navigation.navigate("Login");
      }

      const pressedReg = () => {
        navigation.navigate("Registration");
      }
    return (
        <View style = {styles.viewStyle}>
            <View style={styles.picComponent}>
                <Image source={require('../assets/adaptive-icon.png')} style={styles.imageStyle} />
                <Text style={styles.picText}>
                    MindMap
                </Text>
            </View>
            <TouchableOpacity style={styles.login} onPress={pressedLog}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.register} onPress={pressedReg}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 58,
        width: 58,
    },

    picComponent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 99,
        width: 141,
        top: 490,
        borderColor: '#1E232C',
        borderWidth: 0,
    },

    picText: {
        textAlignVertical: 'top',
        fontSize: 20,
    },

    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    login: {
        backgroundColor: '#1E232C',
        justifyContent: 'center',
        alignItems: 'center',
        width: 331,
        height: 56,
        top: 510,
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

    register: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 331,
        height: 56,
        top: 520,
        borderRadius: 8,
        borderColor: '#1E232C',
    },

    registerText: {
        position: 'absolute',
        width: "100%",
        height: 20,
        top: 18,
        color: '#1E232C',
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle',
    },


  });
