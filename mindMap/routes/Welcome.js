import { Image, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';

export default function App({ navigation }) {
    const pressedLog = () => {
        navigation.navigate("Login");
      }

      const pressedReg = () => {
        navigation.navigate("Registration");
      }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/skyblue.jpg')} style={styles.background} >
                <View style={styles.picComponent}>
                    <Image source={require('../assets/moonchild.jpg')} style={styles.imageStyle} />
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
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    background: {
        width:'100%',
        height:'100%',
        opacity:0.9,
    },
    imageStyle: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },

    picComponent: {
        alignItems: 'center',
        justifyContent: 'center',
        left:100,
        height: 100,
        width: 200,
        top: 300,
        borderColor: '#1E232C',
        borderWidth: 0,
    },

    picText: {
        textAlignVertical: 'top',
        fontSize: 40,
        fontWeight: "bold",
    },

    login: {
        backgroundColor: '#1E232C',
        width: 331,
        height: 56,
        top: 510,
        left:37,
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
        width: 331,
        height: 56,
        top: 520,
        borderRadius: 8,
        left:37,
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
