const React = require('react'),
      FeedItemDetails = require('./feed_item_details'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions');

const FeedItemIndex = React.createClass({
  getInitialState(){
    return ({
      feedSources: FeedStore.getFeeds([this.props.params.id])
    });
  },

  componentDidMount() {
    FeedActions.refreshFeedSources(this.feedSourceIds());
    this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);
  },

  componentWillUnmount() {
      this.feedStoreListener.remove();  
  },

  feedSourceIds() {
    return Object.keys(this.state.feedSources).map(id => parseInt(id));
  },

  scrollToFeedItem(e, id) {
    e.preventDefault();
    document.getElementById(`item-${id}`).scrollIntoView(true);
  },

  feedItemIds() {
    const nestedIds = [];
    this.feedSourceIds().forEach(id => {
      if (this.state.feedSources[id].feedItems) {
        nestedIds.concat(Object.keys(this.state.feedSources[id].feedItems));
      }
    });
    return nestedIds.reduce((prev, current) => {return prev.concat(current)}, []);
  },

  _feedStoreChange(){
    this.setState({
      feedSources: FeedStore.getFeeds(this.feedSourceIds())
    });
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        feedSources: FeedStore.getFeeds([parseInt(nextProps.params.id)])
      });
    FeedActions.refreshFeedSources([nextProps.params.id]);
  },

  currentFeedTitle() {
    return Object.keys(this.state.feedSources).map(id => {
      if (this.state.feedSources[id]) {
        return this.state.feedSources[id].title;
      }
    }).join(", ");
  },

  currentFeedItems() {
    const feedItems = [];
    if (Object.keys(this.state.feedSources).length > 0) {
      Object.keys(this.state.feedSources).forEach(function(feedSourceId) {
        const sourceId = parseInt(feedSourceId);
        if ((this.state.feedSources[sourceId]) && (Object.keys(this.state.feedSources[sourceId].feedItems).length > 0)) {
          Object.keys(this.state.feedSources[sourceId].feedItems).forEach(function(feedItemId) {
            const itemId = parseInt(feedItemId);
            const feedItem = this.state.feedSources[sourceId].feedItems[itemId];
            feedItems.push(
              <li key={itemId} className="feed-item">
                  <a href="#" onClick={(e) => {e.preventDefault(); document.getElementById(`item-${itemId}`).scrollIntoView(true);}}>{feedItem.title}<br />
                    <div><span className="author">{feedItem.author}</span>,&nbsp;{feedItem.pubDateAgo}&nbsp;ago</div>
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
        <FeedItemDetails feedSourceIds={this.feedSourceIds()} />
      </span>
    );
  }
});

module.exports = FeedItemIndex;