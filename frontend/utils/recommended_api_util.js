module.exports = {
  fetchAll(successCallback) {
    $.ajax({
      url: 'api/feeds/recommended',
      method: 'GET',
      dataType: 'json',
      success: successCallback
    });
  }
};