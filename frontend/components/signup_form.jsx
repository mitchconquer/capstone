const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

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
      <section className="signup">
        <h2>Sign Up!</h2>
        <div>
          <ul>
            {errors}
          </ul>
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

module.exports = SignupForm;