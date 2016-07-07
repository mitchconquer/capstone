const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      FeedConstants = require('../constants/feed_constants'),
      StoreUtil = require('../utils/store_util');

const FeedStore = new Store(AppDispatcher);

let _feeds = {};
let _filteredFeeds = {};
let _filterText = "";

function setFeed(newFeed) {
  // _feeds[newFeed]
  _feeds[parseInt(newFeed.id)] = newFeed
  _filteredFeeds = Object.assign({}, _feeds);
  filter(_filterText);
  FeedStore.__emitChange();
}

function resetFeeds(feedSources) {
  _feeds = {};
  Object.keys(feedSources).map(id => {
    _feeds[id] = feedSources[id];
  });
  _filteredFeeds = Object.assign({}, _feeds);
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
  _filterText = filterText.trim().toLowerCase();
  if (_filterText) {
    const filteredItems = filteredFeedItems().slice();
    _filteredFeeds = createFilteredStore(filteredItems);
  } else {
    _filteredFeeds = Object.assign({}, _feeds);
    console.log('FeedStore reset to _feeds :D  Next two numbers should be same');
    console.log(FeedStore.getFeedItems(Object.keys(_filteredFeeds)).length + " === " + getUnfilteredFeedItems(Object.keys(_feeds)).length);
  }
  // console.log('Total feed item count, filtered vs unfiltered of _filteredFeeds');
  FeedStore.__emitChange();
}

function filteredFeedItems() {
  // console.log('filtering with ' + _filterText);
  let filteredItems = [];
  // console.log('FeedStore#filteredFeedItems _feeds has ' + Object.keys(_feeds).length + ' items');
  Object.keys(_feeds).forEach(feedSourceId => {
    const feedItems = getUnfilteredFeedItems([feedSourceId]);
    if (feedItems.length > 0) {
      feedItems.forEach(feedItem => {
        if (containsMatch(feedItem)) {
          filteredItems.push(Object.assign({}, feedItem));
        }
      });
    }
  });
  return filteredItems.slice();
}

function containsMatch(feedItem) {
  const title = feedItem.title.toLowerCase(),
        description = feedItem.description.toLowerCase();

  let titleHas = false,
      descriptionHas = false;

  if (title.search(_filterText) != -1) {
    titleHas = true;
  }

  if (description.search(_filterText) != -1) {
    descriptionHas = true;
  }

  if (titleHas || descriptionHas) {
    return true;
  }

  return false;
}

/*
* Return array of feed items based on feedSource id's
* feedSourceIds {Array}
*/
function getUnfilteredFeedItems(feedSourceIds) {

  if (feedSourceIds.length === 0) {
    return [];
  }
  
  let feeds = [];
  feedSourceIds.forEach(id => {
    if (_feeds[id] && _feeds[id].feedItems){
      Object.keys(_feeds[id].feedItems).forEach(itemId => {
        let feedItem = Object.assign({}, (_feeds[id].feedItems[itemId]));
        feedItem.feedSourceId = id;
        feeds.push(feedItem);
      });
    }
  });
  return feeds;
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
      let feedSource = Object.assign({}, _feeds[sourceId]);
      feedSource.feedItems = {};
      filteredFeedStore[sourceId] = feedSource;
    }
  });
  return filteredFeedStore;
}

FeedStore.unfiltered = function() {
  return Object.assign({}, _feeds);
};

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
        feeds.push(feedItem);
      });
    }
  });
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
