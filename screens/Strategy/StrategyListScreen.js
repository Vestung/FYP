import React, { Component } from 'react';
import {Button, FlatList, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import StrategyList from './StrategyList'
import DetailsScreen from './DetailsScreen'
import AddStrategyScreen from './AddStrategyScreen'
import EditStrategyScreen from './EditStrategyScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

let id = 0

class StrategyScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      strategies: [
        {
          id: 0,
          title: 'Strat1',
          content: 'Content1'
        }
      ],
    }
  this.addStrategy = this.addStrategy.bind(this);
  this.removeStrategy = this.removeStrategy.bind(this);
  this.editStrategy = this.editStrategy.bind(this);
}

  handleSelectStrategy = strategy => {
    this.props.navigation.navigate('Strategy Details', {
      id:strategy.id, 
      title:strategy.title,
      content:strategy.content,
      removeStrategy: this.removeStrategy,
      editStrategy: this.editStrategy
    });
  };

  addStrategy = newStrategy => {
    id++
    this.setState(prevState => ({
      strategies: [...prevState.strategies, {id: id,title: newStrategy.title,content: newStrategy.content}]
    }));
  };

  editStrategy = (id,value) => {
    const elementsIndex = this.state.strategies.findIndex(element => element.id == id)
    let newArray = [...this.state.strategies]
    newArray[elementsIndex] =
    {...newArray[elementsIndex], title: value.title,content : value.content }
    this.setState({
      strategies: newArray,
    })
  };

  removeStrategy = id =>{
    this.setState( prevState => ({
      strategies: prevState.strategies.filter(strategy => strategy.id !== id)
    }))
  }

  render(){
    return (
      <View style={styles.container}>
        <StrategyList 
          renderItem strategies={this.state.strategies}
          onSelectStrategy={this.handleSelectStrategy}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate('Add Strategy', {addStrategy : this.addStrategy})
          }
          title="Add new Strategies"
        />
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default class MainStrategyScreen extends Component {
  render() {
    return (
      <Stack.Navigator 
        initialRouteName="Strategy" 
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen name="Strategy List" component={StrategyScreen} />
        <Stack.Screen name="Strategy Details" component={DetailsScreen} />
        <Stack.Screen name="Add Strategy" component={AddStrategyScreen} />
        <Stack.Screen name="Edit Strategy" component={EditStrategyScreen} />
      </Stack.Navigator>
    )
  }
}