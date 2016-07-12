const FeedItemActions = require('../actions/feed_item_actions'),
      ErrorActions = require('../actions/error_actions');

module.exports = {
  create(feedItem, successCallback) {
    $.ajax({
      url: `api/items/${feedItem}`,
      method: 'POST',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },
  
  refreshFeedSource(feedSourceId, feedSourceIds, successCallback) {
    $.ajax({
      url: `api/feeds/${feedSourceId}/refresh`,
      method: 'GET',
      dataType: 'json',
      data: { feed_sources: feedSourceIds },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },
  
  loadNextPage(feedSourceIds, page, successCallback) {
    $.ajax({
      url: `api/feeds/next`,
      method: 'GET',
      dataType: 'json',
      data: { feed_sources: feedSourceIds, page: page },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  delete(feedItemId, successCallback) {
    $.ajax({
      url: `api/items/${feedItemId}`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(feedSourceIds, successCallback) {
    $.ajax({
      url: 'api/feed_items/',
      method: 'GET',
      dataType: 'json',
      data: { feed_sources: feedSourceIds },
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }
};