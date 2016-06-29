const AppDispatcher = require('../dispatcher/dispatcher');
const SessionApiUtil = require('../utils/session_api_util');
const SessionConstants = require('../constants/session_constants');
const ErrorActions = require('./error_actions');

const SessionActions = {
  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  signup(formData) {
    SessionApiUtil.signup(formData, this.receiveCurrentUser, ErrorActions.setErrors);
  },

  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  login(formData) {
    SessionApiUtil.login(formData, this.receiveCurrentUser, ErrorActions.setErrors);
  },

  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  logout(formData) {
    SessionApiUtil.logout(formData, this.receiveCurrentUser, ErrorActions.setErrors);
  },

  /**
  * @param {object} user - {user: {username: username, password: password}}
  */
  receiveCurrentUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },
};

module.exports = SessionActions;