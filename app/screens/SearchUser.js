import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import UserCard from "../components/UserCard";
import Icon from "react-native-vector-icons/Ionicons";

const GET_USERS = gql`
query GetAllUser {
  getAllUser {
    _id
    name
    username
    email
    password
    profileimg
  }
}
`;

const SEARCH_USERS = gql`
  query SearchUser($searchQuery: String!) {
    searchUser(searchQuery: $searchQuery) {
      email
      name
      password
      username
      profileimg
    }
  }
`;

export default function SearchUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, data } = useQuery(searchQuery ? SEARCH_USERS : GET_USERS, {
    variables: { searchQuery },
  });

  const users = data ? (searchQuery ? data.searchUser : data.getAllUser) : [];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Icon
            name="backspace-outline"
            size={24}
            color="#333"
            style={styles.deleteicons}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserCard key={item._id} user={item} />} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  deleteicons: {
    marginLeft: 8,
  },
});
