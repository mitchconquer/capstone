const React = require('react'),
      Alert = require('react-bootstrap').Alert,
      ErrorStore = require('../stores/error_store'),
      ErrorMessageItem = require('./error_message_item');

const ErrorMessages = React.createClass({
  getInitialState() {
    return ({
          errorMessages: []
        });
  },

  componentDidMount() {
    this.errorStoreListener = ErrorStore.addListener(this._errorStoreChange);  
  },

  componentWillUnmount() {
    this.errorStoreListener.remove();  
  },

  _errorStoreChange() {
    console.log('ErrorMessages#_errorStoreChange()');
    let errors = ErrorStore.formErrors('general');
    if (Object.keys(errors).length > 0) {
      let error_msgs = Object.keys(errors).map(id => {
        return errors[id];
      });
      this.setState({ errorMessages: this.state.errorMessages.concat(error_msgs) });
    }
  },

  errorItems() {
    if (Object.keys(this.state.errorMessages).length > 0) {
      return Object.keys(this.state.errorMessages).map(msgId => {
        return <ErrorMessageItem key={this.state.errorMessages[msgId] + Math.random()} msg={this.state.errorMessages[msgId]} />;
      });
    }
  },

  render() {
    console.log('ErrorMessages rerendering');
    return (
      <div className="all-alerts">
        {this.errorItems()}
      </div>
    );
  }
});

module.exports = ErrorMessages;