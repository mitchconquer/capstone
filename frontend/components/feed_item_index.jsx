const React = require('react'),
      FeedItemDetails = require('./feed_item_details'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions'),
      FolderStore = require('../stores/folder_store');

const FeedItemIndex = React.createClass({
  getInitialState(){
    return ({
      feedData: FeedStore.getFeeds(this.currentFeedSourceIds())
    });
  },

  componentDidMount() {
    const currentFeedSourceIds = this.currentFeedSourceIds();
    if ( currentFeedSourceIds && currentFeedSourceIds.length > 0) {
      FeedActions.refreshFeedSources(this.currentFeedSourceIds());
    }
    this.feedStoreListener = FeedStore.addListener(this._storeChange);
    this.folderStoreListener = FolderStore.addListener(this._storeChange);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();
    this.folderStoreListener.remove();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedData: FeedStore.getFeeds(this.nextFeedSourceIds(nextProps))
    });
    FeedActions.refreshFeedSources(this.nextFeedSourceIds(nextProps));
  },

  _storeChange(){
    console.log('FeedItemIndex#_storeChange');
    console.log(this.currentFeedSourceIds());
    this.setState({
      feedData: FeedStore.getFeeds(this.currentFeedSourceIds())
    });
  },

  currentFeedSourceIds() {
    let urlParams;
    console.log(this.props.params)
    if (this.props.params.feedId) {
      urlParams = [parseInt(this.props.params.feedId)];
    } else if (this.props.params.folderId) {
      urlParams = FolderStore.feedSourceIdsByFolder(parseInt(this.props.params.folderId));
    } else {
      urlParams = FeedStore.allIds();
    }
    console.log('FeedItemIndex#currentFeedSourceIds: ');
    console.log(urlParams);
    // First get to work with feeds and folders, then add All
    return urlParams
  },

  nextFeedSourceIds(nextProps) {
    let urlParams;
    if (nextProps.params.feedId) {
      urlParams = [nextProps.params.feedId];
    } else if (nextProps.params.folderId) {
      urlParams = FolderStore.feedSourceIdsByFolder(nextProps.params.folderId);
    }
    console.log('FeedItemIndex#nextFeedSourceIds: ');
    console.log(urlParams);
    // First get to work with feeds and folders, then add All
    return urlParams
  },

  currentFeedTitle() {
    let title;
    if (this.props.params.feedId) {
      const feedId = parseInt(this.props.params.feedId);
      if (this.state.feedData[feedId]) {
        title = this.state.feedData[feedId].title;
      }
    } else if (this.props.params.folderId) {
      title = FolderStore.find(this.props.params.folderId).name;
      if (typeof title === "string") {
        title = title.toUpperCase();
      }
    } else {
      title = 'ALL FEEDS';
    }

    return title;
  },

  currentFeedItems() {
    const feedItems = [];
    if (Object.keys(this.state.feedData).length > 0) {
      Object.keys(this.state.feedData).forEach(function(feedSourceId) {
        const sourceId = parseInt(feedSourceId);
        if ((this.state.feedData[sourceId]) && (this.state.feedData[sourceId].feedItems) && (Object.keys(this.state.feedData[sourceId].feedItems).length > 0)) {
          Object.keys(this.state.feedData[sourceId].feedItems).forEach(function(feedItemId) {
            const itemId = parseInt(feedItemId);
            const feedItem = this.state.feedData[sourceId].feedItems[itemId];
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
      }.bind(this));    
    }
    return feedItems;
  },

  render() {
    return (
      <span>
        <section className="col-sm-4 app-column feed" id="feed">
          <header><h3 className="color-bg-heading">{this.currentFeedTitle()}</h3></header>
          <ul className="list-unstyled">
            {this.currentFeedItems()}
          </ul>
        </section>
        <FeedItemDetails feedSourceIds={this.currentFeedSourceIds()} feedSourceTitle={this.currentFeedTitle()}/>
      </span>
    );
  }
});

module.exports = FeedItemIndex;