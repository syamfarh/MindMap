import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function App() {
    const [text, onChangeText] = React.useState('');
    return (
      <View style = {styles.container2}>
        <Text>Journal Entry</Text>
        <TextInput
            style = {styles.container}
            onChangeText={onChangeText}
            value={text}
            editable
            multiline={true}
            placeholder="Type here"
        />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: { 
        height: 700,
        width: 390,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: "top",
      },
    text: {

    },
    container2: {
        flexDirection: 'column',
        position: "relative",
        top:50,
    }
  });