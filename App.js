import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';

//Import screens
import MainHomeScreen from './screens/HomeScreen';
import MainStrategyScreen from './screens/Strategy/StrategyListScreen';
import MainHelpScreen from './screens/HelpListScreen';
import MainTrackingScreen from './screens/TrackingScreen';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-outline' : 'home-sharp';
            } else if (route.name === 'Strategy') {
              iconName = focused ? 'book-outline' : 'book-sharp';
            }
            else if (route.name === 'Help') {
              iconName = focused ? 'help-circle-outline' : 'help-circle';
            }
            else if (route.name === 'Tracking') {
              iconName = focused ? 'timer-outline' : 'timer-sharp';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Home" component={MainHomeScreen} />
      <Tab.Screen name="Strategy" component={MainStrategyScreen} />
      <Tab.Screen name="Help" component={MainHelpScreen} />
      <Tab.Screen name="Tracking" component={MainTrackingScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});