import React from "react";
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    row: {
      backgroundColor: `#a9a9a9`,
      padding:20,
      marginBottom:10
    },
    title: {
      fontSize:21,
    }
});

const Row = props => (
    <TouchableOpacity 
      style={styles.row}
      onPress={() => props.onSelectStrategy(props)}>
      <Text style={styles.title} >{props.title}</Text>
    </TouchableOpacity>
)

export default Row