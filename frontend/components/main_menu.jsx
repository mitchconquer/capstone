import { Link, hashHistory } from 'react-router';
const React = require('react'),
      SessionStore = require('../stores/session_store'),
      SessionActions = require('../actions/session_actions'),
      Nav = require('react-bootstrap/lib/Nav'),
      Navbar = require('react-bootstrap/lib/Navbar'),
      NavItem = require('react-bootstrap/lib/NavItem'),
      NavDropdown = require('react-bootstrap/lib/NavDropdown'),
      UserAccountLink = require('./user_account_link'),
      MenuItem = require('react-bootstrap/lib/MenuItem'),
      AddFeedSourcecButton = require('./add_feed_source_button');

const MainMenu = React.createClass({
  logoutButton(e) {
    e.preventDefault();
    SessionActions.logout();
    hashHistory.push("/login");
  },

  render(){
    const username = <span><span className="glyphicon glyphicon-user"></span>&nbsp;{SessionStore.currentUser().username}</span>;
    return (
      <nav className="navbar navbar-default header shadow-bottom">

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Aggregreater&nbsp;&gt;</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight className="nav navbar-nav pull-right">
            <li><AddFeedSourcecButton /></li>
            <NavItem eventKey={1} href="#" onClick={ () => { hashHistory.push('/') } }>Home</NavItem>
            <NavItem eventKey={2} href="#" onClick={ () => { hashHistory.push('/edit') } }>Explore Feeds</NavItem>
            <NavDropdown eventKey={3} title={username} id="basic-nav-dropdown">
              <MenuItem eventKey={3.3} onClick={this.logoutButton}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </nav>
    );
  }
});

module.exports = MainMenu;