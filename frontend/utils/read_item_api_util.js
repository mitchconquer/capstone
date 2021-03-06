const ReadItemActions = require('../actions/read_item_actions'),
      ErrorActions = require('../actions/error_actions');

module.exports = {
  create(readItem, successCallback) {
    $.ajax({
      url: `api/items/${readItem}/mark_read`,
      method: 'POST',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  delete(readItemId, successCallback) {
    $.ajax({
      url: `api/items/${readItemId}/mark_unread`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: `api/items/read`,
      method: 'GET',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  markAllRead(readItemIds, successCallback) {
    $.ajax({
      url: `api/items/read`,
      method: 'POST',
      dataType: 'json',
      data: { feed_items: readItemIds },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  markAllUnread(readItemIds, successCallback) {
    $.ajax({
      url: `api/items/unread`,
      method: 'DELETE',
      dataType: 'json',
      data: { feed_items: readItemIds },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }
};