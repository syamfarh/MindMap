import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Linking,
} from "react-native";

export default function App({ navigation }) {
  const handleLinkPress = () => {
    Linking.openURL(
      "https://www.nus.edu.sg/uhc/resources/articles/details/counselling-psychological-services"
    );
  };

  const handleCallPress = () => {
    const phoneNumber = "6516 7777";
    const formattedPhoneNumber = `tel:${phoneNumber}`;
    Linking.openURL(formattedPhoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>SOS</Text>
      <TouchableOpacity style={styles.button} onPress={handleCallPress}>
        <Text style={styles.links}>Click here for NUS counselling hotline</Text>
        <Text style={styles.subtext}> or call +65 6516 7777</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLinkPress}>
        <Text style={styles.links}>Click here for NUS counselling website</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    // color: "#63C1F5",
  },
  head: {
    fontSize: 70,
    fontWeight: "bold",
  },
  links: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#de2873",
    textDecorationLine: "underline",

    // paddingBottom: 15,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#63C1F5",
    padding: 20,
    // borderBottomWidth: 10,
    // borderBottomColor: "white",
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 5,
    width: "90%",
  },
  headerText: {
    width: "100%",
    height: 78,
    top: 45,
    fontWeight: 700,
    fontSize: 20,
    padding: 20,
    textAlign: "center",
  },
});
