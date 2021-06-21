import React, { Component } from 'react';
import {TextInput, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stages: {
    paddingBottom: 24,
  },
  stageTitle: {
    fontSize: 36,
    paddingBottom: 12,
  },
  row: {
    flexDirection:"row",
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: 1
  },
  left: {
    fontSize: 24,
    justifyContent:'center',
    paddingRight: 30
  },
  dateLeft: {
    fontSize: 18,
    justifyContent:'center',
    paddingRight: 1
  },
  buttonRed: {
    paddingLeft:10,
    borderRadius:10,
    backgroundColor: `#dc143c`,
    padding: 10,
  },
  buttonYellow: {
    paddingLeft:10,
    borderRadius:10,
    backgroundColor: `#ffff00`,
    padding: 10,
  },
  buttonGreen: {
    paddingLeft:10,
    borderRadius:10,
    backgroundColor: `#008000`,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
    textAlignVertical: 'center',
  },
});


class TrackingScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      unitPlanning: 'NOT DONE',
      unitAnalysis: 'NOT DONE',
      unitDesign: 'NOT DONE',
      unitMonitoring: 'NOT DONE',
      integrationPlanning: 'NOT DONE',
      integrationAnalysis: 'NOT DONE',
      integrationDesign: 'NOT DONE',
      integrationMonitoring: 'NOT DONE',
      systemPlanning: 'NOT DONE',
      systemAnalysis: 'NOT DONE',
      systemDesign: 'NOT DONE',
      systemMonitoring: 'NOT DONE',
      showUnitStartCalendar: false,
      showUnitEndCalendar: false,
      showIntegrationStartCalendar: false,
      showIntegrationEndCalendar: false,
      showSystemStartCalendar: false,
      showSystemEndCalendar: false,
      unitDateStart: new Date(),
      unitDateEnd: new Date(),
      integrationDateStart: new Date(),
      integrationDateEnd: new Date(),
      systemDateStart: new Date(),
      systemDateEnd: new Date(),
    }
    this.onPress = this.onPress.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.onShowUnitStart = this.onShowUnitStart.bind(this);
    this.onShowUnitEnd = this.onShowUnitEnd.bind(this);
    this.onShowIntegrationStart = this.onShowIntegrationStart.bind(this);
    this.onShowIntegrationEnd = this.onShowIntegrationEnd.bind(this);
    this.onShowSystemStart = this.onShowSystemStart.bind(this);
    this.onShowSystemEnd = this.onShowSystemEnd.bind(this);
    this.onChangeUnitStart = this.onChangeUnitStart.bind(this);
    this.onChangeUnitEnd = this.onChangeUnitEnd.bind(this);
    this.onChangeIntegrationStart = this.onChangeIntegrationStart.bind(this);
    this.onChangeIntegrtaionEnd = this.onChangeIntegrtaionEnd.bind(this);
    this.onChangeSystemStart = this.onChangeSystemStart.bind(this);
    this.onChangeSystemEnd = this.onChangeSystemEnd.bind(this);
  }


  onChangeUnitStart = (event, selectedDate) => {
    this.setState({showUnitStartCalendar: false})
    if(selectedDate){
      this.setState({unitDateStart: selectedDate})
    }
  };

  onChangeUnitEnd = (event, selectedDate) => {
    this.setState({showUnitEndCalendar: false})
    if(selectedDate){
      this.setState({unitDateEnd: selectedDate})
    }
  };

  onChangeIntegrationStart = (event, selectedDate) => {
    this.setState({showIntegrationStartCalendar: false})
    if(selectedDate){
      this.setState({integrationDateStart: selectedDate})
    }
  };

  onChangeIntegrtaionEnd = (event, selectedDate) => {
    this.setState({showIntegrationEndCalendar: false})
    if(selectedDate){
      this.setState({integrationDateEnd: selectedDate})
    }
  };

  onChangeSystemStart = (event, selectedDate) => {
    this.setState({showSystemStartCalendar: false})
    if(selectedDate){
      this.setState({systemDateStart: selectedDate})
    }
  };

  onChangeSystemEnd = (event, selectedDate) => {
    this.setState({showSystemEndCalendar: false})
    if(selectedDate){
      this.setState({systemDateEnd: selectedDate})
    }
  };

  onShowUnitStart = () => {
    this.setState({showUnitStartCalendar: true})
  }
  
  onShowUnitEnd = () => {
    this.setState({showUnitEndCalendar: true})
  }
  
  onShowIntegrationStart = () => {
    this.setState({showIntegrationStartCalendar: true})
  }
  
  onShowIntegrationEnd = () => {
    this.setState({showIntegrationEndCalendar: true})
  }
  
  onShowSystemStart = () => {
    this.setState({showSystemStartCalendar: true})
  }
  
  onShowSystemEnd = () => {
    this.setState({showSystemEndCalendar: true})
  }

  componentDidMount(){
    this.load();
  }

  componentDidUpdate(prevState){
    if(prevState !== this.state){
      this.save();
    }
  }

  save = () => {
    try {
      const jsonValue = JSON.stringify(this.state)
      AsyncStorage.setItem('@tracking',jsonValue)
    }
    catch (err){
      alert(err)
    }
  }

  load = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tracking');
      if(jsonValue!= null){
        const parsedValue = JSON.parse(jsonValue)
        this.setState({
          unitPlanning: parsedValue.unitPlanning,
          unitAnalysis: parsedValue.unitAnalysis,
          unitDesign: parsedValue.unitDesign,
          unitMonitoring: parsedValue.unitMonitoring,
          integrationPlanning: parsedValue.integrationPlanning,
          integrationAnalysis: parsedValue.integrationAnalysis,
          integrationDesign: parsedValue.integrationDesign,
          integrationMonitoring: parsedValue.integrationMonitoring,
          systemPlanning: parsedValue.systemPlanning,
          systemAnalysis: parsedValue.systemAnalysis,
          systemDesign: parsedValue.systemDesign,
          systemMonitoring: parsedValue.systemMonitoring,
          unitDateStart: new Date(parsedValue.unitDateStart),
          unitDateEnd: new Date (parsedValue.unitDateEnd),
          integrationDateStart: new Date (parsedValue.integrationDateStart),
          integrationDateEnd: new Date (parsedValue.integrationDateEnd),
          systemDateStart: new Date (parsedValue.systemDateStart),
          systemDateEnd: new Date (parsedValue.systemDateEnd),
        })
      }else {
        this.setState({
          unitPlanning: 'NOT DONE',
          unitAnalysis: 'NOT DONE',
          unitDesign: 'NOT DONE',
          unitMonitoring: 'NOT DONE',
          integrationPlanning: 'NOT DONE',
          integrationAnalysis: 'NOT DONE',
          integrationDesign: 'NOT DONE',
          integrationMonitoring: 'NOT DONE',
          systemPlanning: 'NOT DONE',
          systemAnalysis: 'NOT DONE',
          systemDesign: 'NOT DONE',
          systemMonitoring: 'NOT DONE',
          unitDateStart: new Date(),
          unitDateEnd: new Date(),
          integrationDateStart: new Date(),
          integrationDateEnd: new Date(),
          systemDateStart: new Date(),
          systemDateEnd: new Date(),
        })
      }
    }
    catch (err){
      alert(err)
    }
  }

  onPress = (param) => {
    switch(param) {
      case "unitPlanning":
        if (this.state.unitPlanning == 'NOT DONE'){
          this.setState({unitPlanning: 'IN PROGRESS'})
          break;
        } else if (this.state.unitPlanning == 'IN PROGRESS'){
          this.setState({unitPlanning: 'DONE'})
          break;
        } else if (this.state.unitPlanning == 'DONE'){
          this.setState({unitPlanning: 'NOT DONE'})
          break;
        }
      break;

      case "unitAnalysis":
        if (this.state.unitAnalysis == 'NOT DONE'){
          this.setState({unitAnalysis: 'IN PROGRESS'})
          break;
        } else if (this.state.unitAnalysis == 'IN PROGRESS'){
          this.setState({unitAnalysis: 'DONE'})
          break;
        } else if (this.state.unitAnalysis == 'DONE'){
          this.setState({unitAnalysis: 'NOT DONE'})
          break;
        }
      break;

      case "unitDesign":
        if (this.state.unitDesign == 'NOT DONE'){
          this.setState({unitDesign: 'IN PROGRESS'})
          break;
        } else if (this.state.unitDesign == 'IN PROGRESS'){
          this.setState({unitDesign: 'DONE'})
          break;
        } else if (this.state.unitDesign == 'DONE'){
          this.setState({unitDesign: 'NOT DONE'})
          break;
        }
      break;

      case "unitMonitoring":
        if (this.state.unitMonitoring == 'NOT DONE'){
          this.setState({unitMonitoring: 'IN PROGRESS'})
          break;
        } else if (this.state.unitMonitoring == 'IN PROGRESS'){
          this.setState({unitMonitoring: 'DONE'})
          break;
        } else if (this.state.unitMonitoring == 'DONE'){
          this.setState({unitMonitoring: 'NOT DONE'})
          break;
        }
      break;

      case "integrationPlanning":
        if (this.state.integrationPlanning == 'NOT DONE'){
          this.setState({integrationPlanning: 'IN PROGRESS'})
          break;
        } else if (this.state.integrationPlanning == 'IN PROGRESS'){
          this.setState({integrationPlanning: 'DONE'})
          break;
        } else if (this.state.integrationPlanning == 'DONE'){
          this.setState({integrationPlanning: 'NOT DONE'})
          break;
        }
      break;

      case "integrationAnalysis":
        if (this.state.integrationAnalysis == 'NOT DONE'){
          this.setState({integrationAnalysis: 'IN PROGRESS'})
          break;
        } else if (this.state.integrationAnalysis == 'IN PROGRESS'){
          this.setState({integrationAnalysis: 'DONE'})
          break;
        } else if (this.state.integrationAnalysis == 'DONE'){
          this.setState({integrationAnalysis: 'NOT DONE'})
          break;
        }
      break;

      case "integrationDesign":
        if (this.state.integrationDesign == 'NOT DONE'){
          this.setState({integrationDesign: 'IN PROGRESS'})
          break;
        } else if (this.state.integrationDesign == 'IN PROGRESS'){
          this.setState({integrationDesign: 'DONE'})
          break;
        } else if (this.state.integrationDesign == 'DONE'){
          this.setState({integrationDesign: 'NOT DONE'})
          break;
        }
      break;

      case "integrationMonitoring":
        if (this.state.integrationMonitoring == 'NOT DONE'){
          this.setState({integrationMonitoring: 'IN PROGRESS'})
          break;
        } else if (this.state.integrationMonitoring == 'IN PROGRESS'){
          this.setState({integrationMonitoring: 'DONE'})
          break;
        } else if (this.state.integrationMonitoring == 'DONE'){
          this.setState({integrationMonitoring: 'NOT DONE'})
          break;
        }
      break;

      case "systemPlanning":
        if (this.state.systemPlanning == 'NOT DONE'){
          this.setState({systemPlanning: 'IN PROGRESS'})
          break;
        } else if (this.state.systemPlanning == 'IN PROGRESS'){
          this.setState({systemPlanning: 'DONE'})
          break;
        } else if (this.state.systemPlanning == 'DONE'){
          this.setState({systemPlanning: 'NOT DONE'})
          break;
        }
      break;

      case "systemAnalysis":
        if (this.state.systemAnalysis == 'NOT DONE'){
          this.setState({systemAnalysis: 'IN PROGRESS'})
          break;
        } else if (this.state.systemAnalysis == 'IN PROGRESS'){
          this.setState({systemAnalysis: 'DONE'})
          break;
        } else if (this.state.systemAnalysis == 'DONE'){
          this.setState({systemAnalysis: 'NOT DONE'})
          break;
        }
      break;

      case "systemDesign":
        if (this.state.systemDesign == 'NOT DONE'){
          this.setState({systemDesign: 'IN PROGRESS'})
          break;
        } else if (this.state.systemDesign == 'IN PROGRESS'){
          this.setState({systemDesign: 'DONE'})
          break;
        } else if (this.state.systemDesign == 'DONE'){
          this.setState({systemDesign: 'NOT DONE'})
          break;
        }
      break;

      case "systemMonitoring":
        if (this.state.systemMonitoring == 'NOT DONE'){
          this.setState({systemMonitoring: 'IN PROGRESS'})
          break;
        } else if (this.state.systemMonitoring == 'IN PROGRESS'){
          this.setState({systemMonitoring: 'DONE'})
          break;
        } else if (this.state.systemMonitoring == 'DONE'){
          this.setState({systemMonitoring: 'NOT DONE'})
          break;
        }
      break;
    }
  }
  
  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.stages}> 
        {/* Unit Testing */}
          <Text style= {styles.stageTitle}>Unit Testing</Text>
          {/* Unit Planning */}
          <View style={styles.row}>
            <Text style={styles.left}>Planning: </Text>
            {(() => {
              if(this.state.unitPlanning == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("unitPlanning")}>
                  <Text style= {styles.buttonText}> {this.state.unitPlanning} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.unitPlanning == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("unitPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.unitPlanning} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.unitPlanning == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("unitPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.unitPlanning} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Unit Analysis */}
          <View style={styles.row}>
            <Text style={styles.left}>Analysis: </Text>
            {(() => {
              if(this.state.unitAnalysis == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("unitAnalysis")}>
                  <Text style= {styles.buttonText}> {this.state.unitAnalysis} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.unitAnalysis == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("unitAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.unitAnalysis} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.unitAnalysis == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("unitAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.unitAnalysis} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Unit Design */}
          <View style={styles.row}>
            <Text style={styles.left}>Design: </Text>
            {(() => {
              if(this.state.unitDesign == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("unitDesign")}>
                  <Text style= {styles.buttonText}> {this.state.unitDesign} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.unitDesign == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("unitDesign")}>
                    <Text style= {styles.buttonText}> {this.state.unitDesign} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.unitDesign == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("unitDesign")}>
                    <Text style= {styles.buttonText}> {this.state.unitDesign} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Unit Monitoring */}
          <View style={styles.row}>
            <Text style={styles.left}>Monitoring: </Text>
            {(() => {
              if(this.state.unitMonitoring == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("unitMonitoring")}>
                  <Text style= {styles.buttonText}> {this.state.unitMonitoring} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.unitMonitoring == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("unitMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.unitMonitoring} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.unitMonitoring == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("unitMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.unitMonitoring} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Unit Testing Start & End Date */}
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date Start: </Text>
            <TouchableOpacity onPress={this.onShowUnitStart}>
              <Text style={styles.dateText}> {this.state.unitDateStart.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showUnitStartCalendar && (
                <DateTimePicker
                value={this.state.unitDateStart}
                mode= "date"
                display="default"
                onChange={this.onChangeUnitStart}
                />
              )}  
          </View>
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date End: </Text>
            <TouchableOpacity onPress={this.onShowUnitEnd}>
              <Text style={styles.dateText}> {this.state.unitDateEnd.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showUnitEndCalendar && (
                <DateTimePicker
                value={this.state.unitDateEnd}
                minimumDate={this.state.unitDateStart.getTime() + 86400000}
                mode= "date"
                display="default"
                onChange={this.onChangeUnitEnd}
                />
              )}  
          </View>
        </View>

        {/* Integration Testing */}
        <View style={styles.stages}>
          <Text style= {styles.stageTitle}>Integration Testing</Text>
          {/* Integration Planning */}
          <View style={styles.row}>
            <Text style={styles.left}>Planning: </Text>
            {(() => {
              if(this.state.integrationPlanning == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("integrationPlanning")}>
                  <Text style= {styles.buttonText}> {this.state.integrationPlanning} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.integrationPlanning == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("integrationPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.integrationPlanning} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.integrationPlanning == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("integrationPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.integrationPlanning} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Integration Analysis */}
          <View style={styles.row}>
            <Text style={styles.left}>Analysis: </Text>
            {(() => {
              if(this.state.integrationAnalysis == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("integrationAnalysis")}>
                  <Text style= {styles.buttonText}> {this.state.integrationAnalysis} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.integrationAnalysis == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("integrationAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.integrationAnalysis} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.integrationAnalysis == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("integrationAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.integrationAnalysis} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Integration Design */}
          <View style={styles.row}>
            <Text style={styles.left}>Design: </Text>
            {(() => {
              if(this.state.integrationDesign == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("integrationDesign")}>
                  <Text style= {styles.buttonText}> {this.state.integrationDesign} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.integrationDesign == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("integrationDesign")}>
                    <Text style= {styles.buttonText}> {this.state.integrationDesign} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.integrationDesign == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("integrationDesign")}>
                    <Text style= {styles.buttonText}> {this.state.integrationDesign} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Integration Monitoring */}
          <View style={styles.row}>
            <Text style={styles.left}>Monitoring: </Text>
            {(() => {
              if(this.state.integrationMonitoring == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("integrationMonitoring")}>
                  <Text style= {styles.buttonText}> {this.state.integrationMonitoring} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.integrationMonitoring == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("integrationMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.integrationMonitoring} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.integrationMonitoring == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("integrationMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.integrationMonitoring} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* Integration Testing Start & End Date */}
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date Start: </Text>
            <TouchableOpacity onPress={this.onShowIntegrationStart}>
              <Text style={styles.dateText}> {this.state.integrationDateStart.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showIntegrationStartCalendar && (
                <DateTimePicker
                value={this.state.integrationDateStart}
                mode= "date"
                display="default"
                onChange={this.onChangeIntegrationStart}
                />
              )}  
          </View>
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date End: </Text>
            <TouchableOpacity onPress={this.onShowIntegrationEnd}>
              <Text style={styles.dateText}> {this.state.integrationDateEnd.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showIntegrationEndCalendar && (
                <DateTimePicker
                value={this.state.integrationDateEnd}
                minimumDate={this.state.integrationDateStart.getTime() + 80400000}
                mode= "date"
                display="default"
                onChange={this.onChangeIntegrtaionEnd}
                />
              )}  
          </View>
        </View>

        {/* System Testing */}
        <View style={styles.stages}>
          <Text style={styles.stageTitle}>System Testing</Text>
           {/* System Planning */}
           <View style={styles.row}>
            <Text style={styles.left}>Planning: </Text>
            {(() => {
              if(this.state.systemPlanning == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("systemPlanning")}>
                  <Text style= {styles.buttonText}> {this.state.systemPlanning} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.systemPlanning == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("systemPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.systemPlanning} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.systemPlanning == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("systemPlanning")}>
                    <Text style= {styles.buttonText}> {this.state.systemPlanning} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* System Analysis */}
          <View style={styles.row}>
            <Text style={styles.left}>Analysis: </Text>
            {(() => {
              if(this.state.systemAnalysis == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("systemAnalysis")}>
                  <Text style= {styles.buttonText}> {this.state.systemAnalysis} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.systemAnalysis == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("systemAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.systemAnalysis} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.systemAnalysis == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("systemAnalysis")}>
                    <Text style= {styles.buttonText}> {this.state.systemAnalysis} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* System Design */}
          <View style={styles.row}>
            <Text style={styles.left}>Design: </Text>
            {(() => {
              if(this.state.systemDesign == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("systemDesign")}>
                  <Text style= {styles.buttonText}> {this.state.systemDesign} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.systemDesign == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("systemDesign")}>
                    <Text style= {styles.buttonText}> {this.state.systemDesign} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.systemDesign == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("systemDesign")}>
                    <Text style= {styles.buttonText}> {this.state.systemDesign} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* System Monitoring */}
          <View style={styles.row}>
            <Text style={styles.left}>Monitoring: </Text>
            {(() => {
              if(this.state.systemMonitoring == 'NOT DONE'){
                return(
                <TouchableOpacity 
                  style={styles.buttonRed} 
                  onPress={() => this.onPress("systemMonitoring")}>
                  <Text style= {styles.buttonText}> {this.state.systemMonitoring} </Text>
                </TouchableOpacity>
                )
              } else if (this.state.systemMonitoring == 'IN PROGRESS'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonYellow} 
                    onPress={() => this.onPress("systemMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.systemMonitoring} </Text>
                  </TouchableOpacity>
                )
              } else if (this.state.systemMonitoring == 'DONE'){
                return(
                  <TouchableOpacity 
                    style={styles.buttonGreen} 
                    onPress={() => this.onPress("systemMonitoring")}>
                    <Text style= {styles.buttonText}> {this.state.systemMonitoring} </Text>
                  </TouchableOpacity>
                )
              }
            })()}
          </View>
          {/* System Testing Start & End Date */}
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date Start: </Text>
            <TouchableOpacity onPress={this.onShowSystemStart}>
              <Text style={styles.dateText}> {this.state.systemDateStart.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showSystemStartCalendar && (
                <DateTimePicker
                value={this.state.systemDateStart}
                mode= "date"
                display="default"
                onChange={this.onChangeSystemStart}
                />
              )}  
          </View>
          <View style={styles.row}>
            <Text style={styles.dateLeft}>Date End: </Text>
            <TouchableOpacity onPress={this.onShowSystemEnd}>
              <Text style={styles.dateText}> {this.state.systemDateEnd.toLocaleDateString('en-US', {weekday:'long', month: 'long', year: 'numeric', day: 'numeric'})}</Text>
            </TouchableOpacity>
              {this.state.showSystemEndCalendar && (
                <DateTimePicker
                value={this.state.systemDateEnd}
                minimumDate={this.state.systemDateStart.getTime() + 80400000}
                mode= "date"
                display="default"
                onChange={this.onChangeSystemEnd}
                />
              )}  
          </View>
        </View>
      </ScrollView>
    );
  }
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