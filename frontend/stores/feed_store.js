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

function removeFeeds(feedSourceIds) {
  feedSourceIds.forEach(id => {
    delete _feeds[id];
  });
  FeedStore.__emitChange();
}

FeedStore.all = function() {
  // TODO: Return copy of object
  // return StoreUtil.cloneObject(_feeds);
  return Object.assign({}, _feeds);
};

/*
* Return an object of specific feedSource items
* feedSourceIds {Array}
*/
FeedStore.getFeeds = function(feedSourceIds) {
  let feedSources = {};
  feedSourceIds.forEach(id =>{
    feedSources[id] = _feeds[id];
  });
  return feedSources;
};

/*
* Return array of feed items based on feedSource id's
* feedSourceIds {Array}
*/
FeedStore.getFeedItems = function(feedSourceIds) {
  if (feedSourceIds.length === 0) {
    return;
  }
  
  let feeds = [];
  feedSourceIds.forEach(id => {
    if (_feeds[id].feedItems){
      Object.keys(_feeds[id].feedItems).forEach(itemId => {
        feeds.push(_feeds[id].feedItems[itemId]);
      });
    }
  });
  return feeds;
};

FeedStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FeedConstants.RECEIVE_FEED_SOURCE:
      setFeed(payload.feedSource);
      break;
    case FeedConstants.RECEIVE_FEED_SOURCES:
      resetFeeds(payload.feedSources);
      break;
    case FeedConstants.REMOVE_FEED_SOURCES:
      removeFeeds(payload.feedSourceIds);
      break;
    default:
      break; 
  }
};

module.exports = FeedStore;
