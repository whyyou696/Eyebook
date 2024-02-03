import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GETALLPOST_QUERY } from "./Home";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const CREATEPOST_MUTATION = gql`
    mutation CreatePost($content: String!, $tags: [String], $imgUrl: String) {
      createPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
        _id
        content
        tags
        imgUrl
        authorId
        comments {
          content
          createdAt
          updatedAt
          username
        }
        likes {
          createdAt
          updatedAt
          username
        }
        createdAt
        updatedAt
        result {
          _id
          email
          name
          profileimg
          username
        }
      }
    }
  `;

  const [createPost] = useMutation(CREATEPOST_MUTATION, {
    refetchQueries: [GETALLPOST_QUERY],
    onCompleted: () => navigation.navigate("Home"),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Content"
        onChangeText={(text) => setContent(text)}
        value={content}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags"
        onChangeText={(text) => setTags(text)}
        value={tags}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        onChangeText={(text) => setImgUrl(text)}
        value={imgUrl}
      />
      <TouchableOpacity style={styles.createButton}>
        <Text
          style={styles.buttonText}
          onPress={() => createPost({ variables: { content, tags, imgUrl } })}
        >
          Create Post
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
