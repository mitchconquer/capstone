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
  console.log('FolderStore#removeFolder');
  console.log(folderId);
  delete _folders[folderId];
  FolderStore.__emitChange();
}

FolderStore.all = function() {
  return Object.assign({}, _folders);
};

FolderStore.find = function(folderId) {
  return Object.assign({}, _folders[folderId]);
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
      console.log('FolderStore#REMOVE_FOLDER')
      removeFolder(payload.folderId)
      break;
    case FeedConstants.RECEIVE_FEED_SOURCE:
      console.log('FolderStore received RECEIVE_FEED_SOURCE')
      FolderActions.fetchAll();
      break;
  }
};

module.exports = FolderStore;
