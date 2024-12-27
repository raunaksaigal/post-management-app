/* Made by Debrup Sengupta (Deb) & Sagnik Sinha for queries debrupsengupta289@gmail.com , sagniksinha.2004@gmail.com */
//Comment for bug fixes & debugging or new functionalities added
import { Button, View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import Loading from '../components/Loading';

const index = () => {
    const router = useRouter();
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      {/* <Button title='Welcome' onPress={() => router.replace("welcome")}/> */}
      <Loading />
    </View> 
  )
}

export default index