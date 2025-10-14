import React, { useState, useEffect } from "react";
// Import core React Native components
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
// Import components from React Native Paper (a good Material Design library for RN)
// You would need to install this package: npm install react-native-paper
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Colors,
} from "react-native-paper";

// Define the API endpoint URL (note: 'localhost' usually needs to be your machine's IP address
// or '10.0.2.2' for Android emulator or '10.0.3.2' for Genymotion/older Android)
// For simplicity here, we keep it as is, but be aware of this common RN issue.
const API_URL = "http://192.168.0.235:2025/api/v1/artPiece/getAllArtPieces";

const ArtpieceList = () => {
  const [artpieces, setArtpieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ArtpieceCard is now a separate component using React Native Paper's Card
  const ArtpieceCard = ({ piece }) => {
    // Construct the image URL. React Native Image component expects a source object.
    const imageUrl = `http://192.168.0.235:2025/image/getImageById/${piece.imageData.id}`;

    return (
      <Card style={styles.card}>
        {/* Display the Image using Card.Cover (equivalent to CardMedia) */}
        {/* React Native Image requires dimensions (width/height) or flex to display */}
        {piece.imageData.name && (
          <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />
        )}

        <Card.Content>
          {/* Title is used for prominent text, Paragraph for body text */}
          <Title style={styles.cardTitle}>{piece.title}</Title>
          <Paragraph>Artist: {piece.artist?.name || "Unknown"}</Paragraph>
          {/* Added optional chaining `?.` for safety */}
        </Card.Content>
      </Card>
    );
  };

  useEffect(() => {
    const fetchArtpieces = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtpieces(data);
        setError(null);
      } catch (err) {
        // Use a more generic error message for the user
        setError(`Failed to connect or retrieve data. (${err.message})`);
        setArtpieces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtpieces();
  }, []);

  // --- Conditional Rendering ---

  if (loading) {
    // ActivityIndicator is the standard RN loading spinner
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          animating={true}
          color="#2196F3, 2196F3"
          size="large"
        />
        <Text style={styles.loadingText}>Loading art pieces...</Text>
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

  if (artpieces.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>No art pieces found.</Text>
      </View>
    );
  }

  // --- Main List Rendering ---

  // FlatList is the standard way to render scrollable lists efficiently in React Native
  // It replaces the Grid and map combination.
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Art Piece Collection</Text>
      <FlatList
        data={artpieces}
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
        numColumns={2} // Simulates the Grid layout with 2 columns (adjust as needed)
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ArtpieceCard piece={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Stylesheet is used for defining styles in React Native
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the whole screen
    padding: 10,
    backgroundColor: "#f5f5f5", // Light background
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  listContent: {
    // Optional styling for the content inside the list
    paddingBottom: 20,
  },
  gridItem: {
    // Distribute items evenly in 2 columns
    flex: 1,
    margin: 5,
    minWidth: "45%", // Ensure spacing works
  },
  card: {
    elevation: 4, // Adds shadow effect
    height: "100%", // Ensures all cards in a row have the same height
  },
  cardImage: {
    height: 150, // Fixed height for the image
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ArtpieceList;
