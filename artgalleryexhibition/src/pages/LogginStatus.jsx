import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useUser } from "./UserContext";
import { useNavigation } from "@react-navigation/native";

const LogginStatus = ({ navigate }) => {
  const { user, logout } = useUser();
  const navigation = useNavigation();

  return (
    <View>
      {user ? (
        // If looged
        <>
          <View style={styles.authContainer}>
            <Text style={styles.userNameText}>{user.name}</Text>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // if not logged
        <>
          <View style={styles.authContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("login")}
              style={styles.authButton}
            >
              <Text style={styles.authButtonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              style={[styles.authButton, styles.signInButton]}
            >
              <Text style={styles.authButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  galleryHome: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },

  //  Styles
  authHeader: {
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  authContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  authButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  signInButton: {
    backgroundColor: "#000000",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#000000ff",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  heroSection: {
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});
export default LogginStatus;
