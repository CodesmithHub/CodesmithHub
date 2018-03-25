import React from 'react';
import { Navbar, NavbarBrand, Nav, Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const LogIn = props => (
  <Navbar color="info">

    <NavbarBrand>Codesmith Hub</NavbarBrand>

    <Nav className="ml-auto" navbar>
      <Form id="signin" onSubmit={props.loginInfo} >

        <InputGroup>
          <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
          <Input id="loginEmail" type="email" name="email" placeholder="email" />

          <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
          <Input id="loginPassword" type="password" name="password" placeholder="password" />

          <Button type="submit" color="primary">Log in</Button>
        </InputGroup>

      </Form>
    </Nav>

  </Navbar>
);


export default LogIn;
