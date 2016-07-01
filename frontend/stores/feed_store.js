const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      FeedConstants = require('../constants/feed_constants'),
      StoreUtil = require('../utils/store_util');

const FeedStore = new Store(AppDispatcher);

let _feeds = {};

function setFeed(newFeed) {
  // _feeds[newFeed]
  _feeds[parseInt(newFeed.id)] = newFeed
  FeedStore.__emitChange();
}

function resetFeeds(feedSources) {
  _feeds = {};
  Object.keys(feedSources).map(id => {
    _feeds[id] = feedSources[id];
  });
  FeedStore.__emitChange();
}

FeedStore.all = function() {
  // TODO: Return copy of object
  // return StoreUtil.cloneObject(_feeds);
  return _feeds;
};

FeedStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FeedConstants.RECEIVE_FEED_SOURCE:
      setFeed(payload.feedSource);
      break;
    case FeedConstants.RECEIVE_FEED_SOURCES:
      resetFeeds(payload.feedSources);
      break;
    default:
      break; 
  }
};

module.exports = FeedStore;
