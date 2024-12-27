import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { hp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';
import Icon from '../../assets/icons';
import data from "../../components/data.json"; // Assume this is the mock data for posts
import BackButton from '../../components/BackButton';

const PostDetail = () => {
  const router = useRouter();
  const { postId } = {postId: 1}; // Fetching the postId from the query parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(postId);

  // Fetch post details based on postId
  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      // Fetch the post data based on postId (here we use mock data as an example)
      const postDetails = data.posts.find((item) => item.id === parseInt(postId)); // Replace with API call if needed
      setPost(postDetails);
    } catch (error) {
      console.error('Error fetching post details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPost}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <BackButton 
            router={router}
        />
      </View>
      

      {/* Main Post Details */}
      <View style={styles.header}>
        <Avatar size={hp(6)} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.postUsername}>{post.username}</Text>
          <Text style={styles.postTimestamp}>{new Date(post.timestamp).toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postBody}>{post.body}</Text>

      {post.file && (
        post.file.type === 'image' ? (
          <Image source={{ uri: post.file.uri }} style={styles.postImage} />
        ) : (
          <View style={styles.postVideoPlaceholder}>
            <Text style={styles.videoText}>[Video Placeholder]</Text>
          </View>
        )
      )}

      <View style={styles.footer}>
        <View style={styles.footerButton}>
            <TouchableOpacity>
                <Icon name="heart" size={24} color={theme.colors.textDark} />
            </TouchableOpacity>
        </View>
        <View style={styles.footerButton}>
            <TouchableOpacity>
                <Icon name="comment" size={24} color={theme.colors.textDark} />
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15
  },
  postUsername: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  postTimestamp: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  postTitle: {
    fontSize: hp(3),
    fontWeight: theme.fonts.bold,
    marginVertical: 10,
  },
  postBody: {
    fontSize: hp(2.2),
    color: theme.colors.text,
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: hp(30),
    borderRadius: theme.radius.sm,
    marginBottom: 15,
  },
  postVideoPlaceholder: {
    width: '100%',
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
    marginBottom: 15,
  },
  videoText: {
    color: theme.colors.textLight,
  },
  backButton: {
    marginTop: 20,
  },
  noPost: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    textAlign: 'center',
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  footerButton: {
    marginleft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  }
});
