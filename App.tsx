import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSpring, withTiming } from 'react-native-reanimated'

export default function App() {

  const width = useSharedValue(100)
  const translateX = useSharedValue(0)

  const increaseWidth = () => {
    width.value = withSpring(width.value + 50)
  }

  const decreaseeWidth = () => {
    width.value = withSpring(width.value - 50)
  }

  const moveRight = () => {
    translateX.value = withDelay(1000, withTiming(translateX.value + 10, { duration: 5000 }))
  }

  const rotation = useSharedValue(0)
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
        {
          scale: scale.value

        }
      ]
    }
  })

  const startRotation = () => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1)
    scale.value = withRepeat(withTiming(5, { duration: 2000, easing: Easing.linear }), -1, true)
  }


  return (
    <View style={styles.container}>
      <Animated.View style={{width: width, height: 100, backgroundColor: 'red'}}></Animated.View>
      <Animated.View style={[{width: 100, height: 100, backgroundColor: 'blue'}, { transform: [{ translateX: translateX }] }]}></Animated.View>

      <Animated.View style={[{width: 100, height: 100, backgroundColor: 'pink'}, animatedStyle ]}></Animated.View>
      
      <Button title='Touch' onPress={increaseWidth}></Button>
      <Button title='Touch' onPress={decreaseeWidth}></Button>
      <Button title='Move Right' onPress={moveRight}></Button>
      <Button title='Rotate' onPress={startRotation}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
});
