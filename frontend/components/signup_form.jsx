const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const UserAccountLink = require('./user_account_link');


const SignupForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
      return {
          username: "", password: "", errors: {}
      };
  },

  onFormSubmit(e) {
    e.preventDefault();
    const formData = { user: 
     { username: this.state.username,
       password: this.state.password } }

    SessionActions.signup(formData);
  },

  componentDidMount() {
    SessionStore.addListener(this.redirectIfLoggedIn);
    ErrorStore.addListener(this.errorChange);
  },

  errorChange() {
    this.setState({ errors: ErrorStore.formErrors('SignupForm') });
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  usernameChange(e) {
    this.setState({username: e.target.value });
  },

  passwordChange(e) {
    this.setState({password: e.target.value });
  },

  render() {
    const errors = Object.keys(this.state.errors).map(key => {
      return (<li key={key}>{this.state.errors[key]}</li>);
    });
    return(
      <section className="signup login-signup-container">
      <div className="login-signup-form">
        <h1 className="site-title">AggreGreater &gt;</h1>
        <h3 className="site-description">A simple RSS reader and news aggregator.</h3>
          <UserAccountLink />
          <div>
            <ul>
              {errors}
            </ul>
          </div>
          <form className="login-form" onSubmit={this.onFormSubmit}>
            <label for="username">Username:</label>
            <input type="text" onChange={this.usernameChange} id="username" className="form-control transparent login-form" />

            <label for="password">Password:</label>
            <input type="password" onChange={this.passwordChange} id="password" className="form-control transparent login-form" />
            <br />
            <input type="submit" value="Sign Up" className="form-control btn btn-success" />
          </form>
        </div>
      </section>
  );
  }
});

module.exports = SignupForm;