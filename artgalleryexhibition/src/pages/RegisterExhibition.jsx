import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useUser } from "./UserContext";

const RegisterExhibition = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params || {}; // Get the exhibition ID passed from the previous screen

  const { user } = useUser();
  const userId = user?.id;
  const userName = user?.name || "";

  //  number of people, initialized to 1
  const [nPeople, SetNPeople] = useState("1");
  const [loading, setLoading] = useState(false);
  const [exhibitionTitle, setExhibitionTitle] = useState("");

  // Fetches exhibition details on component mount
  useEffect(() => {
    if (!id) return;

    const fetchExhibition = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.0.235:2025/api/v1/exhibition/getExhibition/${id}`
        );
        const data = await response.json();

        // Update the form display fields
        setExhibitionTitle(data.title);
      } catch (error) {
        console.error("Error fetching Exhibition: ", error);
        Alert.alert("Error", "Could not load exhibition details.");
      } finally {
        setLoading(false);
      }
    };
    fetchExhibition();
  }, [id]);

  // Handles input change for Number of People
  const handleNumber = (value) => {
    const validatedValue = value.replace(/[^0-9]/g, "");
    SetNPeople(validatedValue);
  };

  const handleSubmit = async () => {
    const peopleCount = parseInt(nPeople, 10);

    // Simple validation
    if (peopleCount <= 0 || isNaN(peopleCount)) {
      Alert.alert(
        "Invalid Input",
        "Number of people must be a positive number."
      );
      return;
    }
    if (!id || !userId) {
      Alert.alert("Error", "Missing exhibition or user information.");
      return;
    }

    setLoading(true);

    const API_REG_URL = `http://192.168.0.235:2025/api/v1/registration/register/${id}/${userId}/${peopleCount}`;

    try {
      const response = await fetch(API_REG_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (response.ok) {
        Alert.alert("Success", "Registered successfully!");
        // Navigate to the home screen
        navigation.navigate("home", { replace: true });
      } else {
        // Attempt to get error details
        const errorText = await response.text();
        console.error("Registration failed:", response.status, errorText);
        Alert.alert(
          "Registration Failed",
          `Error: ${response.status}. Please try again.`
        );
      }
    } catch (error) {
      setLoading(false);
      console.log("error registering: ", error.message);
      Alert.alert("Network Error", "Could not connect to the server.");
    }
  };

  if (loading && !exhibitionTitle) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading details...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formView}>
        <Text style={styles.headerTitle}>Exhibition Registration</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder="Exhibition Title"
          value={exhibitionTitle}
          editable={false}
        />

        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder="User Name"
          value={userName}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Number of People (e.g., 1)"
          keyboardType="numeric"
          onChangeText={handleNumber}
          value={nPeople}
        />

        {/* Confirm Registration Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm Registration</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

//  Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formView: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#666",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#000000ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterExhibition;
