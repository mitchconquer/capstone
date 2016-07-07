const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      ReadItemConstants = require('../constants/read_item_constants');

let _readItems = {};

function resetReadItems(readItems) {
  _readItems = {};
  Object.keys(readItems).forEach(id => {
    _readItems[id] = readItems[id];
  });
  ReadItemStore.__emitChange();
}

function setReadItem(readItem) {
  _readItems[readItem.id] = readItem;
  ReadItemStore.__emitChange();
}

function removeReadItem(readItemId) {
  delete _readItems[readItemId];
  ReadItemStore.__emitChange();
}

const ReadItemStore = new Store(AppDispatcher);

ReadItemStore.all = function() {
  return Object.assign({}, _readItems);
}

ReadItemStore.find = function(id) {
  return Object.assign({}, _readItems[id]);
}

ReadItemStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case ReadItemConstants.RECEIVE_SAVED_ARTICLE:
    setReadItem(payload.readItem);
    break;
  case ReadItemConstants.RECEIVE_SAVED_ARTICLES:
    resetReadItems(payload.readItems);
    break;
  case ReadItemConstants.REMOVE_SAVED_ARTICLE:
    removeReadItem(payload.readItemId)
    break;
  default:
    break;
  }
};

module.exports = ReadItemStore;