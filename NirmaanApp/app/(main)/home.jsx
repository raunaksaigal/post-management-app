import { Pressable, StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import Avatar from '../../components/Avatar';
// import data from "../../components/data.json";

const Home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://10.10.10.92:8000/api/v1/posts/?perpage=2&page=1')
      console.log("before data")
      // const response = await fetch('https://api.example.com/posts'); // Replace with your API URL
      // const data = await response.json();
      // setPosts(data.posts || []); // Assume `data.posts` contains the list of posts
      if (response.ok){
        const data = await response.json();
        console.log(data)

        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Render post item
  const renderPost = ({ item }) => (
    <TouchableOpacity
        style={styles.post}
        onPress={() => {
            console.log(item.id);
            router.push({ pathname: 'postDetail', query: { postId: item.id } })}
        }
    >
      <View style={styles.postHeader}>
        <Avatar size={hp(5)} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.postUsername}>{item.username}</Text>
        </View>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      {item.image && (
        <Image source={{ uri: `https://10.10.10.92:8000${item.image}` }} style={styles.postImage} />
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
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nirmaan</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push('notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
            <Pressable onPress={() => router.push('newPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
            </Pressable>
            <Pressable onPress={() => router.push('profile')}>
              <Avatar />
            </Pressable>
          </View>
        </View>

        {/* Posts list */}
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
        ) : posts.length > 0 ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            contentContainerStyle={styles.listStyle}
          />
        ) : (
          <Text style={styles.noPosts}>No posts available</Text>
        )}

        
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
    paddingBottom: 20,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  loader: {
    marginTop: 50,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.light,
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
  },
  postImage: {
    width: '100%',
    height: hp(25),
    borderRadius: theme.radius.sm,
  },
  postVideoPlaceholder: {
    width: '100%',
    height: hp(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.sm,
  },
  videoText: {
    color: theme.colors.textLight,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 10
  },
  footerButton: {
    marginleft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  }
});
