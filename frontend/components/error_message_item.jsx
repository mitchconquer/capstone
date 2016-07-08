import TimerMixin from 'react-timer-mixin';
const React = require('react'),
      Alert = require('react-bootstrap').Alert;

const ErrorMessageItem = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
      return {
          alertVisible: true  
      };
  },

  componentDidMount() {
    this.setTimeout(this.closeError, 7000);
  },

  closeError() {
    this.setState({ alertVisible: false });
  },
  render() {
    if (this.state.alertVisible) {
      return (
        <Alert className="error-msg" onDismiss={this.closeError}>
          <p>{this.props.msg}</p>
        </Alert>
      );
    }

    return (<i></i>);
  }
});

module.exports = ErrorMessageItem;