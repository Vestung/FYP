import React from 'react';
import AddStrategyForm from './AddStrategyForm';

export default class AddStrategyScreen extends React.Component {
  handleSubmit = formState => {
    this.props.route.params.addStrategy(formState);
    this.props.navigation.navigate('Strategy List');
  };

  render() {
    return <AddStrategyForm onSubmit={this.handleSubmit} />;
  }
}