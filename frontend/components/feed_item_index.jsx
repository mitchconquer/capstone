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

  _feedStoreChange(){
    console.log('FeedItemIndex#_feedStoreChange was invoked');
    console.log(this.feedSourceIds());
    this.setState({
      feedSources: FeedStore.getFeeds(this.feedSourceIds())
    });
  },

  render() {
    const feedItems = [];
    for (let i = 0; i < 15; i++) {
      feedItems.push(
        <li className="feed-item" key={i} >
          
        </li>
      );
    }
    
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