const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const UserAccountLink = require('./user_account_link');

const LoginForm = React.createClass({
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

    SessionActions.login(formData);
  },

  componentDidMount() {
    SessionStore.addListener(this.redirectIfLoggedIn);  
    ErrorStore.addListener(this.errorChange);
  },

  errorChange() {
    this.setState({ errors: ErrorStore.formErrors('LoginForm') });
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
      <section className="login form">
        <UserAccountLink />
        <h2>Log In!</h2>
        <div>
          {errors}
        </div>
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

module.exports = LoginForm;