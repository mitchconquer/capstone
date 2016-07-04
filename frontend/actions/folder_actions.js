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

  fetchAll() {
    FolderApiUtil.fetchAll(FolderActions.receiveFolders);
  },

  fetch(folderId) {
    FolderApiUtil.fetch(folderId, FolderActions.receiveFolder);
  },

  

  /* SERVER RESPONSE ACTIONS */

  receiveFolder(folder) {
    AppDispatcher.dispatch({
      actionType: FolderConstants.RECEIVE_FOLDER,
      folder: folder
    });
  },

  removeFolder(folderId) {
    AppDispatcher.dispatch({
      actionType: FolderConstants.REMOVE_FOLDER,
      folderId: folderId
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