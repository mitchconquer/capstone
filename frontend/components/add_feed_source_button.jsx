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
          show: false, feedUrl: "", folders: FolderStore.all()
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
    this.setState({ feedUrl: "" });
  },

  submitForm(folderId) {
    FeedActions.createFeedSource(this.state.feedUrl, folderId);
    console.log('AddFeedSourceButton > ' + this.state.feedUrl + ' folderId: ' + folderId)
    this.closeModal();

  },

  feedUrlChange(e) {
    this.setState({feedUrl: e.target.value });
  },

  render() {
    const folders = Object.keys(this.state.folders).map(id => {
      const folder = this.state.folders[id];
      return <li className="add-to-folder-item" key={folder.id} onClick={this.submitForm.bind(null, folder.id)}>{folder.name}</li>;
    });
    return (
      <span className="add-feed-source" id="add-feed-source">
        <div className="clearfix">
          <Button className="pull-right btn-success" onClick={this.toggleModal}>Add a Feed</Button>
        </div>
        <Modal show={this.state.show} onHide={this.closeModal} container={this} onEntered={this.focusOnForm} >
          <Modal.Body>
            <h4>Enter your feed URL below:</h4>
            <form>
              <FormGroup controlId="feed-url">
                <ControlLabel srOnly={true}>
                  RSS Feed URL
                </ControlLabel>
                <InputGroup>
                  <FormControl type="text" placeholder="http://..." onChange={this.feedUrlChange} value={this.state.feedUrl} />
                </InputGroup>
              </FormGroup>
            </form>
            <br />
            <ul className="list-unstyled">
              {folders}
            </ul>
            <br />
            <div className="align-right">
              <Button onClick={this.closeModal}>Cancel</Button>
            </div>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
});

module.exports = AddFeedSourceButton;