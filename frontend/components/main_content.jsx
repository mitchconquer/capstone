import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react');

// Will either be Feed Item Index + Details or Edit Feeds Screen

const MainContent = React.createClass({
  render() {
    return (
      <span className="modal-container main-content">
        {this.props.children}
      </span>
    );
  }
});

module.exports = MainContent;