import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const FOLLOW_MUTATION = gql`
  mutation Follow($userId: ID) {
    follow(userId: $userId) {
      _id
      createdAt
      followerId
      followingId
      updatedAt
    }
  }
`;

const UNFOLLOW_MUTATION = gql`
  mutation Unfollow($userId: ID) {
    unfollow(userId: $userId) {
      message
    }
  }
`;

const UserCard = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followUser] = useMutation(FOLLOW_MUTATION);
    const [unfollowUser] = useMutation(UNFOLLOW_MUTATION);
    const navigation = useNavigation();

    const handleFollowPress = async () => {
        try {
            if (isFollowing) {
                await unfollowUser({ variables: { userId: user._id } });
            } else {
                await followUser({ variables: { userId: user._id } });
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
    };

    const handleUserPress = () => {
        navigation.navigate('Profile', { user });
    };

    return (
        <TouchableOpacity onPress={handleUserPress} style={styles.cardContainer}>
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: user.profileimg }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.followButton, { backgroundColor: isFollowing ? '#FF6347' : '#1E90FF' }]}
                onPress={handleFollowPress}
            >
                <Text style={styles.followButtonText}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        elevation: 2,
        marginBottom: 16,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    userInfo: {},
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        color: '#666',
    },
    followButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        backgroundColor: '#1E90FF',
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default UserCard;
