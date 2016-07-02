const React = require('react'),
      FeedActions = require('../actions/feed_actions');

const FeedSourceItem = React.createClass({
  unsubscribe(e) {
    e.preventDefault(); 
    FeedActions.unsubscribe(this.props.feedSource.id, this.props.folderId)
  },

  render(){
    const feedSource = this.props.feedSource;
    return (
      <li key={feedSource.id}>{feedSource.title}&nbsp;<a href="#" onClick={this.unsubscribe}><span className="glyphicon glyphicon-remove-circle" aria-label="Unsubscribe"></span></a></li>
    );
  }
});

module.exports = FeedSourceItem;