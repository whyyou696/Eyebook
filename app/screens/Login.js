import React, { useContext, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const LOGIN_MUTATION = gql`
  mutation Mutation($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    access_token
  }
}
`;
export default function Login({ navigation }) {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
    //    console.log(data, "<<< data");
       SecureStore.setItemAsync("access_token", data.login.access_token);
      authContext.setIsSignedIn(true);
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: Login</Text>;

//   console.log(loading, error, data);
// console.log(username, password ,"<<< username password"); 
  const handleRegister = () => {
    navigation.navigate("RegisterForm");
  };

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
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
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              login({
                variables: {
                  username,
                  password
                },
              });
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        {/* <Button
                    title="Login"
                    onPress={handleLogin}
                /> */}
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink} onPress={handleRegister}>
            Register here
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

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
    borderColor: "#ccc", // Hapus borderColor untuk kembali ke warna default
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007bff", // Tetapkan warna teks ke putih
  },
  label: {
    marginBottom: 5,
    // Hapus properti color agar kembali ke warna default
  },
  registerText: {
    marginTop: 20,
    color: "black",
  },
  registerLink: {
    color: "#007bff",
    textDecorationLine: "underline",
  },

  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "#fff",
  },
});
