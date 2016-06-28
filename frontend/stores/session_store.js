const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

/**
* Stores the current logged in user
* {username: username, id: id, session_token: session_token}
**/
let _currentUser = {};

const _login = function(user) {
  _currentUser = user;
  SessionStore.__emitChange();
};

const _logout = function() {
  _currentUser = {};
  SessionStore.__emitChange();
};

const SessionStore = new Store(AppDispatcher);

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function() {
  if (_currentUser.id) {
    return true;
  }
  return false;
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case SessionConstants.LOGIN:
    _login(payload.user);
    break;
  case SessionConstants.LOGOUT:
    _logout();
    break;
  default:
    break;
  }
};

module.exports = SessionStore;