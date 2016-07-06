const AppDispatcher = require('../dispatcher/dispatcher'),
      Store = require('flux/utils').Store,
      SavedArticleConstants = require('../constants/saved_article_constants');

let _savedArticles = {};

function resetSavedArticles(savedArticles) {
  _savedArticles = {};
  Object.keys(savedArticles).forEach(id => {
    _savedArticles[id] = savedArticles[id];
  });
  SavedArticleStore.__emitChange();
}

function setSavedArticle(savedArticle) {
  _savedArticles[savedArticle.id] = savedArticle;
  SavedArticleStore.__emitChange();
}

function removeSavedArticle(savedArticleId) {
  delete _savedArticles[savedArticleId];
  SavedArticleStore.__emitChange();
}

const SavedArticleStore = new Store(AppDispatcher);

SavedArticleStore.all = function() {
  return Object.assign({}, _savedArticles);
}

SavedArticleStore.find = function(id) {
  return Object.assign({}, _savedArticles[id]);
}

SavedArticleStore.allIds = function() {
  return Object.keys(_savedArticles).map(id => {
    return _savedArticles[id].originalId;
  });
}

SavedArticleStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
  case SavedArticleConstants.RECEIVE_SAVED_ARTICLE:
    setSavedArticle(payload.savedArticle);
    break;
  case SavedArticleConstants.RECEIVE_SAVED_ARTICLES:
    resetSavedArticles(payload.savedArticles);
    break;
  case SavedArticleConstants.REMOVE_SAVED_ARTICLE:
    removeSavedArticle(payload.savedArticleId)
    break;
  default:
    break;
  }
};

module.exports = SavedArticleStore;