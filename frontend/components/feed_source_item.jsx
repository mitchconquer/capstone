const React = require('react'),
      Link = require('react-router').Link,
      FeedActions = require('../actions/feed_actions');

const FeedSourceItem = React.createClass({
  unsubscribe(e) {
    e.preventDefault(); 
    FeedActions.unsubscribe(this.props.feedSource.id, this.props.folderId)
  },

  render(){
    const feedSource = this.props.feedSource;
    const url = `/feeds/${feedSource.id}`;

    return (
      <li key={feedSource.id}><Link to={url}>{feedSource.title}</Link>&nbsp;<a href="#" onClick={this.unsubscribe}><span className="glyphicon glyphicon-remove-circle" aria-label="Unsubscribe"></span></a></li>
    );
  }
});

module.exports = FeedSourceItem;