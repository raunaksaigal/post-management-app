import { TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Avatar from '../../components/Avatar'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'
import Icon from '../../assets/icons'
import Button from '../../components/Button'
import * as ImagePicker from "expo-image-picker"
import { Video } from "expo-video"
import { createOrUpdatePost } from '../../services/postService'

const NewPost = () => {
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const titleRef = useRef("");

  const onPick = async (isImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: isImage ? ["images"] : ["videos"],
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.7
    })
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  }

  const isLocalFile = file => {
    if (!file) return null
    if (typeof file == "object") return true;

    return false;
  }

  const getFileType = file => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }

    // check image or video for remote file
    if (file.includes("postimage")) {
      return "image"
    }
    return "video"
  }

  const getFileUri = file => {
    if (!file) return null;
    if (isLocalFile(file)) return file.uri;
  }

  const onSubmit = async () => {
    if (!titleRef.current && !bodyRef.current && !file) {
      Alert.alert("Post", "Please choose an image or add a post body")
      return;
    }

    let data = {
      title: titleRef.current,
      body: bodyRef.current, 
      file: file ? getFileUri(file) : null,   // The body text content from the editor
      username: "user123",        // Replace with actual user ID (can be fetched from the auth context)
    };

    setLoading(true);
    let response = await createOrUpdatePost(data);
    setLoading(false);

    if (response.success) {
      setFile(null);
      bodyRef.current = "";
      editorRef.current?.setContentHTML("");
      router.back();
    } else {
      Alert.alert("Post", response.msg);
    }
    
  }

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Create Post" showBackButton={true}/>
        <ScrollView contentContainerStyle={{gap:20}}>
          {/* avatar */}
          <View style={styles.header}>
            <Avatar
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{gap:2}}>
              <Text style={styles.username}>
                Username
              </Text>
              <Text style={styles.publicText}>
                Public
              </Text>
            </View>
          </View>

          <View style={styles.textEditor}>
            <Text style={styles.titleInputLabel}>Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Enter post title..."
              placeholderTextColor={theme.colors.textLight}
              onChangeText={text => (titleRef.current = text)}
            />
            <RichTextEditor
              editorRef={editorRef}
              onTextChange={body => (bodyRef.current = body)}
            />
          </View>

          {
            file && (
              <View style={styles.file}>
                {
                  getFileType(file) == "video" ? (
                    <Video 
                      style={{flex: 1}}
                      source={{
                        uri: getFileUri(file),
                      }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      shouldPlay
                    />
                  ) : (
                    <Image source={{uri:getFileUri(file)}} resizeMode="cover" style={{flex:1}} />
                  )
                }

                <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                  <Icon name="delete" size={20} color="white" />
                </Pressable>
              </View>
            )
          }

          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => {onPick(true)}}>
                <Icon name="image" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {onPick(false)}}>
                <Icon name="video" size={33} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button 
          buttonStyle={{height:hp(6.2)}}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    // marginBottom: 10,
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight
  },
  textEditor: {
    // marginTop: 10,
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  imageIcon: {
    // backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    // padding: 6,
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous"
  },
  video: {

  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "rgba(255,0,0,0.6)"
    // shadowColor: theme.colors.textLight,
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.6,
    // shadowRadius: 8
  },
  titleInputLabel: {
    fontSize: hp(2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1.5,
    borderColor: theme.colors.gray,
    borderRadius: theme.radius.md,
    padding: 10,
    marginBottom: 15,
    fontSize: hp(2),
    color: theme.colors.text,
  },
})