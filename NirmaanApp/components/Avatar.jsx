import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import { Image } from 'expo-image'

const Avatar = ({
    imgUri,
    size=hp(4.5),
    rounded=theme.radius.md,
    style={}
}) => {
    const getUserImgSrc = () => {
        if (imgUri) {
            return {uri: imgUri}
        } else {
            return require("../assets/images/defaultUser.png")
        }
    }

  return (
    <Image
        source={getUserImgSrc()}
        transition={100}
        style={[styles.avatar,
            {height: size, width: size, borderRadius: rounded},
            style
        ]}
    />
  );
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        borderCurve: "continuous",
        borderColor: theme.colors.darkLight,
        borderWidth: 1,
    }
})