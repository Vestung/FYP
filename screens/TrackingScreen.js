import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function TrackingScreen({ navigation: { navigate } }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the tracking screen of the app</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default class MainTrackingScreen extends Component {
  render() {
    return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen name="Tracking" component={TrackingScreen} />
      </Stack.Navigator>
    )
  }
}