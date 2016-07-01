module.exports = {
  createFeedSource(feedSourceUrl, successCallback) {
    $.ajax({
      url: 'api/feeds',
      method: 'POST',
      dataType: 'json',
      data: { url: 'http://www.wired.com/feed/' },
      success: successCallback
    });
  }
};