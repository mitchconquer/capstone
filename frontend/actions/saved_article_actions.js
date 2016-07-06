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

  saveFeedItem(feedItemId) {
    SavedArticleApiUtil.saveFeedItem(feedItemId, SavedArticleActions.receiveSavedArticle);
  },

  update(savedArticle) {
    SavedArticleApiUtil.update(savedArticle, SavedArticleActions.receiveSavedArticle);
  },

  delete(savedArticleId) {
    SavedArticleApiUtil.delete(savedArticleId, SavedArticleActions.removeSavedArticle);
  },

  deleteByOriginalId(savedArticleOriginalId) {
    SavedArticleApiUtil.deleteByOriginalId(savedArticleOriginalId, SavedArticleActions.removeSavedArticle);
  },

  /* SERVER-INITIATED ACTIONS */

  receiveSavedArticle(response) {
    console.log('SavedArticleActions#receiveSavedArticle - saved article data should be nested under savedArticle');
    console.log(response);
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.RECEIVE_SAVED_ARTICLE,
      savedArticle: response.savedArticle
    });
  },

  receiveSavedArticles(savedArticles) {
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.RECEIVE_SAVED_ARTICLES,
      savedArticles: savedArticles
    });
  },

  removeSavedArticle(response) {
    AppDispatcher.dispatch({
      actionType: SavedArticleConstants.REMOVE_SAVED_ARTICLE,
      savedArticleId: response.savedArticle.id
    });
  },

};

module.exports = SavedArticleActions;