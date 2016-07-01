const React = require('react');

// Will either be Feed Item Index + Details or Edit Feeds Screen

const MainContent = React.createClass({
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
});

module.exports = MainContent;