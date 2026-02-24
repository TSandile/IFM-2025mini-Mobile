import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Hello!</Text>
      <Text style={styles.h3}>Welcome to Mshengu Art Gallery Exhibition</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Surname" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "white", marginRight: 20 }}>
          Already registered? Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.regBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    textAlign: "center",

    backgroundColor: "#acc1b1",
  },
  h1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginLeft: 30,
    marginTop: 100,
  },
  h3: {
    fontSize: 15,
    color: "white",
    marginLeft: 30,
    marginTop: 3,
  },
  input: {
    height: 45,
    width: 340,
    backgroundColor: "white",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginStart: 30,
    marginTop: 30,
    marginBottom: 5,
    borderRadius: 20,
    borderColor: "white",
    borderLeftWidth: 20,
  },
  link: {
    color: "white",
    marginStart: 250,
    marginTop: 10,
  },
  regBtn: {
    backgroundColor: "#969e7f",
    marginTop: 20,
    marginStart: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    width: 120,
    height: 40,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
