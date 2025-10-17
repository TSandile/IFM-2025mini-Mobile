import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";

// Api end pint definition
const API_URL = "http://192.168.0.235:2025/api/v1/artists/getAllArtists";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 30) / 2;

const ArtistCard = ({ artist }) => {
  const imageUrl = `http://192.168.0.235:2025/image/getImageById/${artist.imageData?.id}`;

  return (
    <View style={styles.card}>
      {artist.imageData?.name && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          accessibilityLabel={artist.name}
          resizeMode="cover"
        />
      )}

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          Artist: {artist.name}
        </Text>
      </View>
    </View>
  );
};

//  Main Artist List Component
const AllArtist = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtists(data);
        setError(null);
      } catch (err) {
        Alert.alert("Error", `Failed to fetch artists: ${err.message}`);
        setError(err.message);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000000ff" />
        <Text style={{ marginTop: 10 }}>Loading artists...</Text>
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

  if (artists.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>No artists found.</Text>
      </View>
    );
  }

  // Main List Rendering (Using FlatList for Grid/Scrolling)

  return (
    <View style={styles.mainContainer}>
      {/* h1 replaced with Text */}
      <Text style={styles.headerTitle}>Artists Featured</Text>

      {/* Grid replaced with FlatList with numColumns={2} */}
      <FlatList
        data={artists}
        renderItem={({ item }) => <ArtistCard artist={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row} // For spacing between columns
        contentContainerStyle={styles.listContent}
        initialNumToRender={8}
      />
    </View>
  );
};

//  Styling
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
    minHeight: 50,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default AllArtist;
