const React = require('react'),
      FeedActions = require('../actions/feed_actions'),
      FolderActions = require('../actions/folder_actions'),
      FolderStore = require('../stores/folder_store'),
      FolderItem = require('./folder_item'),
      CreateFolderItem = require('./create_folder_item');

const FolderIndex = React.createClass({
  getInitialState(){
    return({
      folders: {}
    });
  },

  componentDidMount() {
    FeedActions.fetchAll();
    FolderActions.fetchAll();
    this.folderStorelistener = FolderStore.addListener(this._folderStoreChange);
  },

  componentWillUnmount() {
    this.folderStoreListener.remove();  
  },

  _folderStoreChange() {
    console.log('FolderIndex#_folderStoreChange');
    this.setState({ folders: FolderStore.all() });
  },

  folderListItems() {
    return Object.keys(this.state.folders).map(id => {
      const folder = this.state.folders[id];
      return <FolderItem key={folder.id} folderId={folder.id} folderName={folder.name} open={false} initialFeedSources={folder.feedSources} />;
    });
  },

  render() {
    const folders = this.folderListItems();
    return (
      <section className="folder-index">
        <CreateFolderItem />
        <ul className="list-unstyled folder-list">
          {folders}
        </ul>
      </section>
    );
  }
});

window.FolderStore = FolderStore;

module.exports = FolderIndex;