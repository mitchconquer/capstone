const AppDispatcher = require('../dispatcher/dispatcher');
// const SessionApiUtil = require('../utils/session_api_util');
const ErrorConstants = require('../constants/error_constants');

const ErrorActions = {
  setErrors(xhrResponse) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: xhrResponse.responseJSON.errors,
      form: xhrResponse.responseJSON.form,
      errorBatch: xhrResponse.responseJSON.errorBatch ? xhrResponse.responseJSON.errorBatch : ""
    });
  },

  clearErrors() {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  },
};

module.exports = ErrorActions;