const AppDispatcher = require('../dispatcher/dispatcher'),
      RecommendedApiUtil = require('../utils/recommended_api_util'),
      RecommendedConstants = require('../constants/recommended_constants');

const RecommendedActions = {
  fetchAll() {
    RecommendedApiUtil.fetchAll(RecommendedActions.receiveRecommended);
  },

  receiveRecommended(recommended) {
    AppDispatcher.dispatch({
      actionType: RecommendedConstants.RECEIVE_RECOMMENDED,
      recommended: recommended
    });
  }
};

module.exports = RecommendedActions;