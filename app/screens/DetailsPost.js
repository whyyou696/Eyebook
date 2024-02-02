import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsPost({ route }) {
  const { 
    postAuthorUserName,
    postAuthorProfileImg,
    postTags,
    postComments,
    postCommentsUser,
    postLikesCount,
    postDate,
    postContent,
    imageUrl 
  } = route.params;

  console.log(route.params)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.authorContainer}>
            <Image source={{ uri: postAuthorProfileImg }} style={styles.profileImage} />
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
          {/* Tampilkan komentar secara statis */}
          <View style={styles.commentItem}>
            <View style={styles.bubble}>
              <Text style={styles.commentText}>{postComments && postComments[0]}</Text>
            </View>
            <Text style={styles.commentUser}>{postCommentsUser && postCommentsUser[0]}</Text>
          </View>
          <View style={styles.commentItem}>
            <View style={styles.bubble}>
              <Text style={styles.commentText}>{postComments && postComments[1]}</Text>
            </View>
            <Text style={styles.commentUser}>{postCommentsUser && postCommentsUser[1]}</Text>
          </View>
          {/* Tambahkan lebih banyak blok komentar sesuai kebutuhan */}
        </View>
        <View style={styles.footer}>
          <Text style={styles.likes}>Likes: {postLikesCount}</Text>
          <Text style={styles.tags}>Tags: #{postTags}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#888',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
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
    borderTopColor: '#ddd',
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  commentText: {
    color: '#fff',
  },
  commentUser: {
    marginLeft: 10,
    color: '#888',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  likes: {
    fontSize: 16,
  },
  tags: {
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
