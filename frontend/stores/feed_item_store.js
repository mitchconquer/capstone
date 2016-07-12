const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      FeedItemConstants = require('../constants/feed_item_constants');

// NOTE: THIS STORE USES *MAPS* NOT OBJECTS TO STORE DATA

let _feedItems = new Map();

// Rails API passes back array of FeedItems
function reset(feedItems) {
  _feedItems.clear();
  feedItems.forEach(feedItem => {
    _feedItems.set(feedItem.id, feedItem);
  });
  FeedItemStore.__emitChange();
}

// Rails API passes back array of FeedItems
function add(feedItems) {
  console.log('FeedItemStore#add');
  console.log(feedItems);
  feedItems.forEach(feedItem => {
    _feedItems.set(feedItem.id, feedItem);
  });
  FeedItemStore.__emitChange();
}

function set(feedItem) {
  let feedItemId = Object.keys(feedItem)[0];
  _feedItems.set(feedItemId, feedItem[feedItemId]);
  FeedItemStore.__emitChange();
}

function remove(feedItemId) {
  _feedItems.delete(feedItemId);
  FeedItemStore.__emitChange();
}

const FeedItemStore = new Store(AppDispatcher);

FeedItemStore.all = function() {
  let result = new Map();
  _feedItems.forEach(item => {
    result.set(item.id, item);
  });
  return result;
};

FeedItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case FeedItemConstants.RECEIVE_FEED_ITEMS:
    reset(payload.feedItems);
    break;
  case FeedItemConstants.ADD_FEED_ITEMS:
    add(payload.feedItems);
    break;
  case FeedItemConstants.REMOVE_FEED_ITEM:
    remove(payload.feedItemId);
    break;
  default:
    break;
  }
};

module.exports = FeedItemStore;