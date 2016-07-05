const Store = require('flux/utils').Store,
      AppDispatcher = require('../dispatcher/dispatcher'),
      RecommendedConstants = require('../constants/recommended_constants'),
      StoreUtil = require('../utils/store_util');

let _recommended = [];

function reset(recommended) {
  _recommended = [];

  Object.keys(recommended).forEach(key => {
    _recommended.push(recommended[key]);
  });
  RecommendedStore.__emitChange();
}

const RecommendedStore = new Store(AppDispatcher);

RecommendedStore.all = function() {
  return _recommended.slice();
};

RecommendedStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case RecommendedConstants.RECEIVE_RECOMMENDED:
    reset(payload.recommended);
    break;
    default:
    break;
  }
};

module.exports = RecommendedStore;

window.RecommendedStore = RecommendedStore;