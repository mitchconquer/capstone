const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      FolderConstants = require('../constants/folder_constants'),
      FolderActions = require('../actions/folder_actions'),
      FeedConstants = require('../constants/feed_constants');

let _folders = {};

const FolderStore = new Store(AppDispatcher);

function setFolder(folder) {
  _folders[folder.id] = folder
  FolderStore.__emitChange();
}

function resetFolders(folders) {
  _folders = {};
  Object.keys(folders).forEach(id => {
    _folders[id] = folders[id];
  });
  FolderStore.__emitChange();
}

function removeFolder(folderId) {
  delete _folders[folderId];
  FolderStore.__emitChange();
}

FolderStore.all = function() {
  return Object.assign({}, _folders);
};

FolderStore.find = function(folderId) {
  return Object.assign({}, _folders[folderId]);
};

FolderStore.titleByFeedSourceId = function(feedSourceId) {
  let title = "";
  if (Object.keys(_folders)) {
    Object.keys(_folders).forEach(folderId => {
      if (_folders[folderId] && _folders[folderId].feedSources.length > 0) {
        _folders[folderId].feedSources.forEach(feedSource => {
          if (feedSource.id === feedSourceId) {
            title = feedSource.title;
          }
        });
      }
    });
  }
  return title;
};

FolderStore.feedSourceIdsByFolder = function(folderId) {
  // In case _folders is empty when called
  if (_folders[folderId]) {
    return _folders[folderId].feedSources.map(feedSource => {
      return feedSource.id
    });   
  }
  return [];
};

FolderStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FolderConstants.RECEIVE_FOLDER:
      setFolder(payload.folder);
      break;
    case FolderConstants.RECEIVE_FOLDERS:
      resetFolders(payload.folders);
      break;
    case FolderConstants.REMOVE_FOLDER:
      removeFolder(payload.folderId)
      break;
    case FeedConstants.RECEIVE_FEED_SOURCE:
      FolderActions.fetchAll();
      break;
  }
};

module.exports = FolderStore;
