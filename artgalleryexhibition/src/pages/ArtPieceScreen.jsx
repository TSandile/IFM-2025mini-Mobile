import React, { useState, useEffect } from "react";

import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Colors,
} from "react-native-paper";

const API_URL = "http://192.168.0.235:2025/api/v1/artPiece/getAllArtPieces";

const ArtpieceList = () => {
  const [artpieces, setArtpieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ArtpieceCard = ({ piece }) => {
    const imageUrl = `http://192.168.0.235:2025/image/getImageById/${piece.imageData.id}`;

    return (
      <Card style={styles.card}>
        {piece.imageData.name && (
          <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />
        )}

        <Card.Content>
          <Title style={styles.cardTitle}>{piece.title}</Title>
          <Paragraph>Artist: {piece.artist?.name || "Unknown"}</Paragraph>
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
        setError(`Failed to connect or retrieve data. (${err.message})`);
        setArtpieces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtpieces();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          animating={true}
          color="#000000ff"
          // size="large"
        />
        <Text style={{ marginTop: 10 }}>Loading art pieces...</Text>
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

  //  Main List Rendering

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Art Piece Collection</Text>
      <FlatList
        data={artpieces}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ArtpieceCard piece={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 5,
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
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    minWidth: "45%",
  },
  card: {
    elevation: 4,
    height: "100%",
  },
  cardImage: {
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ArtpieceList;
