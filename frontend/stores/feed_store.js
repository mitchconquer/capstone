const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      FeedConstants = require('../constants/feed_constants'),
      StoreUtil = require('../utils/store_util');

const FeedStore = new Store(AppDispatcher);

let _feeds = {};
let _filteredFeeds = _feeds;
let _filterText = "";

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
  _filteredFeeds = _feeds;
  filter(_filterText);
  FeedStore.__emitChange();
}

function removeFeeds(feedSourceIds) {
  feedSourceIds.forEach(id => {
    delete _feeds[id];
  });
  FeedStore.__emitChange();
}

function filter(filterText) {
  _filterText = filterText.trim();
  console.log('FeedStore._filterText is ' + _filterText);
  if (_filterText) {
    const filteredItems = filteredFeedItems(_filterText);
    console.log('FeedStores filteredFeedItems has ' + filteredItems.length + ' items');
    _filteredFeeds = createFilteredStore(filteredItems);
  } else {
    _filteredFeeds = _feeds;
    console.log('FeedStore reset to _feeds :D');
  }
  FeedStore.__emitChange();
}

function filteredFeedItems(filterText) {
  let filteredItems = [];
  console.log('FeedStore#filteredFeedItems _feeds has ' + Object.keys(_feeds).length + ' items');
  Object.keys(_feeds).forEach(feedSourceId => {
    const feedItems = FeedStore.getFeedItems([feedSourceId]);
    if (feedItems.length > 0) {
      feedItems.forEach(feedItem => {
        // const feedItem = _feeds[feedSourceId].feedItems[feedItemId];
        if (feedItem.title.search(filterText) != -1 || feedItem.description.search(filterText) != -1) {
          filteredItems.push(feedItem);
        }
      });
    }
  });
  return filteredItems;
}

/*
* Constructs and returns a _filteredFeed object from an array of feed item objects
* feedItems {Array} 
*/
function createFilteredStore(feedItems) {
  if (feedItems.length < 1) {
    return {};
  }

  let filteredFeedStore = {};
  feedItems.forEach(feedItem => {
    const sourceId = feedItem.feedSourceId;
    if (filteredFeedStore[sourceId]) {
      filteredFeedStore[sourceId].feedItems[feedItem.id] = feedItem;
    } else {
      let feedSource = _feeds[sourceId];
      feedSource.feedItems = {};
      filteredFeedStore[sourceId] = feedSource;
    }
  });
  return filteredFeedStore;
}

FeedStore.all = function() {
  return Object.assign({}, _filteredFeeds);
};

/*
* Return an object of specific feedSource items
* feedSourceIds {Array}
*/
FeedStore.getFeeds = function(feedSourceIds) {
  let feedSources = {};
  feedSourceIds.forEach(id =>{
    feedSources[id] = _filteredFeeds[id];
  });
  return feedSources;
};

/*
* Return array of feed items based on feedSource id's
* feedSourceIds {Array}
*/
FeedStore.getFeedItems = function(feedSourceIds) {
  if (feedSourceIds.length === 0) {
    return [];
  }
  
  let feeds = [];
  feedSourceIds.forEach(id => {
    if (_filteredFeeds[id] && _filteredFeeds[id].feedItems){
      Object.keys(_filteredFeeds[id].feedItems).forEach(itemId => {
        let feedItem = _filteredFeeds[id].feedItems[itemId];
        feedItem.feedSourceId = id;
        feeds.push(feedItem);
      });
    }
  });
  console.log('FeedStore#getFeedItems count:');
  console.log(feeds.length);
  return feeds;
};

FeedStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FeedConstants.FILTER_FEEDS:
      filter(payload.filterText);
      break;
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
