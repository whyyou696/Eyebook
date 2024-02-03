import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
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
      <FontAwesome name="sign-out" size={24} color="#007bff" />
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#007bff",
    marginLeft: 5,
  },
});
