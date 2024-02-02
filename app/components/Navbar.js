import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Navbar({ navigation }) {
  return (
    <View style={styles.navigationBar}>
      <Text style={styles.navigationBarTitle}>Eyebook</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetailsProfile')}>
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle-outline" size={24} color="#007bff" style={styles.profileIcon} />
          <Text style={styles.profileText}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navigationBarTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    color: "#007bff",
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  profileIcon: {
    marginRight: 5,
  },
  profileText: {
    fontSize: 16,
    color: "#007bff",
  },
});
