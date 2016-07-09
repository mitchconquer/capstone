const React = require('react'),
      FolderActions = require('../actions/folder_actions');

const CreateFolderItem = React.createClass({
  getInitialState() {
    return {
      editing: false,
      folderName: ""
    };
  },

  toggleEditMode() {
    this.setState({ editing: !this.state.editing });
  },

  componentDidUpdate() {
    if (this.state.editing === true) {
      document.getElementById('create-folder-input').focus();
    }
  },

  validateFolderName(e) {
    e.preventDefault();
    if (this.state.folderName.length > 0) {
      this.submitForm();
    }
  },

  submitForm() {
    FolderActions.create({ name: this.state.folderName })
    this.setState({ folderName: "", editing: false });
  },

  onFolderNameChange(e) {
    this.setState({ folderName: e.target.value });
  },

  render() {

    if (this.state.editing) {      
      return (
        <form onSubmit={this.validateFolderName} className="create-folder-form">
          <div className="input-container">
            <input type="text" id="create-folder-input" className="form-control" onChange={this.onFolderNameChange} placeholder="NEW FOLDER..." value={this.state.folderName} aria-label="New Folder Name" />
          </div>
          <button type="submit" className="btn btn-default btn-success create-folder-submit" aria-label="Create Folder" onClick={this.validateFolderName}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
          </button>
          <button type="button" className="btn btn-default create-folder-cancel" aria-label="Cancel" onClick={this.toggleEditMode}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </form>
      );
    }
    return (
      <h3 className="folder-name create-folder" onClick={this.toggleEditMode}>NEW FOLDER...</h3>
    );
  }
});

module.exports = CreateFolderItem;