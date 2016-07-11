const AppDispatcher = require('../dispatcher/dispatcher'),
      FeedItemApiUtil = require('../utils/feed_item_api_util'),
      FeedItemConstants = require('../constants/feed_item_constants');

const FeedItemActions = {

  /* UI-INITIATED ACTIONS */

  /**
  * Gets paginated collection of feed items
  * feedSourceIds {Array}
  */
  fetchAll(feedSourceIds) {
    FeedItemApiUtil.fetchAll(feedSourceIds, FeedItemActions.receiveFeedItems);
  },

  /* SERVER-INITIATED ACTIONS */

  receiveFeedItem(feedItem) {
    AppDispatcher.dispatch({
      actionType: FeedItemConstants.RECEIVE_FEED_ITEM,
      feedItem: feedItem
    });
  },

  refreshFeedSources(feedSourceIds) {
    // Make a call for each one to the API with a success function
    feedSourceIds.forEach(id => {
      console.log('refreshFeedSources called for ' + id);
      FeedItemApiUtil.refreshFeedSource(id, feedSourceIds, FeedItemActions.receiveFeedItems);
    });
  },

  receiveFeedItems(response) {
    // console.log('receiveFeedItems called with');
    // console.log(response);
    AppDispatcher.dispatch({
      actionType: FeedItemConstants.RECEIVE_FEED_ITEMS,
      feedItems: response.feedItems
    });
  },

  removeFeedItem(response) {
    AppDispatcher.dispatch({
      actionType: FeedItemConstants.REMOVE_FEED_ITEM,
      feedItemId: response
    });
  }

};

module.exports = FeedItemActions;