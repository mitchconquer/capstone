const React = require('react'),
      FeedItemDetails = require('./feed_item_details'),
      SavedArticleStore = require('../stores/saved_article_store'),
      SavedArticleActions = require('../actions/saved_article_actions'),
      SavedArticleDetails = require('./saved_article_details');

const SavedArticleIndex = React.createClass({
  getInitialState(){
    return ({
      feedData: SavedArticleStore.all()
    });
  },

  componentDidMount() {
    SavedArticleActions.fetchAll();
    this.savedArticleStoreListener = SavedArticleStore.addListener(this._storeChange);
  },

  componentWillUnmount() {
    this.savedArticleStoreListener.remove();
  },

  _storeChange(){
    this.setState({
      feedData: SavedArticleStore.all()
    });
  },

  currentFeedItems() {
    const feedItems = [];
    if (Object.keys(this.state.feedData).length > 0) {
      Object.keys(this.state.feedData).forEach(function(savedArticleId) {
        const itemId = parseInt(savedArticleId);
        const feedItem = this.state.feedData[itemId];
        const author = feedItem.author ? <span className="author">{feedItem.author},&nbsp;</span> : ""; 
        feedItems.push(
          <li key={itemId} className="feed-item">
              <a href="#" onClick={(e) => {e.preventDefault(); document.getElementById(`item-${itemId}`).scrollIntoView(true);}}>
                <div className="feed-item-title">{feedItem.title}</div>
                <div className="feed-item-meta">{author}{feedItem.pubDateAgo}&nbsp;ago</div>
              </a>
          </li>
        );
      }.bind(this));    
    }
    return feedItems;
  },

  render() {
    return (
      <span>
        <section className="col-sm-4 app-column feed" id="feed">
          <header><h3 className="color-bg-heading">SAVED ARTICLES</h3></header>
          <ul className="list-unstyled">
            {this.currentFeedItems()}
          </ul>
        </section>
        <SavedArticleDetails />
      </span>
    );
  }
});

module.exports = SavedArticleIndex;