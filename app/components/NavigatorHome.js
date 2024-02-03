import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NavigatorHome({ navigation }) {
  const navigateToDetailProfile = () => {
    navigation.navigate("DetailsProfile");
  };

  const navigateToCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { marginRight: 10 }]}
        onPress={navigateToDetailProfile}
      >
        <Ionicons name="person-outline" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Detail Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={navigateToCreatePost}
      >
        <Ionicons name="add-circle-outline" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
