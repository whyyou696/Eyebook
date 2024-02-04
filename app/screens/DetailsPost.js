import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { GETALLPOST_QUERY } from "./Home";

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($content: String!, $id: ID!) {
    addComment(content: $content, _id: $id) {
      content
      updatedAt
      createdAt
      username
    }
  }
`;

const ADD_LIKE_MUTATION = gql`
  mutation AddLike($id: ID!) {
    addLike(_id: $id) {
      username
      createdAt
      updatedAt
    }
  }
`;

export default function DetailsPost({ route }) {
  const {
    postId,
    postAuthorUserName,
    postAuthorProfileImg,
    postTags,
    postComments,
    postLikesCount,
    postDate,
    postContent,
    imageUrl,
  } = route.params;

  const [newComment, setNewComment] = useState("");

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    refetchQueries: [{ query: GETALLPOST_QUERY }],
    onCompleted: () => {
      setNewComment("");
    },
  });

  const [addLike] = useMutation(ADD_LIKE_MUTATION, {
    refetchQueries: [{ query: GETALLPOST_QUERY }],
  });

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      addComment({ variables: { content: newComment, id: postId } });
    }
  };

  const handleAddLike = () => {
    addLike({ variables: { id: postId } });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: postAuthorProfileImg }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{postAuthorUserName}</Text>
          </View>
          <Text style={styles.postDate}>{postDate}</Text>
        </View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.post}>{postContent}</Text>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          {postComments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <View style={styles.bubble}>
                <Text style={styles.commentUser}>{comment.username}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            </View>
          ))}
          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.newCommentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
              <FontAwesome name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleAddLike}>
            <FontAwesome name="thumbs-up" size={24} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.likes}>{postLikesCount}</Text>
          <Text style={styles.tags}>#{postTags}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },
  postDate: {
    color: "#888",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  post: {
    fontSize: 16,
  },
  commentsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentItem: {
    marginTop: 10,
  },
  bubble: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: "80%",
  },
  commentUser: {
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  commentText: {
    color: "#fff",
  },
  newCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  newCommentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  likes: {
    fontSize: 16,
    marginLeft: 3,
  },
  tags: {
    color: "gray",
    fontSize: 12,
    fontStyle: "italic",
    marginLeft: 300,
  },
});
