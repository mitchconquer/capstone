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

function resetFeeds() {}

FeedStore.all = function() {
  // return StoreUtil.cloneObject(_feeds);
  return _feeds;
};

FeedStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FeedConstants.RECEIVE_FEED_SOURCE:
      setFeed(payload.feedSource);
      break;
    default:
      break; 
  }
};

module.exports = FeedStore;

/*
STRUCTURE OF _feed
 feedSources: {
    feedSourceId: {
      feedSourceTitle: title,
      feedSourceUrl: url,
      feedSourceFeedUrl: url,
      feedSourceImageUrl: imageUrl,
      feedItems: { 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          pubDateAgo: String,
          enclosure: url:Text,
          identifier: text }, 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          enclosure: url:Text,
          identifier: text }
      }
    },

    feedSourceId: {
      feedSourceTitle: title,
      feedSourceUrl: url,
      feedSourceFeedUrl: url,
      feedSourceImageUrl: imageUrl,
      feedItems: { 
        feedItemId: { 
          title: title,
          link: link,
          description: description,
          read: True/False,
          author: String,
          pubDate: dateTime,
          pubDateAgo: String,
          enclosure: url:Text,
          identifier: text }
      }
    }
  }
*/