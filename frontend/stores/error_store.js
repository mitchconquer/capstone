const React = require('react');
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

let _errors = [];
let _form;
let _errorBatch;

const ErrorStore = new Store(AppDispatcher);

ErrorStore.formErrors = function(form) {
  if (form === _form) {
    return Object.assign({}, _errors);
    clearErrors();
  }
};

ErrorStore.form = function() {
  return `${_form}`;
};

function setErrors(form, errors, errorBatch) {
  _form = form;
  _errors = errors.map(errorMsg => {
    return { errorMsg: errorMsg, errorBatch: errorBatch }
  });
  _errorBatch = errorBatch;
  ErrorStore.__emitChange();
}

function clearErrors() {
  _form = "";
  _errors = [];
  _errorBatch = "";
  // ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      setErrors(payload.form, payload.errors, payload.errorBatch);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      clearErrors();
      break;
    default: 
      break;
  }
};

module.exports = ErrorStore;