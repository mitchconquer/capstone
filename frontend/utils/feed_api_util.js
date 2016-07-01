module.exports = {
  createFeedSource(feedSourceUrl, successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'POST',
      dataType: 'json',
      data: { url: feedSourceUrl },
      success: successCallback
    });
  },

  fetchAll(successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'GET',
      dataType: 'json',
      success: successCallback
    });
  }
};