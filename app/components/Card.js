import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Card({ post }) {
  const navigation = useNavigation();

  const handleDetailsPress = () => {
    navigation.navigate("DetailsPost", {
      postId: post._id,
      postAuthorUserName: post.authorIdResult.username,
      postAuthorProfileImg: post.authorIdResult.profileimg,
      postTags: post.tags,
      postAllComments: post.comments.content,
      postCommentsUser: post.comments.username,
      postLikesCount: post.likes.length,
      postDate: post.createdAt,
      postContent: post.content,
      imageUrl: post.imgUrl,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {post.authorIdResult && ( // Pengecekan apakah data penulis tersedia
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: post.authorIdResult.profileimg }}
              style={styles.profileImage}
            />
            <Text style={styles.author}>{post.authorIdResult.username}</Text>
          </View>
        )}
      </View>
      <Image source={{ uri: post.imgUrl }} style={styles.postImage} />
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.tags}># {post.tags}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDetailsPress}>
          <Ionicons name="information-circle-outline" size={24} color="gray" />
          <Text style={styles.buttonText}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
    paddingTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    marginLeft: 3,
  },
  tags: {
    padding: 10,
    color: "gray",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    fontStyle: "italic",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    // Tambahkan padding pada profile image
    padding: 5,
  },
  author: {
    color: "black", // Ubah warna teks agar sesuai dengan background
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    // Tambahkan padding pada username
    paddingLeft: 2,
  },
});
