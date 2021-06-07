import React, { Component } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screens
import StrategyList from './StrategyList'
import DetailsScreen from './DetailsScreen'
import AddStrategyScreen from './AddStrategyScreen'
import EditStrategyScreen from './EditStrategyScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

let id = 0;

class StrategyScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      strategies: [],
    }
  this.addStrategy = this.addStrategy.bind(this);
  this.removeStrategy = this.removeStrategy.bind(this);
  this.editStrategy = this.editStrategy.bind(this);
  this.save = this.save.bind(this);
  this.load = this.load.bind(this);
  this.saveID = this.saveID.bind(this);
  this.loadID = this.loadID.bind(this);
}
  componentDidMount(){
    this.load();
    this.loadID();
  }

  componentDidUpdate(prevState){
    if(prevState.strategies !== this.state.strategies){
      this.save();
      this.saveID();
    }
  }
  
  save = () => {
    try {
      const jsonValue = JSON.stringify(this.state.strategies)
      AsyncStorage.setItem('@strategy',jsonValue)
    }
    catch (err){
      alert(err)
    }
  }

  saveID = () =>{
    try {
      const jsonID = JSON.stringify(id)
      AsyncStorage.setItem('@stratID',jsonID)
    }
    catch (err){
      alert(err)
    }
  }

  load = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@strategy');
      if(jsonValue!= null){
        const parsedValue = JSON.parse(jsonValue)
        this.setState({strategies: parsedValue})
      }
    }
    catch (err){
      alert(err)
    }
  }

  loadID = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@stratID');
      if(jsonValue!= null){
        const parsedValue = parseInt(JSON.parse(jsonValue))
        id = parsedValue;
      }
    }
    catch (err){
      alert(err)
    }
  }

  handleSelectStrategy = strategy => {
    this.props.navigation.navigate('Strategy Details', {
      id:strategy.id, 
      title:strategy.title,
      content:strategy.content,
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
          onRemoveStrategy={this.removeStrategy}
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
    LogBox.ignoreAllLogs()
    return (
      <Stack.Navigator 
        initialRouteName="List of Strategies" 
        screenOptions={{headerTitleAlign: 'center'}}
        
      >
        <Stack.Screen name="List of Strategies" component={StrategyScreen} />
        <Stack.Screen name="Strategy Details" component={DetailsScreen} />
        <Stack.Screen name="Add Strategy" component={AddStrategyScreen} />
        <Stack.Screen name="Edit Strategy" component={EditStrategyScreen} />
      </Stack.Navigator>
    )
  }
}