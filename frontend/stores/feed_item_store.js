const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      FeedItemConstants = require('../constants/read_item_constants');

// NOTE: THIS STORE USES *MAPS* NOT OBJECTS TO STORE DATA

let _feedItems = new Map();

// Rails API should pass back array of FeedItems
function reset(feedItems) {
  _feedItems.clear();
  feedItems.forEach(feedItem => {
    _feedItems.set(feedItem.id, feedItem);
  });
  FeedItemStore.__emitChange();
  console.log('_feedItems is now:')
  console.log(_feedItems.entries());
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
  return _feedItems;
};

// FeedItemStore.find = function(id) {
//   return Object.assign({}, _feedItems.get(id));
// };

FeedItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case "RECEIVE_FEED_ITEMS":
    reset(payload.feedItems);
    break;
  // case FeedItemConstants.RECEIVE_FEED_ITEM:
  //   set(payload.feedItem);
  //   break;
  case FeedItemConstants.REMOVE_FEED_ITEM:
    remove(payload.feedItemId);
    break;
  default:
    break;
  }
};

module.exports = FeedItemStore;