import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
const React = require('react'),
      FeedActions = require('../actions/feed_actions'),
      OverlayTrigger = require('react-bootstrap').OverlayTrigger,
      Button = require('react-bootstrap').Button,
      Popover = require('react-bootstrap').Popover,
      FolderActions = require('../actions/folder_actions');

const FeedSourceItem = React.createClass({
  getInitialState() {
      return {
        active: false, selectedFolder: this.props.folderId, show: false
      };
  },

  hidePopover(test) {
  },

  clearForm() {
    this.setState({ selectedFolder: "" });
  },

  unsubscribe() {
    FolderActions.unsubscribe(this.props.folderId, this.props.id);
  },

  submitForm(folderId) {
    FolderActions.moveFeedSource(this.props.folderId, folderId, this.props.id);
  },

  render(){

    /* FOLDERS */
    const folders = Object.keys(this.props.folders).map(id => {
      const folder = this.props.folders[id];
      const selected = this.state.selectedFolder === folder.id ? " selected" : ""
      return (
        <li key={'fldr' + folder.id}>  
          <div className={"btn btn-hollow add-to-folder-item" + selected} key={folder.id} onClick={this.submitForm.bind(this, folder.id)}>
            <div className="btn-hollow-inner">
              {folder.name}
              <span className="glyphicon-ok glyphicon"></span>
            </div>
          </div>
        </li>
      );
    });

    /* POPOVERS */
    const popover = (
      <Popover onEntered={this.hidePopover} show={this.state.show} onHide={this.hidePopover.bind(this, 'test')} id={'popover-' + this.props.id} arrowOffsetTop={-3} >
        <h4 className="title">{'Edit ' + this.props.title}</h4>
        <h4>Move to a different folder</h4>
        <ul className="list-unstyled">
          {folders}
        </ul>
        <h4>Or</h4>
        <Button className="btn btn-default" onClick={this.unsubscribe}>Unsubscribe</Button>
      </Popover>
    );
    
    const url = `/feeds/${this.props.id}`;
    return (
      <li key={'fifs' + this.props.id}>
        <Link to={url} className="feed-source-item-link">{this.props.title}</Link>
        <div className="feed-source-tools">
          <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover} className="feed-source-tools">
            <span className="glyphicon glyphicon-pencil" aria-label={"Move or Unsubscribe from " + this.props.title}></span>
          </OverlayTrigger>  
        </div>
      </li>
    );
  }
});

module.exports = FeedSourceItem;