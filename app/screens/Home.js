import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
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
