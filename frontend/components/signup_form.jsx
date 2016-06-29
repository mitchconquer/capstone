const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const SignupForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
      return {
          username: "", password: ""  
      };
  },

  onFormSubmit(e) {
    e.preventDefault();
    const formData = { user: 
     { username: this.state.username,
       password: this.state.password } }

    SessionActions.signup(formData, this.retry);
  },

  componentDidMount() {
    SessionStore.addListener(this.redirectIfLoggedIn);  
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  retry(e) {
    console.log(e);
  },

  usernameChange(e) {
    this.setState({username: e.target.value });
  },

  passwordChange(e) {
    this.setState({password: e.target.value });
  },

  render() {
    return(
      <section className="signup">
        <h2>Sign Up!</h2>
        <form onSubmit={this.onFormSubmit}>
          <label for="username">Username:</label>
          <input type="text" onChange={this.usernameChange} id="username" />

          <label for="password">Password:</label>
          <input type="password" onChange={this.passwordChange} id="password" />

          <input type="submit" value="Login" />
        </form>
      </section>
  );
  }
});

module.exports = SignupForm;