import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Card({ post }) {
  const navigation = useNavigation();

  const handleDetailsPress = () => {
    navigation.navigate("DetailsPost", {
      postId: post._id,
      postAuthorUserName: post.authorIdResult.username,
      postAuthorProfileImg: post.authorIdResult.profileimg,
      postTags: post.tags,
      postComments: post.comments,
      postLikesCount: post.likes.length,
      postDate: post.createdAt,
      postContent: post.content,
      imageUrl: post.imgUrl,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {post.authorIdResult && (
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
        <Text style={[styles.infoText]}>
          <FontAwesome name="thumbs-up" size={30} color="#007bff" />{" "}
          {post.likes.length} Likes
        </Text>
        <Text style={[styles.infoText]}>
          <FontAwesome
            name="comments"
            size={30}
            color="#007bff"
          />{" "}
          {post.comments.length} Comments
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleDetailsPress}>
          <FontAwesome name="file" size={20} color="#007bff" />
          <Text style={styles.infoText}>See Details</Text>
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
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 10,
    paddingTop: 10,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",

  },
  infoText: {
    color: "gray",
    fontSize: 13,
    marginLeft: 5,
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
    padding: 5,
  },
  author: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingLeft: 2,
  },
});
