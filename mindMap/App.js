import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginLayout from './routes/LoginLayout';
import UserRegistration from './routes/UserRegistration';
import JournalEntry from './routes/JournalEntry';

export default function App() {
  return (
    <View style={styles.container}>
      <JournalEntry/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
