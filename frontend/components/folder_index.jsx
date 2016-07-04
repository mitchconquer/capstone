const React = require('react'),
      FeedStore = require('../stores/feed_store'),
      FeedActions = require('../actions/feed_actions'),
      FeedSourceItem = require('./feed_source_item'),
      FolderActions = require('../actions/folder_actions'),
      FolderStore = require('../stores/folder_store');

const FolderIndex = React.createClass({
  getInitialState(){
    return({
      feedSources: {},
      folders: {}
    });
  },

  componentDidMount() {
    FeedActions.fetchAll();
    FolderActions.fetchAll();
    this.folderStorelistener = FolderStore.addListener(this._folderStoreChange);
    this.feedStoreListener = FeedStore.addListener(this._feedStoreChange);
  },

  componentWillUnmount() {
    this.feedStoreListener.remove();  
    this.folderStoreListener.remove();  
  },

  _feedStoreChange() {
    this.setState({ feedSources: FeedStore.all() });
  },

  _folderStoreChange() {
    this.setState({ folders: folderStore.all() });
  },

  feedSourceListItems() {
    return Object.keys(this.state.feedSources).map(id => {
      const feedSource = this.state.feedSources[id];
      return <FeedSourceItem key={feedSource.id} feedSource={feedSource} folderId="1" />;
    });
  },

  folderListItems() {
    return Object.keys(this.state.folders).map(id => {
      const folder = this.state.folders[id];
      return <FolderItem key={folder.id} folder={folder} open={false} />;
    });
  },

  render() {
    const feedSources = this.feedSourceListItems();
    return (
      <section className="folder-index">
        <h4>Folderzzz yas</h4>
        <ul className="list-unstyled folder-list">
          
        </ul>

        <h4>Feed Sources:</h4>
        <ul className="list-unstyled">
          {feedSources}
        </ul>
      </section>
    );
  }
});

module.exports = FolderIndex;