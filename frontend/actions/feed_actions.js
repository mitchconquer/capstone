const AppDispatcher = require('../dispatcher/dispatcher.js'),
      FeedApiUtil = require('../utils/feed_api_util'),
      FeedConstants = require('../constants/feed_constants');

const FeedActions = {

  /* CLIENT UI INITIATED ACTIONS */

  createFeedSource(feedSourceUrl) {
    FeedApiUtil.createFeedSource(feedSourceUrl, FeedActions.receiveFeedSource)
  },

  /* SERVER RESPONSE ACTIONS */

  receiveFeedSource(feedSource) {
    console.log('Logging response from server from FeedActions#receiveFeedSource');
    console.log(feedSource);
    // alert(feedSource);
    AppDispatcher.dispatch({
      actionType: FeedConstants.RECEIVE_FEED_SOURCE,
      feedSource: feedSource
    });
  }
};

module.exports = FeedActions;