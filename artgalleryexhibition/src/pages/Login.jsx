import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "./UserContext";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useUser();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("form data submitted:", formData);

    try {
      const response = await fetch(
        "http://192.168.0.235:2025/api/v1/user/login",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data != null) {
          loginUser(data);
          setUser(data);

          navigation.navigate("Home");
        } else {
          Alert.alert("Login Failed", "The server returned empty data.");
        }
      } else {
        const errorText = await response.text();
        console.error("Login failed with status:", response.status, errorText);
        Alert.alert(
          "Login Failed",
          "Please check your credentials or try again."
        );
      }
    } catch (error) {
      console.error("Error signing in user", error);
      Alert.alert(
        "Error",
        "Could not connect to the server. Check your network or server status."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange("email", text)}
        value={formData.email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => handleInputChange("password", text)}
        value={formData.password}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("register")}>
        <Text style={styles.registerLink}>
          Don't have an account yet? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// React Native Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#000000ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    color: "#1144a3ff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Login;
