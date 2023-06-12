import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { onSnapshot } from 'firebase/firestore';
import { getDiariesQueue } from '../helper';

export default function App({ navigation }) {
  const [journals, setjournals] = useState([]); 
  
  const addNewJournal= () => {
    navigation.getParent().navigate("Journal");
    //setjournals([...journals,1]);
  }

  const renderButton = (q) => {
    return(
      <View style={styles.container}>
        <Entypo name="book" size={15}></Entypo>
        <TouchableOpacity>
          <Text style={styles.eachJournal}> {q.item.name} </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={15}></Entypo>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    let q = getDiariesQueue();
    const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				if (querySnapshot.empty) {
					setjournals([]);  
				} else {
					const newdiaries = [];
					querySnapshot.docs.forEach((doc) => {
						newdiaries.push({ ...doc.data()});
						});
						setjournals(newdiaries);
					}
				},
			(err) => {
				console.log(err);
			}
		);
		return () => {
			unsubscribe();
		};
  },[])

    return (
          <View >
            <SafeAreaView style={styles.flat}>
              <FlatList 
                data={journals}
                keyExtractor={(item) => item.index}
                renderItem={renderButton}
              />
            </SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={addNewJournal}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
    );
  };

const styles = StyleSheet.create({

    container: {
      flexDirection: "row",
      alignItems: 'center',
      flex:1,
    },

    flat: {
      justifyContent: 'center',
      padding: 20,
      marginTop:80,
    },

    eachJournal: {
      padding:10,
      borderWidth: 0,
      flex:1,
      height:60,
      top: 10,
      width:330,
    },
    entryScreenContainer: {
      flex: 1,
      bottom: -300,
    },
    input: {
      height: 200,
      borderColor: 'gray',
      borderWidth: 10,
      marginBottom: 16,
      padding: 100,
      alignItems: 'flex-end',
    },
    button: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#246AA9',
        position: 'absolute',
        right:50,
        top:700
    },

    buttonText: {
      bottom:3,
      fontSize:40,
      fontWeight:300,
    }
  });
