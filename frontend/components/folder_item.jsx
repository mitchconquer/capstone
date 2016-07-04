const React = require('react'),
      // FeedStore = require('../stores/feed_store'),
      // FeedActions = require('../actions/feed_actions'),
      FeedSourceItem = require('./feed_source_item'),
      FolderStore = require('../stores/folder_store'),
      FolderActions = require('../actions/folder_actions');

const FolderItem = React.createClass({

  getInitialState() {
    return {
      feedSources: this.props.initialFeedSources  
    };
  },

  componentDidMount() {
    this.FolderStoreListener = FolderStore.addListener(this._folderStoreChange);
  },

  componentWillUnmount() {
    this.FolderStoreListener.remove();  
  },

  _folderStoreChange() {
    this.setState({ feedSources: FolderStore.find(this.props.folderId).feedSources });
  },

  removeFolder() {
    FolderActions.delete(this.props.folderId);
  },

  feedSourceListItems() {
    return this.state.feedSources.map(feedSource => {
      return <FeedSourceItem key={feedSource.id} id={feedSource.id} title={feedSource.title} folderId={this.props.folderId} />;
    });
  },

  render() {
    return (
      <li>
        <h3 className="folder-name">{this.props.folderName}<div className="folder-menu"><span className="glyphicon glyphicon-remove" onClick={this.removeFolder}></span></div></h3>
        <ul className="list-unstyled feed-source-list">
          {this.feedSourceListItems()}
        </ul>
      </li>
    );
  }
});

module.exports = FolderItem;
