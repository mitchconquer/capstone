const AppDispatcher = require('../dispatcher/dispatcher'),
      FolderApiUtil = require('../utils/folder_api_util'),
      FolderConstants = require('../constants/folder_constants');

const FolderActions = {
  /* CLIENT UI INITIATED ACTIONS */

  create(folder) {
    FolderApiUtil.create(folder, FolderActions.receiveFolder);
  },

  update(folder) {
    FolderApiUtil.update(folder, FolderActions.receiveFolder);
  },

  delete(folderId) {
    FolderApiUtil.delete(folderId, FolderActions.removeFolder);
  },

  moveFeedSource(originalFolderId, newFolderId, feedSourceId) {
    FolderApiUtil.unsubscribe(originalFolderId, feedSourceId, FolderActions.receiveFolder);
    FolderApiUtil.subscribe(newFolderId, feedSourceId, FolderActions.receiveFolder);
  },

  unsubscribe(originalFolderId, feedSourceId) {
    FolderApiUtil.unsubscribe(originalFolderId, feedSourceId, FolderActions.receiveFolder);
  },

  fetchAll() {
    console.log('FolderActions#fetchAll');
    FolderApiUtil.fetchAll(FolderActions.receiveFolders);
  },

  fetch(folderId) {
    FolderApiUtil.fetch(folderId, FolderActions.receiveFolder);
  },

  /* SERVER RESPONSE ACTIONS */

  receiveFolder(folder) {
    console.log('FolderActions#receiveFolder');
    console.log(folder);
    AppDispatcher.dispatch({
      actionType: FolderConstants.RECEIVE_FOLDER,
      folder: folder
    });
  },

  removeFolder(folder) {
    AppDispatcher.dispatch({
      actionType: FolderConstants.REMOVE_FOLDER,
      folderId: folder.id
    });
  },

  receiveFolders(folders) {
    AppDispatcher.dispatch({
      actionType: FolderConstants.RECEIVE_FOLDERS,
      folders: folders
    });
  }

};

module.exports = FolderActions;