const React = require('react'),
      Link = require('react-router').Link,
      FeedActions = require('../actions/feed_actions'),
      OverlayTrigger = require('react-bootstrap').OverlayTrigger,
      Button = require('react-bootstrap').Button,
      Popover = require('react-bootstrap').Popover;

const FeedSourceItem = React.createClass({
  getInitialState() {
      return {
        active: false, selectedFolder: this.props.folderId
      };
  },
  unsubscribe(e) {
    e.preventDefault(); 
    FeedActions.unsubscribe(this.props.id, this.props.folderId)
  },

  hidePopover(test) {
    console.log('onHide ' + test);
  },

  clearForm() {
    this.setState({ selectedFolder: "" });
  },

  submitForm(folderId) {
    // FeedActions.createFeedSource(this.state.feedUrl, folderId);
  },

  submitOnEnter (e) {
    // console.log(e.code);
  },

  validateForm(folderId) {
        
    console.log('validateForm' + this.state.folderId);
    // make
    // Check that there is a URL (validated)
    // If ok, submit form
  },

  render(){
    const folders = Object.keys(this.props.folders).map(id => {
      const folder = this.props.folders[id];
      const selected = this.state.selectedFolder === folder.id ? " selected" : ""
      return (
        <li key={folder.id}>  
          <div className={"btn btn-hollow add-to-folder-item" + selected} key={folder.id} onClick={() => {this.setState({ selectedFolder: folder.id })}}>
            <div className="btn-hollow-inner">
              {folder.name}
              <span className="glyphicon-ok glyphicon"></span>
            </div>
          </div>
        </li>
      );
    });
    const url = `/feeds/${this.props.id}`;
    // TODO: Unsubscribing should be a folder action and not a feed action
    const active = this.state.active ? "active" : "";
    const popover = (<Popover onEntered={this.hidePopover} onHide={this.hidePopover.bind(this, 'test')} id={'popover-' + this.props.id} arrowOffsetTop={-3} >
                      <h4 className="title">{'Edit ' + this.props.title}</h4>
                      <h4>Move to a different folder</h4>
                      <ul className="list-unstyled">
                        {folders}
                      </ul>
                      <h4>Or</h4>
                      <Button className="btn btn-default">Unsubscribe</Button>
                    </Popover>);
    return (
      <li key={this.props.id} className={active}>
        <Link to={url} className="feed-source-item-link">{this.props.title}</Link>
        <div className="feed-source-tools">
          <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover} className="feed-source-tools">
            <span className="glyphicon glyphicon-pencil" aria-label="Unsubscribe"></span>
          </OverlayTrigger>  
        </div>
      </li>
    );
  }
});

module.exports = FeedSourceItem;