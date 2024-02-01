// DetailsPost.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsPost({ route, navigation }) {
  const { username, post, imageUrl } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.post}>{post}</Text>
      </View>
      <TouchableOpacity style={styles.commentButton} onPress={() => navigation.navigate('Comments')}>
        <Ionicons name="chatbubble-outline" size={24} color="gray" />
        <Text style={styles.commentText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  post: {
    fontSize: 14,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  commentText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'gray',
  },
});
