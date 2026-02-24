import {
  StyleSheet,
  View,
  Text,
  Image,
  Icon,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons
        name="person-outline"
        size={70}
        color={"white"}
        marginTop={100}
        marginLeft={170}
      />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#ffff" }}>Dont have account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#acc1b1",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 30,
    marginTop: 100,
  },
  input: {
    backgroundColor: "#ffffff",
    width: 340,
    height: 45,
    margin: 12,
    marginStart: 30,

    padding: 10,
    borderRadius: 20,
    borderLeftWidth: 20,
    borderColor: "white",
    marginTop: 30,
  },
  logBtn: {
    backgroundColor: "#969e7f",
    marginTop: 20,
    marginLeft: 145,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderBlockColor: "black",
    borderWidth: 1,
    width: 100,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    marginRight: 65,
    alignItems: "flex-end",
  },
  lnkText: {
    color: "white",
  },
});
