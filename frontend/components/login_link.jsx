const React = require('react');
import { Link } from 'react-router';
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const LoginLink = React.createClass({
  render() {
    return (
      <div>
        <Link to="/login">Login</Link>
      </div>
    );
  }
});

module.exports = LoginLink;