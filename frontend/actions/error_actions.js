const AppDispatcher = require('../dispatcher/dispatcher');
// const SessionApiUtil = require('../utils/session_api_util');
const ErrorConstants = require('../constants/error_constants');

const ErrorActions = {
  setErrors(xhrResponse) {
    console.log('ErrorActions#setErrors');
    console.log(xhrResponse);
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: xhrResponse.responseJSON.errors,
      form: xhrResponse.responseJSON.form
    });
    console.log({
      actionType: ErrorConstants.SET_ERRORS,
      errors: xhrResponse.responseJSON.errors,
      form: xhrResponse.responseJSON.form
    });
  },

  clearErrors() {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  },
};

module.exports = ErrorActions;