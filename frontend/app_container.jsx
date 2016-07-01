import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const SessionApiUtil = require('./utils/session_api_util');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const ErrorStore = require('./stores/error_store');
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const UserAccountLink = require('./components/user_account_link');
const ReactApp = require('./components/react_app');
const EditFeeds = require('./components/edit_feeds');
const FeedItemIndex = require('./components/feed_item_index');
const NotFound = require('./components/not_found');
const MainContent = require('./components/main_content');

const AppContainer = React.createClass({
  render() {
    return (
      <div className="container-fluid app-columns folder-index">
        {this.props.children}
      </div>
    );
  }
});

function _ensureLoggedIn(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
   replace('/login');
  }
}

const routes = (
  <Route path="/" component={AppContainer}>
    <Route onEnter={_ensureLoggedIn} component={ReactApp} >
      <IndexRoute onEnter={_ensureLoggedIn} component={FeedItemIndex} />
      <Route onEnter={_ensureLoggedIn} path="feeds" component={FeedItemIndex} />
      <Route onEnter={_ensureLoggedIn} path="edit" component={EditFeeds} />
    </Route>
    <Route path="login" component={LoginForm} />
    <Route path="signup" component={SignupForm} />
    <Route path='*' component={NotFound} />
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