const AppDispatcher = require('../dispatcher/dispatcher'),
      SavedArticleApiUtil = require('../utils/saved_article_api_util'),
      SavedArticleConstants = require('../constants/saved_article_constants');

const SavedArticleActions = {

  /* UI-INITIATED ACTIONS */

  fetchAll() {
    SavedArticleApiUtil.fetchAll(SavedArticleActions.receiveSavedArticles);
  },

  create(savedArticle) {
    SavedArticleApiUtil.create(savedArticle, SavedArticleActions.receiveSavedArticle);
  },

  update(savedArticle) {
    SavedArticleApiUtil.update(savedArticle, SavedArticleActions.receiveSavedArticle);
  },

  delete(savedArticleId) {
    SavedArticleApiUtil.delete(savedArticleId, SavedArticleActions.removeSavedArticle);
  },

  /* SERVER-INITIATED ACTIONS */

  receiveSavedArticle(savedArticle) {
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.RECIEVE_SAVED_ARTICLE,
      savedArticle: savedArticle
    });
  },

  receiveSavedArticles(savedArticles) {
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.RECIEVE_SAVED_ARTICLES,
      savedArticles: savedArticles
    });
  },

  removeSavedArticle(savedArticleId) {
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.REMOVE_SAVED_ARTICLE,
      savedArticleId: savedArticleId
    });
  },

};

module.exports = SavedArticleActions;