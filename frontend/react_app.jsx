import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');

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