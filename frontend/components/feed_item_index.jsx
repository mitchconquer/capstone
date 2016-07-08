const React = require('react'),
      FeedItemDetails = require('./feed_item_details'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions'),
      FolderStore = require('../stores/folder_store'),
      ReadItemStore = require('../stores/read_item_store'),
      ReadItemActions = require('../actions/read_item_actions'),
      Button = require('react-bootstrap').Button;

const FeedItemIndex = React.createClass({
  getInitialState(){
    return ({
      feedData: FeedStore.getFeeds(this.currentFeedSourceIds()),
      readItems: ReadItemStore.all()
    });
  },

  componentDidMount() {
    const currentFeedSourceIds = this.currentFeedSourceIds();
    if ( currentFeedSourceIds && currentFeedSourceIds.length > 0) {
      FeedActions.refreshFeedSources(this.currentFeedSourceIds());
    }
    this.feedStoreListener = FeedStore.addListener(this._storeChange);
    this.folderStoreListener = FolderStore.addListener(this._storeChange);
    this.readItemStoreListener = ReadItemStore.addListener(this._readItemStoreChange);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();
    this.readItemStoreListener.remove();
    this.folderStoreListener.remove();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedData: FeedStore.getFeeds(this.nextFeedSourceIds(nextProps))
    });
    FeedActions.refreshFeedSources(this.nextFeedSourceIds(nextProps));
    document.getElementById('feed').scrollTop = 0;
  },

  _storeChange(){
    this.setState({
      feedData: FeedStore.getFeeds(this.currentFeedSourceIds())
    });
  },

  _readItemStoreChange(){
    this.setState({
      readItems: ReadItemStore.all()
  },

  viewFeedItem(itemId) {
    document.getElementById(`item-${itemId}`).scrollIntoView(true);
    ReadItemActions.create(itemId);
  },

  currentFeedSourceIds() {
    let urlParams;
    if (this.props.params.feedId) {
      urlParams = [parseInt(this.props.params.feedId)];
    } else if (this.props.params.folderId) {
      urlParams = FolderStore.feedSourceIdsByFolder(parseInt(this.props.params.folderId));
    } else {
      urlParams = FeedStore.allIds();
    }
    return urlParams
  },

  nextFeedSourceIds(nextProps) {
    let urlParams;
    if (nextProps.params.feedId) {
      urlParams = [nextProps.params.feedId];
    } else if (nextProps.params.folderId) {
      urlParams = FolderStore.feedSourceIdsByFolder(nextProps.params.folderId);
    } else {
      urlParams = FeedStore.allIds();
    }
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

  markAllRead() {
    ReadItemActions.markAllRead(this.currentFeedItemIds());
  },

  markAllUnread() {
    ReadItemActions.markAllUnread(this.currentFeedItemIds());
  },

  currentFeedItemIds() {
    const feedItems = [];
    if (Object.keys(this.state.feedData).length > 0) {
      Object.keys(this.state.feedData).forEach((feedSourceId) => {
        const sourceId = parseInt(feedSourceId);
        if ((this.state.feedData[sourceId]) && (this.state.feedData[sourceId].feedItems) && (Object.keys(this.state.feedData[sourceId].feedItems).length > 0)) {
          Object.keys(this.state.feedData[sourceId].feedItems).forEach((feedItemId) => {
            feedItems.push(parseInt(feedItemId));
          });
        }
      });
    }
    return feedItems;
  },

  currentFeedItemObjects() {
    const feedItems = [];
    if (Object.keys(this.state.feedData).length > 0) {
      Object.keys(this.state.feedData).forEach((feedSourceId) => {
        const sourceId = parseInt(feedSourceId);
        if ((this.state.feedData[sourceId]) && (this.state.feedData[sourceId].feedItems) && (Object.keys(this.state.feedData[sourceId].feedItems).length > 0)) {
          Object.keys(this.state.feedData[sourceId].feedItems).forEach((feedItemId) => {
            feedItems.push(this.state.feedData[sourceId].feedItems[parseInt(feedItemId)]);
          });
        }
      });
    }
    const sortedFeedItems = feedItems.sort(this.sortFeedItems);
    return sortedFeedItems;
  },

  sortFeedItems(item1, item2) {
    const a = Date.parse(item1.pubDate);
    const b = Date.parse(item2.pubDate);

    if (a > b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  },

  currentFeedItems() {
    const feedItems = [];
    this.currentFeedItemObjects().forEach((feedItem) => {
      const read = this.state.readItems[feedItem.id] ? " read" : "";
      const author = feedItem.author ? <span className="author">{feedItem.author},&nbsp;</span> : ""; 
      feedItems.push(
        <li key={feedItem.id} className={"feed-item" + read}>
            <a href="#" onClick={ (e) => {e.preventDefault(); this.viewFeedItem(feedItem.id);} }>
              <div className="feed-item-title">{feedItem.title}</div>
              <div className="feed-item-meta">{author}{feedItem.pubDateAgo}&nbsp;ago</div>
            </a>
        </li>
      );
    });
    return feedItems;
  },

  render() {
    return (
      <span>
        <section className="col-sm-4 app-column feed" id="feed">
          <header className="">
            <h3 className="color-bg-heading">{this.currentFeedTitle()}</h3>
            <a className="btn btn-sm btn-success mark-read" onClick={this.markAllRead} >Mark All Read <span className="glyphicon glyphicon-ok"></span></a>
            <a className="btn btn-sm btn-success mark-unread" onClick={this.markAllUnread} >Mark All Unread</a>
          </header>
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