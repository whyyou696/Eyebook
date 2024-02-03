import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <View style={styles.navigationBar}>
      <Text style={styles.navigationBarTitle}>Eyebook</Text>
      <View style={styles.buttonContainer}>
        <LogoutButton/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navigationBarTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
