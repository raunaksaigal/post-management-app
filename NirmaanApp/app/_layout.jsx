//Fixed Layout Stacks ~Deb
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const _layout = () => {
  const router = useRouter();

  useEffect(() => {
    // if (AsyncStorage.getItem("userToken")) {
    //   router.replace("/home");
    // } else {
    //   router.replace("/welcome");
    // }
    router.replace("/welcome");
  })
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }
        }   
    />
  )
}

export default _layout