import {Alert, View, TextInput, Button, StyleSheet, TouchableOpacity, Text, SafeAreaView, Modal, Image} from 'react-native';


export default function App({ navigation }) {
    return (
        <View style={styles.trueView}>
            <Text style={styles.headerText}>How are you feeling today?</Text>
            <View style={styles.emojiView}>
                <TouchableOpacity>
                    <Image source={require('../assets/angry.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/laughing-emoji.png')} style={styles.imageStyle}/>    
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/sad.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
            </View>
        </View>
        
    );
  }


const styles = StyleSheet.create({
    trueView: {
        flex:1,
    },
    headerText: {
        padding:20,
        top:150,
        fontSize:35,
    },
    emojiView: {
        borderRadius: 50,
        top:200,
        padding:30,
        flexDirection:'row',
        gap: 20,
        backgroundColor: "#B4B6B8",

    },

    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
});