const React = require('react'),
      SessionActions = require('../actions/session_actions'),
      SessionStore = require('../stores/session_store'),
      UserAccountLink = require('./user_account_link');

const LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
      return {
          username: "", password: "", errors: {}, loggingIn: false
      };
  },

  onFormSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.submitForm();
  },

  submitForm() {
    this.setState({ loggingIn: true })
    const formData = { user: 
     { username: this.state.username,
       password: this.state.password } }

    SessionActions.login(formData);
  },

  demoLogin() {
    // document.getElementById('demo-btn').disabled = true;
    this.setState({ username: "", password: "", loggingIn: true });

    const username = "demo";
    const password = "demouser";
    const baseTime = 100;

    username.split('').forEach((letter, index) => {
      window.setTimeout(() => {
        this.setState({ username: this.state.username + letter });
      }, baseTime * (index + 1));
    });

    password.split('').forEach((letter, index) => {
      window.setTimeout(() => {
        this.setState({ password: this.state.password + letter });
      }, baseTime * (index + 1 + username.length));
    });

    window.setTimeout(this.submitForm, baseTime * (username.length + password.length + 3) );
  },

  componentDidMount() {
    SessionStore.addListener(this.redirectIfLoggedIn);  
    ErrorStore.addListener(this.errorChange);
  },

  errorChange() {
    const errors = ErrorStore.formErrors('LoginForm');
    this.setState({ errors: errors, loggingIn: false });
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
      const error = this.state.errors[key];
      return (<li key={error.errorMsg + error.errorBatch}>{error.errorMsg}</li>);
    });
  // const errors = ['hi'];

    const defaultSubmit = <input type="submit" value="Login" className="form-control btn btn-success" />;
    const loadingSubmit = (<a className="form-control btn btn-success"><div className="btn-spinner-text">Logging in...</div><div className="spinner"><div className="double-bounce1"></div> <div className="double-bounce2"></div> </div></a>);

    let submitBtn;
    if (this.state.loggingIn) {
      submitBtn = loadingSubmit;
    } else {
      submitBtn = defaultSubmit;
    }

    const disable = this.state.loggingIn ? true : false;

    return(
      <section className="login-signup-container">
        <div className="login-signup-form">
          <h1 className="site-title">AggreGreater &gt;</h1>
          <h3 className="site-description">A simple RSS reader and news aggregator.</h3>
          <div className="errors">
            {errors}
          </div>
          <UserAccountLink />
          <form className="login-form" onSubmit={this.onFormSubmit}>
            <label for="username">Username:</label><br />
            <input type="text" onChange={this.usernameChange} value={this.state.username} id="username" className="form-control transparent login-form" />

            <label for="password">Password:</label><br />
            <input type="password" onChange={this.passwordChange} value={this.state.password} id="password" className="form-control transparent login-form" />
            <br />
            {submitBtn}
            <input type="button" onClick={this.demoLogin} value="Demo Login" className="form-control btn btn-success" disabled={disable}/>
          </form>
        </div>
      </section>
    );
  }
});

module.exports = LoginForm;