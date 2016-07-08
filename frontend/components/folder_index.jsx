import { Link, hashHistory } from 'react-router';
const React = require('react'),
      FeedActions = require('../actions/feed_actions'),
      FolderActions = require('../actions/folder_actions'),
      FolderStore = require('../stores/folder_store'),
      FolderItem = require('./folder_item'),
      CreateFolderItem = require('./create_folder_item'),
      ReadItemActions = require('../actions/read_item_actions');

const FolderIndex = React.createClass({
  getInitialState(){
    return({
      folders: {}
    });
  },

  componentDidMount() {
    FeedActions.fetchAll();
    FolderActions.fetchAll();
    ReadItemActions.fetchAll();
    this.folderStoreListener = FolderStore.addListener(this._folderStoreChange);
  },

  componentWillUnmount() {
    this.folderStoreListener.remove();  
  },

  _folderStoreChange() {
    this.setState({ folders: FolderStore.all() });
  },

  folderListItems() {
    return Object.keys(this.state.folders).map(id => {
      const folder = this.state.folders[id];
      return <FolderItem key={folder.id} folderId={folder.id} folderName={folder.name} open={false} initialFeedSources={folder.feedSources} folders={this.state.folders} />;
    });
  },

  render() {
    const folders = this.folderListItems();
    return (
      <section className="folder-index">
        <CreateFolderItem />
        <ul className="list-unstyled folder-list">
          <li className="all-feeds">
            <h3 className="folder-name"><Link to="/">All Feeds</Link></h3>
          </li>
          <li>
            <h3 className="folder-name"><Link to="/saved">Saved Articles</Link></h3>
          </li>
        </ul>
        <ul className="list-unstyled folder-list">
          {folders}
        </ul>
      </section>
    );
  }
});

window.FolderStore = FolderStore;

module.exports = FolderIndex;