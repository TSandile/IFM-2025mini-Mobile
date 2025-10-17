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

const Register = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { ...formData, type: "" };

      const response = await fetch(
        "http://192.168.0.235:2025/api/v1/user/register",
        {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Handle success
        const data = await response.text();
        console.log("added new user:", data);
        Alert.alert("Success", "User registered successfully! Please sign in.");

        // Navigate to the Login screen
        navigation.navigate("login");
      } else {
        // Handle API errors (e.g., user already exists, bad data)
        const errorText = await response.text();
        console.error("Error adding user:", errorText);
        Alert.alert(
          "Registration Failed",
          `Error: ${response.status}. Please check your details and try again.`
        );
      }
    } catch (error) {
      console.error("error adding user", error.message);
      Alert.alert(
        "Network Error",
        "Could not connect to the server. Check your network or server status."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="words"
        onChangeText={(text) => handleInputChange("name", text)}
        value={formData.name}
      />

      <TextInput
        style={styles.input}
        placeholder="Surname"
        autoCapitalize="words"
        onChangeText={(text) => handleInputChange("surname", text)}
        value={formData.surname}
      />

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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.loginLink}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styling
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
  loginLink: {
    color: "#2196F3",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Register;
