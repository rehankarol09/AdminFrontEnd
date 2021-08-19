import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/Ui/Input'
import {login} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  
  const Userlogin = (e) => {

    e.preventDefault();

    const user = {
      email, 
      password
    }

    dispatch(login(user));
  }

  if (auth.authenthicate) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: '40px' ,paddingTop:"60px"}} >
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={Userlogin}>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) =>setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value) }
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

export default Signin;