import React from 'react';
import { Button, Image, Text, View, StyleSheet, ScrollView } from 'react-native';

export default function DetailsProfile({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/10842782/pexels-photo-10842782.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} // Ganti dengan URL gambar yang sesuai
            style={styles.image}
          />
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View style={styles.followButtonContainer}>
          <Button
            title="Follow"
            onPress={() => {
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
  },
  followButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
});
