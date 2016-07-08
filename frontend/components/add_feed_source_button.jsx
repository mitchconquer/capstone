const React = require('react'),
      FeedActions = require('../actions/feed_actions'),
      FolderStore = require('../stores/folder_store'),
      Modal = require('react-bootstrap/lib').Modal,
      Button = require('react-bootstrap/lib').Button,
      FormGroup = require('react-bootstrap/lib').FormGroup,
      InputGroup = require('react-bootstrap/lib').InputGroup,
      FormControl = require('react-bootstrap/lib').FormControl,
      ControlLabel = require('react-bootstrap/lib').ControlLabel;

const AddFeedSourceButton = React.createClass({
  getInitialState() {
      return {
          show: false, feedUrl: "", folders: FolderStore.all(), selectedFolder: ""
      };
  },

  componentDidMount() {
    this.folderStoreListener = FolderStore.addListener(this._folderStoreChange);
  },

  componentWillUnmount() {
    this.folderStoreListener.remove();
  },

  _folderStoreChange() {
    this.setState({folders: FolderStore.all() });
  },

  closeModal(){
    this.setState({ show: false });
    this.clearForm();
  },

  focusOnForm() {
    document.getElementById('feed-url').focus();
  },

  toggleModal() {
    this.setState({ show: !this.state.show });
  },

  clearForm() {
    this.setState({ feedUrl: "", selectedFolder: "" });
  },

  submitForm(folderId) {
    FeedActions.createFeedSource(this.state.feedUrl, folderId);
    this.closeModal();
  },

  setSelectedFolder(folderId) {
    this.setState({ selectedFolder: folderId }, this.validateForm);
  },

  validateForm(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.feedUrl.length > 0 && this.state.selectedFolder) {
      this.submitForm(this.state.selectedFolder);
      return;
    }
  },

  feedUrlChange(e) {
    e.preventDefault();
    this.setState({ feedUrl: e.target.value });
  },

  render() {
    const folders = Object.keys(this.state.folders).map(id => {
      const folder = this.state.folders[id];
      const selected = this.state.selectedFolder === folder.id ? " selected" : ""
      return (
        <li key={folder.id}>  
          <div className={"btn btn-hollow add-to-folder-item" + selected} key={folder.id} onClick={this.setSelectedFolder.bind(null, folder.id)}>
            <div className="btn-hollow-inner">
              {folder.name}
              <span className="glyphicon-ok glyphicon"></span>
            </div>
          </div>
        </li>
      );
    });

    return (
      <span className="add-feed-source" id="add-feed-source">
        <div className="clearfix">
          <Button className="pull-right btn-success" onClick={this.toggleModal}>Add a Feed</Button>
        </div>
        <Modal show={this.state.show} onHide={this.closeModal} onEntered={this.focusOnForm} >
          <Modal.Header>
            <Modal.Title><div className="h2">Add a New RSS Feed</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3><span className="big-num">1.</span>&nbsp;Enter feed URL below:</h3>
            <form onSubmit={this.validateForm}>
              <FormGroup controlId="feed-url">
                <ControlLabel srOnly={true}>
                  RSS Feed URL
                </ControlLabel>
                <FormControl type="text" placeholder="http://..." onChange={this.feedUrlChange} value={this.state.feedUrl} />
              </FormGroup>
            </form>
            <h3><span className="big-num">2.</span>&nbsp;Pick a folder:</h3>
            <ul className="list-unstyled">
              {folders}
            </ul>
            <br />
            <div className="align-right">
              <Button onClick={this.closeModal}>Nevermind!</Button>
            </div>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
});

module.exports = AddFeedSourceButton;