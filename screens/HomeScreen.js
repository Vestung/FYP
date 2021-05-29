import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


class HomeScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the home screen of the app</Text>
      </View>
    );
  }
}


const Stack = createStackNavigator();

export default class MainHomeScreen extends Component {
  render() {
    return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
  }
}