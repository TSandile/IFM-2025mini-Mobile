import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useState,
  Alert,
} from "react-native";
import LoginScreen from "./Screens/ProfileScreens/LoginScreen";
import RegisterScreen from "./Screens/ProfileScreens/RegisterScreen";
import RegisterPage from "./Screens/ProfileScreens/RegisterPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderTitle } from "@react-navigation/elements";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const Stack = createNativeStackNavigator();
//const navigation = useNavigation();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  //login login
  const [loggedIn, setLoggedIn] = React.useState(true);

  function notLogged() {
    return (
      <View style={styles.btn_section}>
        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.authBtnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.authBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function logged() {
    return (
      <View style={styles.btn_section}>
        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => {
            showMessage({
              message: "Signed Out Successfully",
              type: "success",
            }),
              setLoggedIn(false);
          }}
        >
          <Text style={styles.authBtnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Home Scree Welcome image */}
      <Image
        source={require("./assets/images (3).jpg")}
        style={styles.welcomeImg}
      />

      {loggedIn ? logged() : notLogged()}

      {/* Button container */}
      {/* <View style={styles.btn_section}>
        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.authBtnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.authBtnText}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#acc1b1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
      options={HomeDrawer}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "" }}
      />

      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// Drawer function
function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: { width: "100%" },

        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#acc1b1",
        drawerPosition: "right",
        headerTitleAlign: "center",

        headerStyle: {
          backgroundColor: "#acc1b1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Mshengu Art Exhibition" }}
      />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeDrawer />
      <FlashMessage position="top" />
      {/* <RootStack /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  authBtn: {
    backgroundColor: "#acc1b1",
    width: 110,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 10,
    margin: 10,
    textDecorationColor: "#ffffffff",
  },

  authBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  welcomeImg: {
    alignContent: "flex-start",
    marginTop: 0,
    width: "100%",
    height: 300,
  },
  btn_section: {
    // backgroundColor: "#444c4e",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-start",
    // marginTop: 50,
    width: "100%",
    height: 400,
    marginBottom: 10,
  },
});
