// HomeScreen.js
import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { gql, useQuery } from "@apollo/client";

const GETALLPOST_QUERY = gql`
 query GetAllPost {
  getAllPost {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    authorIdResult {
      _id
      name
      username
      email
      password
      profileimg
    }
  }
}
`;

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GETALLPOST_QUERY);

  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={navigation} />
      <View style={styles.centeredContainer}>
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Ionicons
            name="duplicate-outline"
            size={24}
            color="white"
            style={styles.createPostIcon}
          />
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center" }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            data.getAllPost.map((post) => (
              <Card key={post._id} post={post} navigation={navigation} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
  },
  createPostButton: {
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "100%", // Menjadikan tombol mengisi seluruh lebar layar
  },
  createPostIcon: {
    marginRight: 5,
  },
  createPostButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
