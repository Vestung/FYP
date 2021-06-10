import React from 'react';
import { ScrollView, StyleSheet , View, Text,Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize:21,
    padding:10,
    marginBottom:10,
  },
  content: {
    fontSize:20
  },
  button: {
    flex: 1,
    position: 'absolute',
    bottom:0
  },
  scrollview: {
    paddingHorizontal: 20
  },
});

export default class DetailsScreen extends React.Component{
    render(){
      return (
        <View style = {styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{this.props.route.params.title}</Text>
            <Text style={styles.content}>{this.props.route.params.content}</Text>
            <Text style={styles.content}>{this.props.route.params.id}</Text>
          </ScrollView>
          <Button style={styles.button} onPress={() => this.props.navigation.navigate('Edit Question', {
            id: this.props.route.params.id,
            title: this.props.route.params.title,
            content: this.props.route.params.content,
            editHelp: this.props.route.params.editHelp             
            })}
            title="Edit Question"
            />
        </View>
      );
    }
  }