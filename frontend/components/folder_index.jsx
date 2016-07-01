const React = require('react'),
      FeedStore = require('../stores/feed_store');

const FolderIndex = React.createClass({
  getInitialState(){
    return({
      feedSources: {}
    });
  },

  componentDidMount() {
    this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();  
  },

  _feedStoreChange() {
    this.setState({ feedSources: FeedStore.all() })
  },

  feedSourceLis() {
    return Object.keys(this.state.feedSources).map(id => {
      const feedSource = this.state.feedSources[id];
      console.log(feedSource);
      return <li key={feedSource.id}>{feedSource.title}</li>;
    });
  },

  render() {
    const feedSources = this.feedSourceLis();
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