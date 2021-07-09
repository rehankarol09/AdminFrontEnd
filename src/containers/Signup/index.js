import React from 'react';
import Layout from '../../components/Layout';

import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import Input from '../../components/Ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { signup } from '../../actions';
import './style.css';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const[error, setError] = useState('');
  const dispatch = useDispatch();


  const register = (e) => {

    e.preventDefault();
    const user = { firstname, lastname, email, password };
    dispatch(signup(user));

  }


  if (auth.authenthicate) {
    return <Redirect to='/' />
  }


  if (user.loading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>

  }

  return (
    <div>
      <Layout>
        <Container>
          {user.message}
          <Row style={{ marginTop: '40px' ,paddingTop:"60px"}} >
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={register}>
                <Row>
                  <Col md={6}>
                    <Input
                      Label="First Name"
                      type="text"
                      value={firstname}
                      placeholder="First Name"
                      onChange={(e) => setFirstname(e.target.value)}
                    />

                  </Col>
                  <Col md={6}>
                    <Input
                      Label="Last Name"
                      type="text"
                      value={lastname}
                      placeholder="Last Name"
                      onChange={(e) => { setLastname(e.target.value) }}
                    />
                  </Col>


                </Row>
                <Input
                  Label="Email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                  Label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => { setPassword(e.target.value) }}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>


      </Layout>
    </div>
  )

}

export default Signup;