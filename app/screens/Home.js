import React, { useState } from "react";
import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {
      id: 1,
      username: "John Doe",
      post: "When Forever Comes Crashing: A Full History of Converge",
      imageUrl: "https://exclaim.ca/images/Converge_-_David_Robinson.jpg",
    },
    {
      id: 2,
      username: "Jane Smith",
      post: "Idles Joe Talbot on the perils of the music industry",
      imageUrl: "https://www.musicweek.com/cimages/6075c77e29017eaa2aadd43e7690fd98.jpg",
    },
    {
      id: 3,
      username: "Jane Smith",
      post: "The Armed All Futures New Workout Plan",
      imageUrl: "https://static.stereogum.com/uploads/2021/04/ARMED_ALL_FUTURES-3283_p-1617853020-scaled.jpg",
    },
    // Add more data objects as needed
  ];

  const filteredData = data.filter(item => {
    return item.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.post.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {filteredData.map((item) => (
            <Card
              key={item.id}
              username={item.username}
              post={item.post}
              imageUrl={item.imageUrl}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#007bff",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
});
