import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function App() {
    const [entryText, setEntryText] = useState('');
    const [showEntryScreen, setShowEntryScreen] = useState(false);
  
    const handleSaveEntry = () => {
      // Handle saving the journal entry
      console.log('Saving entry:', entryText);
      // Add your logic here to save the journal entry to a database or perform any other actions
      setShowEntryScreen(false); // Close the entry screen after saving
    };
  
    const handleOpenEntryScreen = () => {
      setShowEntryScreen(true); // Open the entry screen
    };
  
    return (
      <View style={styles.container}>
        {showEntryScreen ? (
          <View style={styles.entryScreenContainer}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your journal entry here"
              value={entryText}
              onChangeText={setEntryText}
            />
            <Button title="Save Entry" onPress={handleSaveEntry} />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleOpenEntryScreen}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: 'flex-end',
      //justifyContent: 'center',
      
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
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#246AA9',
        position: 'absolute',
        bottom: 30,
        left: 110,
        right: 0,
    },
    buttonText: {

    },
  });
