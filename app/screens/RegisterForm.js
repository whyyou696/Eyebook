import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gql, useMutation } from "@apollo/client";

const ADDUSER_MUTATION = gql`
  mutation AddUser($userInput: UserInput) {
    addUser(UserInput: $userInput) {
      _id
      email
      name
      password
      profileimg
      username
    }
  }
`;

export default function RegisterForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileimg, setProfileimg] = useState("");


  const [addUser] = useMutation(ADDUSER_MUTATION, {
    onCompleted: () => {
      navigation.navigate("Login");
    }
  });

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Profile Image</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your http:// image"

            value={profileimg}
            onChangeText={setProfileimg}
          />
        </View>
        <Button title="Register" onPress={() => {
             addUser({
                variables: {
                  userInput: {
                    name,
                    username,
                    email,
                    password,
                    profileimg
                  }
                }
              })
        }}/>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink}>
            Login here
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "80%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc", // Hapus borderColor agar kembali ke warna default
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007bff",
    // Hapus properti color agar kembali ke warna default
  },
  label: {
    marginBottom: 5,
    // Hapus properti color agar kembali ke warna default
  },
  loginText: {
    marginTop: 20,
    color: "black",
  },
  loginLink: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
