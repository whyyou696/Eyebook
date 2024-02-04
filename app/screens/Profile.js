import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = ({ route }) => {
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: user.profileimg }} style={styles.profileImage} />
                <Text style={styles.username}>{user.username}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Profile Information</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{user.email}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Name:</Text>
                    <Text style={styles.infoText}>{user.name}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    infoContainer: {
        alignItems: 'flex-start',
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoText: {
        fontSize: 16,
    },
});

export default Profile;
