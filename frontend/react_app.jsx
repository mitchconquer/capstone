import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const SessionApiUtil = require('./utils/session_api_util');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const ErrorStore = require('./stores/error_store');
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
// const LogInLink = require('./components/login_link');
const UserAccountLink = require('./components/user_account_link');

const App = React.createClass({
  render() {
    return (
      <div>
        <header><UserAccountLink /></header>
        <h1>React App</h1>
        {this.props.children}
      </div>
    );
  }
});

const Welcome = React.createClass({
  render() {
    return (
      <div>
        <h1>WELCOME!</h1>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="login" component={LoginForm} />
    <Route path="signup" component={SignupForm} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>, document.getElementById('content'));
});

window.SessionApiUtil = SessionApiUtil;
window.SessionActions = SessionActions;
window.SessionStore = SessionStore;
window.ErrorStore = ErrorStore;