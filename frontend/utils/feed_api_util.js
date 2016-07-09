const ErrorActions = require('../actions/error_actions');

module.exports = {
  createFeedSource(feedSourceUrl, folderId, successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'POST',
      dataType: 'json',
      data: { url: feedSourceUrl, folderId: folderId },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'GET',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  refreshFeedSource(feedSourceId, successCallback) {
    $.ajax({
      url: `api/feeds/${feedSourceId}`,
      method: 'GET',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  unsubscribe(feedSourceId, folderId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}/feeds/${feedSourceId}`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }
};