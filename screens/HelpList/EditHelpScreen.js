import React from 'react';
import EditHelpForm from './EditHelpForm';

export default class EditStrategyScreen extends React.Component {
  handleSubmit = formState => {
    this.props.route.params.editHelp(this.props.route.params.id, formState)
    this.props.navigation.navigate('FAQ');
  };

  render() {
    return <EditHelpForm 
    onSubmit={this.handleSubmit} 
    title={this.props.route.params.title}
    content={this.props.route.params.content}
    />;
  }
}