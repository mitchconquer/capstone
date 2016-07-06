const SavedArticleActions = require('../actions/saved_article_actions'),
      ErrorActions = require('../actions/error_actions');

module.exports = {
  create(savedArticle, successCallback) {
    $.ajax({
      url: `api/saved_articles`,
      method: 'POST',
      dataType: 'json',
      data: { saved_article: { savedArticle }},
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  update(savedArticle, successCallback) {
    $.ajax({
      url: `api/saved_articles/${savedArticle.id}`,
      method: 'PATCH',
      dataType: 'json',
      data: { saved_article: { saved_article }},
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  delete(savedArticleId, successCallback) {
    $.ajax({
      url: `api/saved_articles/${savedArticleId}`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: `api/saved_articles`,
      method: 'GET',
      dataType: 'json',
      success: successCallback,
      error: ErrorActions.setErrors
    });
  }
};