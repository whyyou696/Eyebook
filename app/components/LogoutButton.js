import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function LogoutButton() {
  const authContext = useContext(AuthContext);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={async () => {
          await SecureStore.deleteItemAsync("access_token");
          authContext.setIsSignedIn(false);
      }}
    >
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    padding: 8,
    backgroundColor: "#007bff",
    borderRadius: 10,

  },
});
