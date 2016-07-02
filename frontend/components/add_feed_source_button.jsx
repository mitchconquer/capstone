const React = require('react'),
      FeedActions = require('../actions/feed_actions'),
      Modal = require('react-bootstrap/lib').Modal,
      Button = require('react-bootstrap/lib').Button,
      FormGroup = require('react-bootstrap/lib').FormGroup,
      InputGroup = require('react-bootstrap/lib').InputGroup,
      FormControl = require('react-bootstrap/lib').FormControl,
      ControlLabel = require('react-bootstrap/lib').ControlLabel;

const AddFeedSourceButton = React.createClass({
  getInitialState() {
      return {
          show: false, feedUrl: ""
      };
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

  submitForm() {
    FeedActions.createFeedSource(this.state.feedUrl);
    this.closeModal();
  },

  feedUrlChange(e) {
    this.setState({feedUrl: e.target.value });
  },

  render() {
    return (
      <span>
        <div className="clearfix">
          <Button className="pull-right btn-success" onClick={this.toggleModal}>Add a Feed</Button>
        </div>
        <Modal show={this.state.show} onHide={this.closeModal} container={this} onEntered={this.focusOnForm} >
          <Modal.Body>
            <h4>Enter your feed URL below:</h4>
            <form onSubmit={this.submitForm}>
              <FormGroup controlId="feed-url">
                <ControlLabel srOnly={true}>
                  RSS Feed URL
                </ControlLabel>
                <InputGroup>
                  <FormControl type="text" placeholder="http://..." onChange={this.feedUrlChange} value={this.state.feedUrl} />
                  <InputGroup.Button>
                    <Button type="submit" className="btn-success">Subscribe!</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
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