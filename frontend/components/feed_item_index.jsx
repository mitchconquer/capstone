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
    console.log('FeedItemIndex#componentDidMount, refeshing feedsources in this.state: ' + this.feedSourceIds());
    console.log('FeedItemIndex#componentDidMount, current feedsources in props: ' + this.props.params.id);
    FeedActions.refreshFeedSources(this.feedSourceIds());
    this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);
  },

  componentWillUnmount() {
      this.feedStoreListener.remove();  
  },

  feedSourceIds() {
    return Object.keys(this.state.feedSources).map(id => parseInt(id));
  },

  _feedStoreChange(){
    console.log('FeedItemIndex#_feedStoreChange was invoked');
    console.log(this.feedSourceIds());
    this.setState({
      feedSources: FeedStore.getFeeds(this.feedSourceIds())
    });
  },

  componentWillReceiveProps(nextProps) {
    console.log('FeedItemIndex receiving new props ' + nextProps.params.id);
      this.setState({
        feedSources: FeedStore.getFeeds([parseInt(nextProps.params.id)])
      });
    FeedActions.refreshFeedSources(this.feedSourceIds());
  },

  currentFeedTitle() {
    return Object.keys(this.state.feedSources).map(id => {
      if (this.state.feedSources[id]) {
        return this.state.feedSources[id].title
      }
    }).join(", ");
  },

  currentFeedItems() {
    const feedItems = [];
    if (Object.keys(this.state.feedSources).length > 0) {
      Object.keys(this.state.feedSources).forEach(function(feedSourceId) {
        const sourceId = parseInt(feedSourceId);
        if (this.state.feedSources[sourceId] && (Object.keys(this.state.feedSources[sourceId].feedItems).length > 0)) {
          Object.keys(this.state.feedSources[sourceId].feedItems).forEach(function(feedItemId) {
            const itemId = parseInt(feedItemId);
            const feedItem = this.state.feedSources[sourceId].feedItems[itemId];
            feedItems.push(
              <li key={itemId}>{feedItem.title}</li>
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
          <header><h4>Feed {this.currentFeedTitle()}</h4></header>
          <ul className="list-unstyled">
            {this.currentFeedItems()}
          </ul>
        </section>
        <FeedItemDetails />
      </span>
    );
  }
});

module.exports = FeedItemIndex;