const AppDispatcher = require('../dispatcher/dispatcher'),
      ReadItemApiUtil = require('../utils/read_item_api_util'),
      ReadItemConstants = require('../constants/read_item_constants');

const ReadItemActions = {

  /* UI-INITIATED ACTIONS */

  fetchAll() {
    ReadItemApiUtil.fetchAll(ReadItemActions.receiveReadItems);
  },

  create(readItem) {
    ReadItemApiUtil.create(readItem, ReadItemActions.receiveReadItem);
  },

  delete(readItemId) {
    ReadItemApiUtil.delete(readItemId, ReadItemActions.removeReadItem);
  },

  markAllRead(readItemIds) {
    ReadItemApiUtil.markAllRead(readItemIds, ReadItemActions.receiveReadItems);
  },

  markAllUnread(readItemIds) {
    ReadItemApiUtil.markAllRead(readItemIds, ReadItemActions.removeReadItems);
  },

  /* SERVER-INITIATED ACTIONS */

  receiveReadItem(readItem) {
    AppDispatcher.dispatch({
      actionType: ReadItemConstants.RECEIVE_READ_ITEM,
      readItem: readItem
    });
  },

  receiveReadItems(readItems) {
    AppDispatcher.dispatch({
      actionType: ReadItemConstants.RECEIVE_READ_ITEMS,
      readItems: readItems
    });
  },

  removeReadItem(response) {
    AppDispatcher.dispatch({
      actionType: ReadItemConstants.REMOVE_READ_ITEM,
      readItemId: response
    });
  },

  removeReadItems(response) {
    AppDispatcher.dispatch({
      actionType: ReadItemConstants.REMOVE_READ_ITEMS,
      readItemId: response
    });
  }

};

module.exports = ReadItemActions;