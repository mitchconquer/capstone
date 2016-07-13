const React = require('react'),
      ReactDOM = require('react-dom'),
      FeedItemDetails = require('./feed_item_details'),
      FolderStore = require('../stores/folder_store'),
      ReadItemStore = require('../stores/read_item_store'),
      ReadItemActions = require('../actions/read_item_actions'),      
      FeedItemStore = require('../stores/feed_item_store'),
      FeedItemActions = require('../actions/feed_item_actions'),
      Button = require('react-bootstrap').Button;

const FeedItemIndex = React.createClass({
  getInitialState(){
    return ({
      readItems: ReadItemStore.all(),
      activeFeedItem: 0,
      feedItems: FeedItemStore.all(),
      loading: false,
      loader: false,
      page: 0
    });
  },

  componentDidMount() {
    this.refreshFeedSources();
    this.feedItemStoreListener = FeedItemStore.addListener(this._feedItemStoreChange);
    this.folderStoreListener = FolderStore.addListener(this._folderStoreChange);
    this.readItemStoreListener = ReadItemStore.addListener(this._readItemStoreChange);
    this.initialFeedItemFetchFlag = false;
    this.targeting = undefined; // A flag to prevent the div from scrolling around if the user clicked a link
    this.initialFeedItemFetch();
    this.scrollQueue = [];
    this.handleScrollListener = document.getElementById('feed').addEventListener('scroll', this.handleScroll);
    this.prevScroll = 0;
  },

  componentWillUnmount() {
    this.feedItemStoreListener.remove();
    this.readItemStoreListener.remove();
    this.folderStoreListener.remove();
  },

  componentWillReceiveProps(nextProps) {
    FeedItemActions.refreshFeedSources(this.nextFeedSourceIds(nextProps));
    document.getElementById('feed').scrollTop = 0;
    // this.setState({ page:  });
  },

  _folderStoreChange(){
    const currentFeedSourceIds = this.currentFeedSourceIds();
    FeedItemActions.refreshFeedSources(currentFeedSourceIds);
  },

  _readItemStoreChange(){
    this.setState({
      readItems: ReadItemStore.all()
    });
  },

  _feedItemStoreChange(){
    const prevSize = this.state.feedItems ? this.state.feedItems.size : 0;
    this.setState({
      feedItems: FeedItemStore.all(),
      loading: false
    }, () => {
      // Only increase the page number once confirmed that 
      // recieved more results
      if (this.state.feedItems.size > prevSize) {
        this.setState({
          page: this.state.page + 1
        })
      } else if (this.state.feedItems.size < prevSize) {
        this.setState({
          page: 1
        });
      }
    });
  },

  handleScroll() {
    const feeds = document.getElementById('feed');

    if (feeds.scrollTop > (feeds.scrollHeight - feeds.offsetHeight - 10)) {
      this.loadNextPage();
    }
  },

  loadNextPage() {
    if (this.state.loading) {
      return;
    }

    FeedItemActions.loadNextPage(this.currentFeedSourceIds, (this.state.page + 1));

    this.setState({
      loading: true,
      loader: true
    });

    window.setTimeout(() => {this.setState({loader: false}); }, 700);
  },

  initialFeedItemFetch() {
    // If there are no feed items in the DB, the initial page will hang unless you force refresh feeds
    if (!this.initialFeedItemFetchFlag && FeedItemStore.all().size < 1) {
      if (this.currentFeedSourceIds().length < 1) {
        window.setTimeout(this.initialFeedItemFetch, 100);
        return;
      }
      this.initialFeedItemFetchFlag = true;
      this.refreshFeedSources();
    }
  },

  refreshFeedSources() {
    const currentFeedSourceIds = this.currentFeedSourceIds();
    if (currentFeedSourceIds && currentFeedSourceIds.length > 0) {
      FeedItemActions.refreshFeedSources(currentFeedSourceIds);
    }
  },

  viewFeedItem(itemId) {

    this.setState({ activeFeedItem: itemId });
    this.targeting = itemId;

    const detailsTargetTop = document.getElementById(`item-${itemId}`).offsetTop;
      $('#full-articles').animate({
        scrollTop: detailsTargetTop
      }, 500);
        
    ReadItemActions.create(itemId);
  },

  setActiveFeedItem(feedItemId) {
    // If we were skipping to a particular item in the Feed Details
    // and arrived at that item, turn off "targeting" mode
    if (this.targeting && this.targeting === feedItemId) {
      this.targeting = undefined;
    }

    // If we aren't currently targeting a particular item,
    // update the active feed item if it has changed
    if (!this.targeting && feedItemId != this.state.feedItemId) {
      this.scrollQueue.push(feedItemId);
      this.setState({ activeFeedItem: feedItemId }, 
        () => {window.setTimeout(this.scrollToNewActiveItem, 700)}
      );   
    }
  },

  scrollToNewActiveItem() {
    if (this.scrollQueue.length < 1) {
      return;
    }

    const indexTargetTop = document.getElementById(`feedindex-${this.scrollQueue.slice(-1)}`).offsetTop;
    const skipping = this.scrollQueue.length - 1
    this.scrollQueue = [];
    $('#feed').animate({
      scrollTop: indexTargetTop - 200
    }, (skipping > 3 ? 500 : 150 * skipping) ); 
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
      title = FolderStore.titleByFeedSourceId(feedId);
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
    const results = [];
    if (this.state.feedItems.size > 0) {
      this.state.feedItems.forEach(item => {results.push(item.id)});
    }
    return results;
  },

  currentFeedItemObjects() {
    if (this.state.feedItems.size > 0) {
      return this.state.feedItems.values();
    }
    return []
  },

  feedItemHtml() {
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
    const loading = this.state.loader ? "loading" : "not-loading";

    return (
      <span>
        <div id="loading-notice" className={loading}><div className="loading-more-text">Loading More Items&nbsp;<div className="spinner"><div className="double-bounce1"></div> <div className="double-bounce2"></div> </div></div></div> 
        <section className="col-sm-4 app-column feed" id="feed">
          <header className="">
            <h3 className="color-bg-heading">{this.currentFeedTitle()}</h3>
            <a className="btn btn-sm btn-success mark-read" onClick={this.markAllRead} >Mark All Read <span className="glyphicon glyphicon-ok"></span></a>
            <a className="btn btn-sm btn-success mark-unread" onClick={this.markAllUnread} >Mark All Unread</a>
          </header>
          <ul className="list-unstyled">
            {this.feedItemHtml()}
          </ul>
        </section>
        <FeedItemDetails loadNextPage={this.loadNextPage} setActiveFeedItem={this.setActiveFeedItem} activeFeedItem={this.state.activeFeedItem} feedSourceIds={this.currentFeedSourceIds()} feedSourceTitle={this.currentFeedTitle()}/>
      </span>
    );
  }
});

module.exports = FeedItemIndex;