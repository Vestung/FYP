import React, { Component } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screens
import HelpList from './HelpList'
import DetailsScreen from './DetailsScreen'
import AddHelpScreen from './AddHelpScreen'
import EditHelpScreen from './EditHelpScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class HelpScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      help: [],
      id: 0,
    }
  this.addHelp = this.addHelp.bind(this);
  this.removeHelp = this.removeHelp.bind(this);
  this.editHelp = this.editHelp.bind(this);
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
    if(prevState.help !== this.state.help){
      this.save();
      this.saveID();
    }
  }
  
  save = () => {
    try {
      const jsonValue = JSON.stringify(this.state.help)
      AsyncStorage.setItem('@help',jsonValue)
    }
    catch (err){
      alert(err)
    }
  }

  saveID = () =>{
    try {
      const jsonID = JSON.stringify(this.state.id)
      AsyncStorage.setItem('@helpID',jsonID)
    }
    catch (err){
      alert(err)
    }
  }

  load = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@help');
      if(jsonValue!= null){
        const parsedValue = JSON.parse(jsonValue)
        this.setState({help: parsedValue})
      }
    }
    catch (err){
      alert(err)
    }
  }

  loadID = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@helpID');
      if(jsonValue!= null){
        const parsedValue = parseInt(JSON.parse(jsonValue))
        this.setState({id: parsedValue})
      }
    }
    catch (err){
      alert(err)
    }
  }

  handleSelectHelp = help => {
    this.props.navigation.navigate('Question Details', {
      id:help.id, 
      title:help.title,
      content:help.content,
      editHelp: this.editHelp
    });
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
     ]);
  };

  addHelp = newHelp => {
    this.state.id++
    this.setState(prevState => ({
      help: [...prevState.help, {id: this.state.id,title: newHelp.title,content: newHelp.content}]
    }));
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  };

  editHelp = (id,value) => {
    const elementsIndex = this.state.help.findIndex(element => element.id == id)
    let newArray = [...this.state.help]
    newArray[elementsIndex] =
    {...newArray[elementsIndex], title: value.title,content : value.content }
    this.setState({
      help: newArray,
    })
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
     ]);
  };

  removeHelp = id =>{
    this.setState( prevState => ({
      help: prevState.help.filter(help => help.id !== id)
    }))
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }

  render(){
    return (
      <View style={styles.container}>
        <HelpList 
          renderItem help={this.state.help}
          onSelectHelp={this.handleSelectHelp}
          onRemoveHelp={this.removeHelp}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate('Add New Question', {addHelp : this.addHelp})
          }
          title="Add new Question"
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
        initialRouteName="FAQ" 
        screenOptions={{headerTitleAlign: 'center'}}
      >
        <Stack.Screen name="FAQ" component={HelpScreen} />
        <Stack.Screen name="Question Details" component={DetailsScreen} />
        <Stack.Screen name="Add New Question" component={AddHelpScreen} />
        <Stack.Screen name="Edit Question" component={EditHelpScreen} />
      </Stack.Navigator>
    )
  }
}