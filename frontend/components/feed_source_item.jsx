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

    return (
      <li key={this.props.id}><Link to={url}>{this.props.title}</Link>&nbsp;<a href="#" onClick={this.unsubscribe}><span className="glyphicon glyphicon-remove-circle" aria-label="Unsubscribe"></span></a></li>
    );
  }
});

module.exports = FeedSourceItem;