const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      FeedItemConstants = require('../constants/feed_item_constants');

// NOTE: THIS STORE USES *MAPS* NOT OBJECTS TO STORE DATA

let _feedItems = new Map();
let _filteredFeeds = new Map();
let _filterText = "";

// Rails API passes back array of FeedItems
function reset(feedItems) {
  _feedItems.clear();
  feedItems.forEach(feedItem => {
    _feedItems.set(feedItem.id, feedItem);
  });
  _filteredFeeds = copyStore();
  filter(_filterText);
  FeedItemStore.__emitChange();
}

// Rails API passes back array of FeedItems
function add(feedItems) {
  feedItems.forEach(feedItem => {
    _feedItems.set(feedItem.id, feedItem);
  });
  _filteredFeeds = copyStore();
  filter(_filterText);
  FeedItemStore.__emitChange();
}

function set(feedItem) {
  let feedItemId = Object.keys(feedItem)[0];
  _feedItems.set(feedItemId, feedItem[feedItemId]);
  _filteredFeeds = copyStore();
  filter(_filterText);
  FeedItemStore.__emitChange();
}

function remove(feedItemId) {
  _feedItems.delete(feedItemId);
  FeedItemStore.__emitChange();
}

function copyStore() {
  let result = new Map();
  _feedItems.forEach(item => {
    result.set(item.id, item);
  });
  return result;
}

function filter(filterText) {
  _filterText = filterText.trim().toLowerCase();
  if (_filterText) {
    _filteredFeeds = filteredFeedItems();
  } else {
    _filteredFeeds = copyStore();
  }
  FeedItemStore.__emitChange();
}

function filteredFeedItems() {
  let filteredItems = new Map();
  _feedItems.forEach(item => {
    if (containsMatch(item)) {
      filteredItems.set(item.id, item);
    }
  });
  return filteredItems;
}

function containsMatch(feedItem) {
  const title = feedItem.title.toLowerCase();
  let description;
  
  if (feedItem.description) {
    description = feedItem.description.toLowerCase();
  } else {
    description = "";
  }

  let titleHas = false,
      descriptionHas = false;

  if (title.indexOf(_filterText) != -1) {
    titleHas = true;
  }

  if (description.indexOf(_filterText) != -1) {
    descriptionHas = true;
  }

  if (titleHas || descriptionHas) {
    return true;
  }

  return false;
}

const FeedItemStore = new Store(AppDispatcher);

FeedItemStore.filtering = function() {
  return _filterText.length > 0;
}

FeedItemStore.all = function() {
  let result = new Map();
  _filteredFeeds.forEach(item => {
    result.set(item.id, item);
  });
  return result;
};

FeedItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case FeedItemConstants.RECEIVE_FEED_ITEMS:
    reset(payload.feedItems);
    break;
  case FeedItemConstants.FILTER_FEEDS:
    filter(payload.filterText);
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