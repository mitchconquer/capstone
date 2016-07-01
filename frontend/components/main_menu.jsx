import { Link, hashHistory } from 'react-router';
const React = require('react'),
      Nav = require('react-bootstrap/lib/Nav'),
      Navbar = require('react-bootstrap/lib/NavBar'),
      NavItem = require('react-bootstrap/lib/NavItem'),
      NavDropdown = require('react-bootstrap/lib/NavDropdown'),
      UserAccountLink = require('./user_account_link'),
      MenuItem = require('react-bootstrap/lib/MenuItem');

const MainMenu = React.createClass({
  render(){
    return (
      <nav className="navbar navbar-default header">

        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Aggregreater</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
        
              <UserAccountLink />

          <Nav pullRight>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavItem eventKey={2} href="#">Edit Feeds</NavItem>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Profile</MenuItem>
              <MenuItem eventKey={3.2}>Settings</MenuItem>
              <MenuItem eventKey={3.3}>Comments</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </nav>
    );
  }
});

module.exports = MainMenu;