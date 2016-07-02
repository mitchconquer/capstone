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
      this.setState({
        feedSources: FeedStore.getFeeds([nextProps])
      });
    FeedActions.refreshFeedSources(this.feedSourceIds());
  },

  render() {
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
    // First will get li's here, then try to extract to own method and see if still updates


    
    return (
      <span>
        <section className="col-sm-4 app-column feed" id="feed">
          <header><h4>Feed {this.props.params.id}</h4></header>
          <blockquote>
            FeedSources:<br />
          </blockquote>
          <ul className="list-unstyled">
            {feedItems}
          </ul>
        </section>
        <FeedItemDetails />
      </span>
    );
  }
});

module.exports = FeedItemIndex;