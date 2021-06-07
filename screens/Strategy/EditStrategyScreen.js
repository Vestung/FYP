import React from 'react';
import EditStrategyForm from './EditStrategyForm';

export default class EditStrategyScreen extends React.Component {
  handleSubmit = formState => {
    this.props.route.params.editStrategy(this.props.route.params.id, formState)
    this.props.navigation.navigate('List of Strategies');
  };

  render() {
    return <EditStrategyForm 
    onSubmit={this.handleSubmit} 
    title={this.props.route.params.title}
    content={this.props.route.params.content}
    />;
  }
}