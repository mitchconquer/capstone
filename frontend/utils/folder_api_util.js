const ErrorActions = require('../actions/error_actions');

module.exports = {
  create(folder, successCallback) {
    $.ajax({
      url: `api/folders`,
      dataType: 'json',
      method: 'POST',
      data: {folder: folder},
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  update(folder, successCallback) {
    $.ajax({
      url: `api/folders/${folder.id}`,
      dataType: 'json',
      method: 'PATCH',
      data: {folder: folder},
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  unsubscribe(folderId, feedSourceId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}/feeds/${feedSourceId}`,
      dataType: 'json',
      method: 'DELETE',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  subscribe(folderId, feedSourceId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}/feeds/${feedSourceId}`,
      dataType: 'json',
      method: 'POST',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  delete(folderId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}`,
      dataType: 'json',
      method: 'DELETE',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: `api/folders`,
      dataType: 'json',
      method: 'GET',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetch(folderId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}`,
      dataType: 'json',
      method: 'GET',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }

};