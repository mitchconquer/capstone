const React = require('react'),
      Link = require('react-router').Link,
      FeedActions = require('../actions/feed_actions');

const FeedSourceItem = React.createClass({
  unsubscribe(e) {
    e.preventDefault(); 
    FeedActions.unsubscribe(this.props.id, this.props.folderId)
  },

  render(){
    const url = `/feeds/${this.props.id}`;
    // TODO: Unsubscribing should be a folder action and not a feed action
    return (
      <li key={this.props.id}><Link to={url} className="feed-source-item-link">{this.props.title}</Link><a href="#" onClick={this.unsubscribe} className="feed-source-tools"><span className="glyphicon glyphicon-remove" aria-label="Unsubscribe"></span></a></li>
    );
  }
});

module.exports = FeedSourceItem;