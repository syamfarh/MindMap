import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    //not completed
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{
          headerShown: false
          }}>

          </Stack.Navigator>
          <View> 
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </NavigationContainer>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: 'flex-end',
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
        right:50,
        top:700
    },
  });
