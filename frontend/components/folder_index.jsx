const React = require('react'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions');

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
      return <li key={feedSource.id}>{feedSource.title}</li>;
    });
  },

  render() {
    const feedSources = this.feedSourceListItems();
    return (
      <section>
        <p>Folders go here</p>
        <ul>
          {feedSources}
        </ul>
      </section>
    );
  }
});

module.exports = FolderIndex;