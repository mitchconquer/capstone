const React = require('react');

const EditFeedItem = React.createClass({
  render() {
    return(
      <li className="feed-item">
        <img src="http://dummyimage.com/150x150" alt="" className="img-circle" />
        <br />
        <h4>{this.props.title}</h4>
      </li>
    );
  }
});

module.exports = EditFeedItem;