import { StyleSheet, Text, View } from "react-native";

const RegisterPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Page</Text>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    textAlign: "center",
  },
});
