const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      FolderConstants = require('../constants/folder_constants');

let _folders = {};

const FolderStore = new Store(AppDispatcher);

function setFolder(folder) {
  FolderStore.__emitChange();
}

function resetFolders(folders) {
  FolderStore.__emitChange();
}

function removeFolder(folderId) {
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
      resetFolders(payload.folder);
      break;
    case FolderConstants.REMOVE_FOLDER:
      removeFolder(payload.folderId)
      break;
  }
};

module.exports = FolderStore;
