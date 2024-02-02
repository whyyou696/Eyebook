import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleCreatePost = () => {
    // Kirim data post ke backend atau lakukan tindakan lainnya
    console.log("Content:", content);
    console.log("Tags:", tags);
    console.log("Image URL:", imgUrl);
  };

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
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
        <Text style={styles.buttonText}>Create Post</Text>
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
