module.exports = {
  createFeedSource(feedSourceUrl, folderId, successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'POST',
      dataType: 'json',
      data: { url: feedSourceUrl, folderId: folderId },
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
  },

  refreshFeedSource(feedSourceId, successCallback) {
    $.ajax({
      url: `api/feeds/${feedSourceId}`,
      method: 'GET',
      dataType: 'json',
      success: successCallback
    });
  },

  unsubscribe(feedSourceId, folderId, successCallback) {
    $.ajax({
      url: `api/folders/${folderId}/feeds/${feedSourceId}`,
      method: 'DELETE',
      dataType: 'json',
      success: successCallback
    });
  }
};