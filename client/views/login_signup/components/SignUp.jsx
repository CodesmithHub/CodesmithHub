import React from 'react';
import { Container, Col, Row, Form, Button, Input, InputGroup, Label } from 'reactstrap';


const SignUp = props => (
  <Container>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }}>

        <h4>SignUp</h4>

        <Form onSubmit={props.userInfo}>
          <Label>First Name</Label>
          <InputGroup>
            <Input type="text" id="firstname" name="firstname" placeholder="First Name" />
          </InputGroup>

          <Label>Last Name</Label>
          <InputGroup>
            <Input type="text" id="lastname" name="lastname" placeholder="Last Name" />
          </InputGroup>

          <Label>Email Address</Label>
          <InputGroup>
            <Input type="email" id="email" name="email" placeholder="Email" />
          </InputGroup>

          <Label>Password</Label>
          <InputGroup>
            <Input type="password" id="password" name="password" placeholder="Password" />
          </InputGroup>

          <Label>Where do you consider yourself from?</Label>
          <InputGroup>
            <Input type="textarea" id="hometown" name="hometown" />
          </InputGroup>

          <Label>What were you doing before Codesmith?</Label>
          <InputGroup>
            <Input type="textarea" id="past" name="past" />
          </InputGroup>

          <Label>What do you want to do with your coding skills?</Label>
          <InputGroup>
            <Input type="textarea" id="future" name="future" />
          </InputGroup>
          
          <Label>What are your passions and hobbies?</Label>
          <InputGroup>
            <Input type="textarea" id="hobbies" name="hobbies" />
          </InputGroup>

          <Label>What is a fun or random fact about yourself?</Label>
          <InputGroup>
            <Input type="textarea" id="random" name="random" />
          </InputGroup>

          <Button type="submit" color="primary">Create Account</Button>
        </Form>

      </Col>
    </Row>
  </Container>
);

export default SignUp;
