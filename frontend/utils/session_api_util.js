const React = require('react');

const SessionApiUtil = {
  
  /**
   * Creates a new user and logs them in
   * @param {object} user - {user: {username: username, password: password}}
   * @param {function} success - success callback
   * @param {function} error - error callback
   */
  signup(user, success, error) {
    $.ajax({
      url: '/api/users/',
      method: 'POST',
      dataType: 'JSON',
      data: user,
      success: success,
      error: error
    });
  },

  /**
   * Logs user in
   * @param {object} user - {user: {username: username, password: password}}
   * @param {function} success - success callback
   * @param {function} error - error callback
   */
  login(user, success, error) {
    $.ajax({
      url: '/api/session/',
      method: 'POST',
      dataType: 'JSON',
      data: user,
      success: success,
      error: error
    });
  },

  /**
   * Logs user out
   * @param {object} user - {user: {username: username, password: password}}
   * @param {function} success - success callback
   * @param {function} error - error callback
   */
  logout(user, success, error) {
    $.ajax({
      url: '/api/session/',
      method: 'DELETE',
      dataType: 'JSON',
      data: user,
      success: success,
      error: error
    });    
  }
};

module.exports = SessionApiUtil;