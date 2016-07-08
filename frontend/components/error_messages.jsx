const React = require('react'),
      Alert = require('react-bootstrap').Alert,
      ErrorStore = require('../stores/error_store'),
      ErrorMessageItem = require('./error_message_item');

const ErrorMessages = React.createClass({
  getInitialState() {
    return ({
          errorMessages: {}
        });
  },

  componentDidMount() {
    this.errorStoreListener = ErrorStore.addListener(this._errorStoreChange);  
  },

  componentWillUnmount() {
    this.errorStoreListener.remove();  
  },

  _errorStoreChange() {
    this.setState({ errorMessages: ErrorStore.formErrors('general') });
  },

  errorItems() {
    if (Object.keys(this.state.errorMessages).length > 0) {
      return Object.keys(this.state.errorMessages).map(msgId => {
        return <ErrorMessageItem key={this.state.errorMessages[msgId]} msg={this.state.errorMessages[msgId]} />;
      });
    }
  },

  render() {
    return (
      <div className="all-alerts">
        {this.errorItems()}
      </div>
    );
  }
});

module.exports = ErrorMessages;