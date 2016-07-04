const React = require('react'),
      // FeedStore = require('../stores/feed_store'),
      // FeedActions = require('../actions/feed_actions'),
      FeedSourceItem = require('./feed_source_item');

const FolderItem = React.createClass({

  getInitialState() {
    return {
        feedSources: this.props.initialFeedSources  
    };
  },

  feedSourceListItems() {
    return this.state.feedSources.map(feedSource => {
      return <FeedSourceItem key={feedSource.id} id={feedSource.id} title={feedSource.title} folderId={this.props.folderId} />;
    });
  },

  render() {
    return (
      <li>
        {this.props.folderName}
        <ul className="list-unstyled feed-source-list">
          {this.feedSourceListItems()}
        </ul>
      </li>
    );
  }
});

module.exports = FolderItem;
