const React = require('react'),
      FeedItemDetails = require('./feed_item_details'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions'),
      FolderStore = require('../stores/folder_store'),
      ReadItemStore = require('../stores/read_item_store'),
      ReadItemActions = require('../actions/read_item_actions'),      
      FeedItemStore = require('../stores/feed_item_store'),
      FeedItemActions = require('../actions/feed_item_actions'),
      Button = require('react-bootstrap').Button;

const FeedItemIndex = React.createClass({
  getInitialState(){
    return ({
      feedData: FeedStore.getFeeds(this.currentFeedSourceIds()),
      readItems: ReadItemStore.all(),
      activeFeedItem: 0,
      feedItems: FeedItemStore.all()
    });
  },

  componentDidMount() {
    this.refreshFeedSources();
    this.feedStoreListener = FeedStore.addListener(this._storeChange);
    this.feedItemStoreListener = FeedStore.addListener(this._feedItemStoreChange);
    this.folderStoreListener = FolderStore.addListener(this._storeChange);
    this.readItemStoreListener = ReadItemStore.addListener(this._readItemStoreChange);
    this.initialFeedItemFetchFlag = false;
    this.targeting = undefined; // A flag to prevent the div from scrolling around if the user clicked a link
    document.addEventListener('DOMContentLoaded', this.initialFeedItemFetch);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();
    this.feedItemStoreListener.remove();
    this.readItemStoreListener.remove();
    this.folderStoreListener.remove();
    document.removeEventListener('DOMContentLoaded', this.initialFeedItemFetch);
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      feedData: FeedStore.getFeeds(this.nextFeedSourceIds(nextProps))
    });
    // FeedActions.refreshFeedSources(this.nextFeedSourceIds(nextProps));
    FeedItemActions.refreshFeedSources(this.nextFeedSourceIds(nextProps));
    document.getElementById('feed').scrollTop = 0;
  },

  _storeChange(){
    const currentFeedSourceIds = this.currentFeedSourceIds();
    this.setState({
      feedData: FeedStore.getFeeds(currentFeedSourceIds)
    });
  },

  _readItemStoreChange(){
    this.setState({
      readItems: ReadItemStore.all()
    });
  },

  _feedItemStoreChange(){
    this.setState({
      feedItems: FeedItemStore.all()
    });
  },

  initialFeedItemFetch() {
    // If there are no feed items in the DB, the initial page will hang unless you force refresh feeds
    if (!this.initialFeedItemFetchFlag && FeedStore.getFeedItems(currentFeedSourceIds).length === 0) {
      this.initialFeedItemFetchFlag = true;
      this.refreshFeedSources(currentFeedSourceIds);
    }
  },

  refreshFeedSources() {
    const currentFeedSourceIds = this.currentFeedSourceIds();
    if (currentFeedSourceIds && currentFeedSourceIds.length > 0) {
      FeedItemActions.refreshFeedSources(this.currentFeedSourceIds());
    }
  },

  viewFeedItem(itemId) {
    // document.getElementById(`item-${itemId}`).scrollIntoView(true);

    this.setState({ activeFeedItem: itemId });
    this.targeting = itemId;

    const detailsTargetTop = document.getElementById(`item-${itemId}`).offsetTop;
      $('#full-articles').animate({
        scrollTop: detailsTargetTop
      }, 500);
        
    ReadItemActions.create(itemId);
  },

  setActiveFeedItem(feedItemId) {
    if (this.targeting && this.targeting === feedItemId) {
      this.targeting = undefined;
    }

    if (!this.targeting) {
      this.setState({ activeFeedItem: feedItemId });
      const indexTargetTop = document.getElementById(`feedindex-${feedItemId}`).offsetTop;
      $('#feed').animate({
        scrollTop: indexTargetTop - 300
      }, 200); 
    }

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
      const active = this.state.activeFeedItem === feedItem.id ? " active" : "";
      const author = feedItem.author ? <span className="author">{feedItem.author},&nbsp;</span> : "";
      const authorText = feedItem.author ? feedItem.author + ", " : "";
      feedItems.push(
        <li key={feedItem.id} className={"feed-item" + read + active} id={`feedindex-${feedItem.id}`}>
            <a href="#" onClick={ (e) => {e.preventDefault(); this.viewFeedItem(feedItem.id);} }>
              <div className="feed-item-title">{feedItem.title}</div>
              <div className="feed-item-meta" title={authorText + feedItem.pubDateAgo + " ago"}>{author}{feedItem.pubDateAgo}&nbsp;ago</div>
            </a>
        </li>
      );
    });
    return feedItems;
  },

  currentFeedItems_FeedItemStore() {
    let feedItems = [];
    if (this.state.feedItems.size > 0) {
      this.state.feedItems.forEach(feedItem => {
        const read = this.state.readItems[feedItem.id] ? " read" : "";
        const active = this.state.activeFeedItem === feedItem.id ? " active" : "";
        const author = feedItem.author ? <span className="author">{feedItem.author},&nbsp;</span> : "";
        const authorText = feedItem.author ? feedItem.author + ", " : "";
        feedItems.push(
          <li key={feedItem.id} className={"feed-item" + read + active} id={`feedindex-${feedItem.id}`}>
              <a href="#" onClick={ (e) => {e.preventDefault(); this.viewFeedItem(feedItem.id);} }>
                <div className="feed-item-title">{feedItem.title}</div>
                <div className="feed-item-meta" title={authorText + feedItem.pubDateAgo + " ago"}>{author}{feedItem.pubDateAgo}&nbsp;ago</div>
              </a>
          </li>
        );
      });
    }
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
            {this.currentFeedItems_FeedItemStore()}
          </ul>
        </section>
        <FeedItemDetails setActiveFeedItem={this.setActiveFeedItem} activeFeedItem={this.state.activeFeedItem} feedSourceIds={this.currentFeedSourceIds()} feedSourceTitle={this.currentFeedTitle()}/>
      </span>
    );
  }
});

module.exports = FeedItemIndex;