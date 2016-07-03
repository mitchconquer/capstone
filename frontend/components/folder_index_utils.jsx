import { Link, hashHistory } from 'react-router';
const React = require('react'),
      ControlLabel = require('react-bootstrap/lib/ControlLabel'),
      FormControl = require('react-bootstrap/lib/FormControl');

const FolderIndexUtils = React.createClass({
  render(){
    return (
      <form className="filter-feeds-form">
        <ControlLabel srOnly={true} htmlFor="folder-filter">Filter</ControlLabel>
        <span className="glyphicon glyphicon-search"></span>
        <FormControl type="text" placeholder="Filter feeds..." id="folder-filter" className="feed-groups-filter transparent"/>
      </form>
    );
  }
});

module.exports = FolderIndexUtils;

