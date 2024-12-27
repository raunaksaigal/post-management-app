import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { hp, wp } from '../../helpers/common';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';
import users from "../../components/users.json";
import data from "../../components/data.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null); // State to store user data
    const [postsData, setPostsData] = useState([]); // State to store posts data
    const [loading, setLoading] = useState(false); // Loading state for API request

    const fetchUserData = async () => {
        try {
            // Replace with your actual API endpoint
            // const response = await fetch('https://your-api-endpoint.com/api/user');
            // const data = await response.json();
            setUser(users.users[0]); // Set user data from API response
        } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Error', 'Failed to load user data.');
        } finally {
            setLoading(false); // Hide the loading spinner when data is fetched
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserPosts(); // Fetch posts after user data is fetched
        }
    }, [user]);

    const onLogout = () => {
        AsyncStorage.setItem("userToken", "");
        router.replace("/welcome");
    };

    const handleLogout = async () => {
        Alert.alert("Confirm", "Are you sure you want to log out?", [
            {
                text: "Cancel",
                onPress: () => console.log("cancelled"),
                style: "cancel"
            },
            {
                text: "Logout",
                onPress: () => onLogout(),
                style: "destructive"
            }
        ]);
    };

    const fetchUserPosts = async () => {
        try {
            // Replace with actual API endpoint to fetch posts
            // const response = await fetch(`https://your-api-endpoint.com/api/posts?userId=${user.id}`);
            // const posts = await response.json();
            setPostsData(data.posts); // Set posts data (from local JSON for testing)
        } catch (error) {
            console.error('Error fetching posts:', error);
            Alert.alert('Error', 'Failed to load posts.');
        }
    };
    const editPost = async () => {
        router.push("/editPost")
    }

    const deletePost = async () => {

    }

    const UserHeader = ({ user }) => {
        if (!user) {
            return (
                <View style={styles.container}>
                    <Text>Loading user data...</Text>
                </View>
            );
        }

        return (
            <View style={{ gap: 15 }}>
                <View>
                    <Header title="Profile" mb={30} />
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon name="logout" color={theme.colors.rose} />
                    </TouchableOpacity>
                </View>
                <View style={styles.avatarContainer}>
                    <Avatar
                        imgUri={user?.image}
                        size={hp(12)}
                        rounded={theme.radius.xxl * 1.4}
                    />
                    <Pressable
                        style={styles.editIcon}
                        onPress={() => router.push("/editProfile")}
                    >
                        <Icon name="edit" strokeWidth={2.5} size={20} />
                    </Pressable>
                </View>

                {/* username & address */}
                <View style={{ alignItems: "center", gap: 4 }}>
                    <Text style={styles.userName}>{user?.username}</Text>
                    <Text style={styles.infoText}>{user?.address || 'No address provided'}</Text>
                </View>

                {/* email, phone and bio */}
                <View style={{ gap: 10, padding: 10 }}>
                    <View style={styles.info}>
                        <Icon name="mail" size={20} color={theme.colors.textLight} />
                        <Text style={styles.infoText}>{user?.email}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="call" size={20} color={theme.colors.textLight} />
                        <Text style={styles.infoText}>{user?.phone || 'No phone number'}</Text>
                    </View>
                </View>
            </View>
        );
    };

    // Render post item
    const renderPost = ({ item }) => (
        <TouchableOpacity style={styles.post}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={styles.postHeader}>
                    <Avatar size={hp(5)} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.postUsername}>{item.username}</Text>
                        <Text style={styles.postTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row", gap: 10, padding: 7}}>
                    <TouchableOpacity
                        onPress={() => editPost()}
                    >
                        <Icon name="edit" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deletePost()}
                    >
                        <Icon name="delete" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postBody}>{item.body}</Text>
            {item.file && (
                item.file.type === 'image' ? (
                    <Image source={{ uri: item.file.uri }} style={styles.postImage} />
                ) : (
                    <View style={styles.postVideoPlaceholder}>
                        <Text style={styles.videoText}>[Video Placeholder]</Text>
                    </View>
                )
            )}
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper bg="white">
            {loading ? (
                <Text>Loading...</Text> // Display loading text or spinner while the user data is being fetched
            ) : (
                <FlatList
                    data={postsData}
                    ListHeaderComponent={<UserHeader user={user} />}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderPost}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            )}
        </ScreenWrapper>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background, // Use background color from theme
    },
    avatarContainer: {
        height: hp(14),  // Adjusted for better visual proportions
        width: hp(14),
        alignSelf: "center",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: theme.colors.white,
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    userName: {
        fontSize: hp(3.5),  // Slightly larger for emphasis
        fontWeight: "600",  // Slightly heavier for prominence
        color: theme.colors.textDark,
        marginTop: hp(2),
    },
    infoText: {
        fontSize: hp(1.8),
        fontWeight: "400",  // Lighter text for secondary information
        color: theme.colors.textLight,
        textAlign: "center", // Center-align for address and similar info
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: hp(2),
    },
    infoIcon: {
        color: theme.colors.textLight,
    },
    logoutButton: {
        position: "absolute",
        top: 0,
        right: wp(4),
        padding: 8,
        borderRadius: theme.radius.sm,
        backgroundColor: "#fee2e2",
        elevation: 5,
    },
    postsContainer: {
        flex: 1,
        paddingHorizontal: wp(4),
        marginTop: hp(3),
    },
    loader: {
        marginTop: 50,
        alignSelf: "center",
    },
    post: {
        marginBottom: 20,
        padding: 15,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.light,
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    postUsername: {
        fontSize: hp(2.2),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    postTimestamp: {
        fontSize: hp(1.7),
        color: theme.colors.textLight,
    },
    postTitle: {
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold,
        marginBottom: 8,
    },
    postBody: {
        fontSize: hp(2),
        color: theme.colors.text,
        marginBottom: 10,
        lineHeight: hp(2.5), // Added line height for readability
    },
    postImage: {
        width: '100%',
        height: hp(25),
        borderRadius: theme.radius.sm,
        marginTop: 10,  // Adding some margin on top for better spacing
    },
    postVideoPlaceholder: {
        width: '100%',
        height: hp(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray,
        borderRadius: theme.radius.sm,
        marginTop: 10,
    },
    videoText: {
        color: theme.colors.textLight,
        fontSize: hp(1.7),  // Slightly smaller for video placeholder
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: hp(3),
        paddingHorizontal: wp(4),
    },
    footerButton: {
        marginLeft: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text,
        marginTop: 30, // Added margin for spacing
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2),
    },
    postActionIcon: {
        color: theme.colors.textLight,
    },
});
