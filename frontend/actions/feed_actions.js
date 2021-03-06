const AppDispatcher = require('../dispatcher/dispatcher.js'),
      FeedApiUtil = require('../utils/feed_api_util'),
      FeedConstants = require('../constants/feed_constants');

const FeedActions = {

  /* CLIENT UI INITIATED ACTIONS */

  createFeedSource(feedSourceUrl, folderId) {
    FeedApiUtil.createFeedSource(feedSourceUrl, folderId, FeedActions.receiveFeedSource);
  },

  fetchAll() {
    FeedApiUtil.fetchAll(FeedActions.receiveFeedSources);
  },

  refreshFeedSources(feedSourceIds) {
    // Make a call for each one to the API with a success function
    feedSourceIds.forEach(id => {
      FeedApiUtil.refreshFeedSource(id, FeedActions.receiveFeedSource);
    });
  },

  filter(filterText) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.FILTER_FEEDS,
      filterText: filterText
    });
  },

  /* SERVER RESPONSE ACTIONS */

  receiveFeedSource(feedSource) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.RECEIVE_FEED_SOURCE,
      feedSource: feedSource
    });
  },

  receiveFeedSources(feedSources) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.RECEIVE_FEED_SOURCES,
      feedSources: feedSources
    });
  },

  removeFeedSource(feedSourceIds) {
    AppDispatcher.dispatch({
      actionType: FeedConstants.REMOVE_FEED_SOURCES,
      feedSourceIds: feedSourceIds
    });
  }


};

module.exports = FeedActions;