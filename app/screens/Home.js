import React from "react";
import { View, ScrollView } from "react-native";
import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
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
      imageUrl:
        "https://www.musicweek.com/cimages/6075c77e29017eaa2aadd43e7690fd98.jpg",
    },
    {
      id: 3,
      username: "Jane Smith",
      post: "The Armed All Futures New Workout Plan",
      imageUrl:
        "https://static.stereogum.com/uploads/2021/04/ARMED_ALL_FUTURES-3283_p-1617853020-scaled.jpg",
    },
    // Add more data objects as needed
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {data.map((item) => (
          <Card
            key={item.id}
            username={item.username}
            post={item.post}
            imageUrl={item.imageUrl}
            onPress={() => navigation.navigate("Details")}
          />
        ))}
      </View>
    </ScrollView>
  );
}
