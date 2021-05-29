import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


class HelpScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the home screen of the app</Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('Help Details', { names: ['Brent', 'Satya', 'Michaś'] })
          }
          title="Go to Help Details"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component{
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Text>Friends: </Text>
        <Text>{this.props.route.params.names[0]}</Text>
        <Text>{this.props.route.params.names[1]}</Text>
        <Text>{this.props.route.params.names[2]}</Text>
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}


const Stack = createStackNavigator();

export default class MainHelpScreen extends Component {
  render() {
    return (
      <Stack.Navigator 
        initialRouteName="Help"
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Help Details" component={DetailsScreen} />
      </Stack.Navigator>
    )
  }
}