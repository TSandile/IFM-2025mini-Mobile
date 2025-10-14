import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking, // Used for opening links/phone numbers
} from "react-native";

// --- Data (Unchanged) ---
const featuredArtworks = [
  {
    id: 101,
    title: "Abstract Harmony",
    artist: "Anya Zola",
    image: "https://via.placeholder.com/150/FF5733/FFFFFF?Text=Abstract", // Placeholder URL
  },
  {
    id: 102,
    title: "Coastal Serenity",
    artist: "Ben Carter",
    image: "https://via.placeholder.com/150/33FF57/FFFFFF?Text=Coastal", // Placeholder URL
  },
  {
    id: 103,
    title: "The Urban Pulse",
    artist: "Chloe Davis",
    image: "https://via.placeholder.com/150/3357FF/FFFFFF?Text=Urban", // Placeholder URL
  },
];

const galleryInfo = {
  address: "123 Museum Way, Art City, 54321",
  hours: "Mon-Sat: 10:00 AM - 6:00 PM",
  phone: "(555) 123-4567",
};

// --- Component for a Featured Card (React Native) ---
const FeaturedCard = ({ artwork }) => (
  <View style={styles.featuredCard}>
    {/* Replace with actual Image source later */}
    <Image
      source={{ uri: artwork.image }}
      style={styles.cardImage}
      accessibilityLabel={`Image of ${artwork.title}`}
    />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{artwork.title}</Text>
      <Text style={styles.cardArtist}>by **{artwork.artist}**</Text>
      <TouchableOpacity
        style={styles.viewDetailsBtn}
        onPress={() => console.log(`Viewing details for ${artwork.title}`)}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// --- Home Component (React Native) ---
const Home = () => {
  // Helper to handle link/navigation actions (can be replaced with React Navigation)
  const handleLinkPress = (type, value) => {
    if (type === "phone") {
      Linking.openURL(`tel:${value.replace(/\s|-|\(|\)/g, "")}`);
    } else if (type === "url") {
      // In a real app, this would use a navigation library to go to a new screen (e.g., /about)
      console.log(`Navigating to ${value}`);
    }
  };

  return (
    // Use ScrollView to make the content scrollable
    <ScrollView style={styles.galleryHome}>
      {/* 1. Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Welcome to The Renaissance Canvas Gallery
        </Text>
        <Text style={styles.heroSubtitle}>
          Where history meets contemporary art. Explore our curated collections.
        </Text>
        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => console.log("Start Exploration pressed")}
        >
          <Text style={styles.exploreBtnText}>Start Your Exploration</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      {/* 2. Featured Artworks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          ✨ Featured Artworks of the Month
        </Text>
        <View style={styles.featuredList}>
          {featuredArtworks.map((artwork) => (
            <FeaturedCard key={artwork.id} artwork={artwork} />
          ))}
        </View>
      </View>

      <View style={styles.separator} />

      {/* 3. About & Info Section */}
      <View style={[styles.section, styles.infoSection]}>
        <View style={styles.aboutUs}>
          <Text style={styles.subsectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            We are dedicated to fostering a love for the arts by showcasing
            diverse talents from around the globe. Join us in celebrating
            creativity and culture.
          </Text>
          <TouchableOpacity onPress={() => handleLinkPress("url", "/about")}>
            <Text style={styles.moreLink}>Read More About Us &rarr;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.visitInfo}>
          <Text style={styles.subsectionTitle}>Plan Your Visit</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>📍 Address:</Text>{" "}
            {galleryInfo.address}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>⏰ Hours:</Text> {galleryInfo.hours}
          </Text>
          <TouchableOpacity
            onPress={() => handleLinkPress("phone", galleryInfo.phone)}
          >
            <Text style={styles.contactText}>
              <Text style={styles.boldText}>📞 Contact:</Text>{" "}
              {galleryInfo.phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Footer Placeholder */}
      <View style={styles.homeFooter}>
        <Text style={styles.footerText}>
          © 2025 The Renaissance Canvas Gallery. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

// --- Stylesheet for React Native ---
const styles = StyleSheet.create({
  // General Styles
  galleryHome: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "700",
  },

  // 1. Hero Section
  heroSection: {
    padding: 30,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: "#A0522D", // Sienna color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  exploreBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // 2. Featured Artworks Section
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  featuredList: {
    // Flex direction column for default React Native layout
    // Use flexWrap: 'wrap' and adjust width for side-by-side cards on wider screens
  },
  featuredCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: "100%",
    height: 200, // Fixed height for image placeholder
    backgroundColor: "#eee",
  },
  cardInfo: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardArtist: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  viewDetailsBtn: {
    backgroundColor: "#6A5ACD", // Slate Blue
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
    alignSelf: "flex-start", // Only take up necessary width
  },
  viewDetailsText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  // 3. About & Info Section
  infoSection: {
    flexDirection: "column", // Stack about and visit info vertically on mobile
  },
  aboutUs: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  moreLink: {
    color: "#A0522D",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  visitInfo: {
    // Styles for the visit section
  },
  contactText: {
    fontSize: 16,
    color: "#007AFF", // Blue for clickable text (phone number)
    marginBottom: 10,
  },

  // 4. Footer Placeholder
  homeFooter: {
    backgroundColor: "#333",
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Home;
