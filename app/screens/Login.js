import React from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({ navigation }) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        navigation.navigate("Home");
    };

    const handleRegister = () => {
        navigation.navigate("RegisterForm");
    };

    return (
        <LinearGradient
            colors={['#ffffff', '#ffffff']}
            style={styles.gradient}
        >
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
                <Button
                    title="Login"
                    onPress={handleLogin}
                />
                <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={handleRegister}>Register here</Text></Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '80%',
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
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#007bff', // Tetapkan warna teks ke putih
    },
    label: {
        marginBottom: 5,
        // Hapus properti color agar kembali ke warna default
    },
    registerText: {
        marginTop: 20,
        color: 'black',
    },
    registerLink: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    
});