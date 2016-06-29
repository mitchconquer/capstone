import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const SessionApiUtil = require('./utils/session_api_util');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');

const App = React.createClass({
  render() {
    return (
      <h1>React App</h1>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
  </Route>
);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Router history={hashHistory} >{routes}</Router>, document.getElementById('content'));
});

window.SessionApiUtil = SessionApiUtil;
window.SessionActions = SessionActions;
window.SessionStore = SessionStore;