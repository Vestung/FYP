import React from 'react'
import {ScrollView, Button, StyleSheet, TextInput, View,} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 100,
      marginTop: 20,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3,
      },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      minWidth: 100,
      marginTop: 20,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 3,
      height: 400,
      textAlignVertical: 'top'
    },
    scrollview: {
      paddingHorizontal: 20
    },
    button: {
      flex: 1,
      position: 'absolute',
      bottom:0
    }
  });

export default class AddStrategyScreen extends React.Component {
    state = {
        title: '',
        content:'',
        isFormValid: false,
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.title !== prevState.title || this.state.content !== prevState.content) {
        this.validateForm()
      }
    }

    getHandler = key => val => {
        this.setState({ [key]: val });
      };

    handleSubmit = () => {
        this.props.onSubmit(this.state);
      };

    validateForm = () => {
        if (+this.state.title.length >= 2 && this.state.content.length >= 2) {
          this.setState({isFormValid: true})
        } else {
          this.setState({isFormValid: false})
      }
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={styles.scrollView}> 
            <TextInput
                style={styles.title}
                value={this.state.title}
                onChangeText={this.getHandler('title')}
                placeholder="Add new Title here"
            />
            <TextInput
                multiline
                style={styles.input}
                value={this.state.content}
                onChangeText={this.getHandler('content')}
                placeholder="Add new Content here"
            />
            </ScrollView>
            <Button 
              style={styles.button}
                title="Submit"
                onPress={this.handleSubmit}
                disabled={!this.state.isFormValid}
            />
            </View>
        )
    }
}