import React from "react";
import {Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
    row: {
      backgroundColor: `#a9a9a9`,
      padding:20,
    },
    title: {
      fontSize:21,
    },
    rightAction: {
      backgroundColor: '#dd2c00',
      justifyContent: 'center',
      alignItems:'flex-end',
      flex:1,
    },
    actionText: {
      color: '#fff',
      fontWeight: '900',
      padding: 30
    }
});
const RightActions = ({progress, dragX, onPress}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })
  return(
    <TouchableOpacity onPress ={onPress}>
      <View style ={styles.rightAction}>
        <Animated.Text style={[styles.actionText, {transform: [{ scale }]}]}>Delete</Animated.Text>
      </View>
    </TouchableOpacity>
  )
}
const Row = props => (
  <Swipeable
    renderRightActions={
      (progress, dragX) => <RightActions 
        progress ={progress} 
        dragX={dragX}
        onPress={() =>props.onRemoveHelp(props.id)}/>
    }
    >
    <TouchableOpacity 
      style={styles.row}
      onPress={() => props.onSelectHelp(props)}>
      <Text style={styles.title} >{props.title}</Text>
    </TouchableOpacity>
  </Swipeable>
)

export default Row