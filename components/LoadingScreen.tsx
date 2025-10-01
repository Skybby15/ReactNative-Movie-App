import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import React from 'react'
import { ActivityIndicator, Image, View } from 'react-native'

const LoadingScreen = () => {
  return (
    <View className='flex-1 bg-black items-center justify-center'>
        <Image source={images.bg} className="absolute w-full z-0 top-0" />
        <Image source={icons.logo} className="w-12 h-10 mb-5" />
        <ActivityIndicator size={'large'} 
            color={"#0000ff"}
            className="my-3"
        />
    </View>
  )
}

export default LoadingScreen