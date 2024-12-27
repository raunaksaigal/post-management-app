//Responsive Wrapper Component for other application components
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children , bg}) => {
    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+5: 30;
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <View style={{flex: 1, paddingTop, backgroundColor: bg}}>
        {
          children
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ScreenWrapper


