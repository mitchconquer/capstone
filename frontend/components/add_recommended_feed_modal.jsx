const React = require('react'),
      FolderActions = require('../actions/folder_actions'),
      FolderStore = require('../stores/folder_store'),
      Modal = require('react-bootstrap/lib').Modal,
      Button = require('react-bootstrap/lib').Button,
      FormGroup = require('react-bootstrap/lib').FormGroup,
      InputGroup = require('react-bootstrap/lib').InputGroup,
      FormControl = require('react-bootstrap/lib').FormControl,
      ControlLabel = require('react-bootstrap/lib').ControlLabel;

const AddRecommendedFeedModal = React.createClass({
  getInitialState() {
      return {
          show: false, feedSourceId: "", folders: FolderStore.all(), selectedFolder: ""
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

  toggleModal() {
    this.setState({ show: !this.state.show });
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ feedSourceId: nextProps.feedSourceId })  
  },

  closeModal() {
    this.setState({ feedSourceId: "", selectedFolder: "" });
    this.props.closeModal();
  },

  submitForm() {
    FolderActions.subscribe(this.state.selectedFolder, this.state.feedSourceId);
    this.closeModal();
  },

  setSelectedFolder(folderId) {
    this.setState({ selectedFolder: folderId }, this.validateForm);
  },

  validateForm() {
    
    if (this.state.feedSourceId && this.state.selectedFolder) {
      this.submitForm();
      return;
    }
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
      <span className="add-feed-source recommended" id="add-recommended-feed-source">
        <Modal show={this.props.show} onHide={this.closeModal} container={this} >
          <Modal.Body>
            <div className="add-recommended-modal-header">
              <img src={this.props.feedSourceImageUrl} className="img-circle img-responsive"/>
              <h3>{this.props.feedSourceTitle}</h3>
            </div>
            <h3>Pick a folder:</h3>
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

module.exports = AddRecommendedFeedModal;