import { Link, hashHistory } from 'react-router';
const React = require('react'),
      ControlLabel = require('react-bootstrap/lib/ControlLabel'),
      FormControl = require('react-bootstrap/lib/FormControl'),
      FeedActions = require('../actions/feed_actions');

const FolderIndexUtils = React.createClass({
  getInitialState() {
    return {
      filterText: ""      
    };
  },

  filterFeeds() {
    FeedActions.filter(this.state.filterText);
  },

  filterTextChange(e) {
    this.setState({ filterText: e.target.value }, this.filterFeeds);
  },

  render(){
    return (
      <form className="filter-feeds-form">
        <ControlLabel srOnly={true} htmlFor="folder-filter">Filter</ControlLabel>
        <span className="glyphicon glyphicon-search"></span>
        <FormControl type="text" placeholder="Filter feeds..." id="folder-filter" className="feed-groups-filter transparent" value={this.state.filterText} onChange={this.filterTextChange} />
      </form>
    );
  }
});

module.exports = FolderIndexUtils;

