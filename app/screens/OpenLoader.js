import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function OpenLoader({ navigation }) {
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigation.navigate('Login');
        }, 5000);

        return () => clearTimeout(redirectTimer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={['#ffffff', '#007bff']}
            style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Eyebook</Text>
                <Text style={styles.textfooter}>Made with React Native Expo</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 100,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    textfooter: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 200,
    },
});
