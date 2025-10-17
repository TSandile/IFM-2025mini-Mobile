import { useNavigation } from "@react-navigation/native";
import React from "react";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import LogginStatus from "./LogginStatus";
const theQueenImage = require("../images/images (15).jpg");
const waveImage = require("../images/images (1).jpg");
const skyImage = require("../images/download (3).jpg");

const featuredArtworks = [
  {
    id: 101,
    title: "The Wave",
    artist: "Bongani M",
    image: waveImage,
  },
  {
    id: 102,
    title: "The Queen",
    artist: "Jay Something",
    image: theQueenImage,
  },
  {
    id: 103,
    title: "The Sky",
    artist: "Jay Something",
    image: skyImage,
  },
];

// --- Component for a Featured Card (React Native) ---
const FeaturedCard = ({ artwork }) => (
  <View style={styles.featuredCard}>
    <Image
      source={artwork.image}
      style={styles.cardImage}
      accessibilityLabel={artwork.title}
    />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{artwork.title}</Text>
      <Text style={styles.cardArtist}>by **{artwork.artist}**</Text>
    </View>
  </View>
);

//  Home Component
const Home = () => {
  const navigation = useNavigation();

  const handleExplore = () => {
    navigation.navigate("ArtPiece");
  };

  return (
    <ScrollView style={styles.galleryHome}>
      <View style={styles.authHeader}>
        <LogginStatus navigation={navigation} />
      </View>
      <View style={styles.separator} />

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Welcome To The Joburg Art Gallery Exhibition
        </Text>

        <Text style={styles.subtitle}>
          Where talent meets the right candidates. Explore the art collections.
        </Text>

        <TouchableOpacity onPress={handleExplore} style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>Start Your Exploration</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Featured Art Pieces</Text>
        <View style={styles.featuredList}>
          {featuredArtworks.map((artwork) => (
            <FeaturedCard key={artwork.id} artwork={artwork} />
          ))}
        </View>
      </View>

      <View style={styles.separator} />
    </ScrollView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  galleryHome: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  authHeader: {
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },

  heroSection: {
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  exploreBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  featuredSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  featuredList: {
    // Use flexWrap for a grid
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // Spacing between cards
  },

  // Featured Card
  featuredCard: {
    width: "45%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardInfo: {
    padding: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  cardArtist: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});

export default Home;
