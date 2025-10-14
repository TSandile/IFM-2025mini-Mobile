import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const API_URL = "http://192.168.0.235:2025/api/v1/exhibition/getAllExhibitions";

//helper function for date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    return dateString;
  }
};

// --- ExhibitionCard Component ---
const ExhibitionCard = ({ exhibition }) => {
  // Construct the full image URL
  const imageUrl = `http://192.168.0.235:2025/image/getImageById/${exhibition.imageData?.id}`;

  // Image source requires a { uri: ... } structure in React Native
  const imageSource = { uri: imageUrl };

  return (
    <Card style={styles.card}>
      {/* Display the Image only if imageData exists */}
      {exhibition.imageData?.name && (
        <Card.Cover source={imageSource} style={styles.cardCover} />
      )}

      <Card.Content style={styles.cardContent}>
        <Title style={styles.title}>{exhibition.title}</Title>

        <Paragraph>
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.value}>{exhibition.status}</Text>
        </Paragraph>

        <Paragraph>
          <Text style={styles.label}>Start Date: </Text>
          <Text style={styles.value}>{formatDate(exhibition.start_date)}</Text>
        </Paragraph>

        <Paragraph>
          <Text style={styles.label}>End Date: </Text>
          <Text style={styles.value}>{formatDate(exhibition.end_date)}</Text>
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

// --- Main ExhibitionList Component ---
const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setExhibitions(data);
      } catch (err) {
        // NOTE: For React Native testing, ensure 'localhost' is replaced with
        // your machine's IP address if testing on a physical device or external emulator.
        setError(err.message);
        setExhibitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // --- Conditional Rendering ---

  if (loading) {
    // ActivityIndicator is the standard loading spinner in RN
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.statusText}>Loading exhibitions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Error fetching data: {error}</Text>
      </View>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.statusText}>No exhibitions found.</Text>
      </View>
    );
  }

  // --- Main List Rendering using FlatList ---
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exhibition Collection</Text>

      {/* FlatList is essential for long, performant lists in RN. 
          It handles rendering only visible items. */}
      <FlatList
        data={exhibitions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExhibitionCard exhibition={item} />}
        // Setting numColumns to 2 simulates the Grid-like layout (xs=12, sm=6)
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// --- StyleSheet for component styling ---
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen space
    backgroundColor: "#f5f5f5",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    // Distributes space evenly when using numColumns={2}
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  card: {
    // Allows two cards per row with some margin
    width: "48%",
    marginHorizontal: "1%",
    elevation: 4, // Android shadow
  },
  cardCover: {
    height: 150,
    resizeMode: "cover",
  },
  cardContent: {
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#666",
  },
});

export default ExhibitionList;
