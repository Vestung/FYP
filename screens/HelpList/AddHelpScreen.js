import React from 'react';
import AddHelpForm from './AddHelpForm';

export default class AddHelpScreen extends React.Component {
  handleSubmit = formState => {
    this.props.route.params.addHelp(formState);
    this.props.navigation.navigate('FAQ');
  };

  render() {
    return <AddHelpForm onSubmit={this.handleSubmit} />;
  }
}