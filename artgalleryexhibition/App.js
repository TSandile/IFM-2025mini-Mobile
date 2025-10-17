import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import * as React from "react";
//import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ArtistScreen from "./src/pages/ArtistScreen";
import ArtPieceScreen from "./src/pages/ArtPieceScreen";
import ExhibitionScreen from "./src/pages/ExhibitionScreen";
import HomeScreen from "./src/pages/HomeScreen";
import { UserProvider } from "./src/pages/UserContext";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import RegisterExhibition from "./src/pages/RegisterExhibition";

//b navigators
const stackNavigator = createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// stack navigator for home main page
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "#fff", //text color of header
        headerTitleStyle: { fontWeight: "bold" }, //text style of header
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "  Art Gallery Exhibition", // title of header
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={30}
              color="#fff"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      {/* Authentication pages */}
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />

      {/* Exhibition handle */}
      <Stack.Screen name="Exhibition" component={ExhibitionScreen} />
      <Stack.Screen name="registerE" component={RegisterExhibition} />
      <Stack.Screen name="registerExhibition" component={RegisterExhibition} />
      <Stack.Screen name="Artist" component={ArtistScreen} />
      <Stack.Screen name="ArtPiece" component={ArtPieceScreen} />
    </Stack.Navigator>
  );
}

// drawer navigator for app
function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerActiveTintColor: "black", // coloer if item active
        drawerInactiveTintColor: "#333", //coloer if item inactive
        drawerLabelStyle: { fontSize: 16 }, //text style of item
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          drawerLabel: "Home",
          headerShown: false, // hide the header for drawer navigator
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Exhibitions"
        component={ExhibitionScreen}
        options={{
          drawerLabel: "Exhibitions",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Artists"
        component={ArtistScreen}
        options={{
          drawerLabel: "Featured Artists",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Art Pieces"
        component={ArtPieceScreen}
        options={{
          drawerLabel: "Art Pieces",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="image-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screens: { flex: 1, alignItems: "center", justifyContent: "center" },
});
