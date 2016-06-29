const AppDispatcher = require('../dispatcher/dispatcher');
const SessionApiUtil = require('../utils/session_api_util');
const SessionConstants = require('../constants/session_constants');

const SessionActions = {
  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  signup(formData, errorCallback) {
    SessionApiUtil.signup(formData, this.receiveCurrentUser, errorCallback);
  },

  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  login(formData, errorCallback) {
    SessionApiUtil.login(formData, this.receiveCurrentUser, errorCallback);
  },

  /**
  * @param {object} formData - {user: {username: username, password: password}}
  */
  logout(formData, errorCallback) {
    SessionApiUtil.logout(formData, this.receiveCurrentUser, errorCallback);
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