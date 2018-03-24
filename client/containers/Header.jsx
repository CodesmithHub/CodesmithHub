import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header>
        <Navbar color="info">

          <NavbarBrand className="mr-auto"> Codesmith Hub </NavbarBrand>

          <Nav className="ml-auto" navbar>
            <NavItem><Link to="/">News Feed</Link></NavItem>
            <NavItem><Link to="/directory">Directory</Link></NavItem>
            <NavItem><Link to="/profile">Profile</Link></NavItem>

            <NavItem><Button type="submit" color="primary" onClick={this.props.handleLogOut}>Log Out</Button></NavItem>
          </Nav>

        </Navbar>
      </header>
    );
  }
}

export default Header;

