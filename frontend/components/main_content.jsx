const React = require('react');

// Will either be Feed Item Index + Details or Edit Feeds Screen

const MainContent = React.createClass({
  render() {
    return (
      <span className="modal-container">
        {this.props.children}
      </span>
    );
  }
});

module.exports = MainContent;