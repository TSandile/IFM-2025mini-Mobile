import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useUser } from "./UserContext";
import { useNavigation } from "@react-navigation/native";

// Api end point
const API_URL = "http://192.168.0.235:2025/api/v1/exhibition/getAllExhibitions";

// Calculate card width for a 2-column grid with padding
const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 30) / 2;

const Logged = ({ exhibition, handleSubmit }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => handleSubmit(exhibition.id)}
        // navigation.navigate("registerExhibition", { id: exhibition.id })

        // onPress={() => handleSubmit(exhibition.id)}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

//  Exhibition Card Component
const ExhibitionCard = ({ exhibition, user, handleSubmit }) => {
  const imageUrl = `http://192.168.0.235:2025/image/getImageById/${exhibition.imageData?.id}`;

  return (
    <View style={styles.card}>
      {exhibition.imageData?.name && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          accessibilityLabel={exhibition.title}
          resizeMode="cover"
        />
      )}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {exhibition.title}
        </Text>
        <Text style={styles.cardDetail}>Status: {exhibition.status}</Text>
        <Text style={styles.cardDetail}>
          Start Date: {exhibition.start_date}
        </Text>
        <Text style={styles.cardDetail}>End Date: {exhibition.end_date}</Text>

        {user != null && user.type === "" && (
          <Logged exhibition={exhibition} handleSubmit={handleSubmit} />
        )}
      </View>
    </View>
  );
};

//  Main Exhibition List Component
const ExhibitionList = () => {
  const navigation = useNavigation();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Using user context

  const handleSubmit = (id) => {
    // Navigate to the screen                                         -- giving error
    navigation.navigate("registerE", { id: id });
  };

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Exhibitions fetched successfully.");
        setExhibitions(data);
        setError(null);
      } catch (err) {
        Alert.alert("Error", `Failed to fetch exhibitions: ${err.message}`);
        setError(err.message);
        setExhibitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  //  Conditional Rendering

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading exhibitions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error fetching data: {error}</Text>
      </View>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>No exhibitions found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerTitle}>Exhibition Collection</Text>

      <FlatList
        data={exhibitions}
        renderItem={({ item }) => (
          <ExhibitionCard
            exhibition={item}
            user={user}
            handleSubmit={handleSubmit}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        initialNumToRender={8}
      />
    </View>
  );
};

//  React Native Styling
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
  },

  row: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 5,
  },

  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    overflow: "hidden",
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
    minHeight: 120,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardDetail: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 2,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ExhibitionList;
