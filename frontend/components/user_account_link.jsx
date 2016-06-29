const React = require('react');
import { Link, hashHistory } from 'react-router';
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const UserAccountLink = React.createClass({
  getInitialState() {
    return ({ loggedIn: SessionStore.isUserLoggedIn() });
  },

  logoutButton(e) {
    e.preventDefault();
    SessionActions.logout();
    hashHistory.push("/login");
  },

  componentDidMount() {
    this.listener = SessionStore.addListener(this.changeLoginState);  
  },

  componentWillUnmount() {
    this.listener.remove();
  },

  changeLoginState() {
    this.setState({ loggedIn: SessionStore.isUserLoggedIn() });
    console.log("Changing login state");
    console.log(SessionStore.isUserLoggedIn());
  },

  render() {
    if (this.state.loggedIn) {
      return (<div>
        Oh hai, {SessionStore.currentUser().username}!&nbsp;<button onClick={this.logoutButton}>Logout</button> if ya wanna!
      </div>);
    }
    return (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
      </div>
    );
  }
});

module.exports = UserAccountLink;