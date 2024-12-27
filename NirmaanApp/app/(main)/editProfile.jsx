import React, { useState } from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
//import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import { Image } from 'expo-image'
import Icon from '../../assets/icons'
import Input from '../../components/input';
import Button from '../../components/Button';

const EditProfile = () => {
  const onPickImage = async ()=>{
    //Fill later
  }
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async()=>{
    //Fill later
  }
  //Fill later
  const [user, setUser] = useState({
    name: '',
    phoneNumber:'',
    image: null,
    bio: '',
    address: '',
  })
  return (
    <ScreenWrapper bg="white">
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Header title="Edit Profile"/>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            <Image source={require('../../assets/images/defaultUser.png')} style={styles.avatar} />
            <Pressable style={styles.cameraIcon} onPress={onPickImage}>
              <Icon name="camera" size={20} strokeWidth={2.5}/>
            </Pressable>
          </View>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Please Fill Your Profile Details!
          </Text>
          <Input
            icon={<Icon name="user"/>} 
            placeholder="Enter your name"
            value={null}
            onChangeText={value=>{}}/>
          <Input
            icon={<Icon name="call"/>} 
            placeholder="Enter your phone number"
            value={null}
            onChangeText={value=>{}}/>
          <Input
            icon={<Icon name="location"/>} 
            placeholder="Enter your address"
            value={null}
            onChangeText={value=>{}}/>
          <Input
            placeholder="Enter a bio"
            value={null}
            multiline={true}
            containerStyle={styles.bio}
            onChangeText={value=>{}}/>
            <Button title="Update" loading={loading} onPress={onSubmit}/>
        </View>
      </ScrollView>
    </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
          flex: 1,
          paddingHorizontal:wp(4), // Use background color from theme
      },
      avatarContainer: {
          height: hp(14),  // Adjusted for better visual proportions
          width: hp(14),
          alignSelf: "center",
      },
      avatar: {
          width: '100%',
          height: '100%',
          borderRadius: theme.radius.xxl*1.8,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: theme.colors.darkLight,
      },
      cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
      },
      form: {
        gap: 18,
        marginTop:20,
      },
      input: {
        flexDirection: 'row',
        borderWidth: 0.4,
      },
      bio: {
        flexDirection:'row',
        height: hp(15),
        alignItems:'flex-start',
        paddingVertical: 15,
      }
})