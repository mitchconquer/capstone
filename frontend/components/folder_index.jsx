const React = require('react'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions'),
      FeedSourceItem = require('./feed_source_item');

const FolderIndex = React.createClass({
  getInitialState(){
    return({
      feedSources: {}
    });
  },

  componentDidMount() {
    FeedActions.fetchAll();
    this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();  
  },

  _feedStoreChange() {
    this.setState({ feedSources: FeedStore.all() })
  },

  feedSourceListItems() {
    return Object.keys(this.state.feedSources).map(id => {
      const feedSource = this.state.feedSources[id];
      return <FeedSourceItem key={feedSource.id} feedSource={feedSource} folderId="1" />;
    });
  },

  render() {
    const feedSources = this.feedSourceListItems();
    return (
      <section>
        <p>Folders go here</p>
        <ul className="list-unstyled">
          {feedSources}
        </ul>
      </section>
    );
  }
});

module.exports = FolderIndex;