const AppDispatcher = require('../dispatcher/dispatcher.js'),
      FeedApiUtil = require('../utils/feed_api_util'),
      FeedConstants = require('../constants/feed_constants');

const FeedActions = {

  /* CLIENT UI INITIATED ACTIONS */

  createFeedSource(feedSourceUrl) {
    FeedApiUtil.createFeedSource(feedSourceUrl, FeedActions.receiveFeedSource)
  },

  fetchAll() {
    FeedApiUtil.fetchAll(FeedActions.receiveFeedSources);
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
  }


};

module.exports = FeedActions;