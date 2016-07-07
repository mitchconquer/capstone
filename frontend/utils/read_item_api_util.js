const ReadItemActions = require('../actions/read_item_actions'),
      ErrorActions = require('../actions/error_actions');

module.exports = {
  create(readItem, successCallback) {
    $.ajax({
      url: `api/read_items`,
      method: 'POST',
      dataType: 'json',
      data: { read_item: readItem },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  delete(readItemId, successCallback) {
    $.ajax({
      url: `api/read_items/${readItemId}`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: `api/read_items`,
      method: 'GET',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }
};