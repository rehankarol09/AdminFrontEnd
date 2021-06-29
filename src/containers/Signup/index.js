import React from 'react';
import Layout from '../../components/Layout';
//import { Jumbotron } from 'react-bootstrap';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/Ui/Input';
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';


/**
* @author
* @function Signup
**/

const Signup = (props) => {

const auth = useSelector(state => state.auth);

if(auth.authenthicate){
  <Redirect  to='/'  />
}

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: '40px' }} >
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      Label="First Name"
                      type="text"
                      value=""
                      placeholder="First Name"
                      onChange={() => { }}
                    />

                  </Col>
                  <Col md={6}>
                    <Input
                      Label="Last Name"
                      type="text"
                      value=""
                      placeholder="Last Name"
                      onChange={() => { }}
                    />
                  </Col>


                </Row>
                <Input
                  Label="Email"
                  type="email"
                  value=""
                  placeholder="Email"
                  onChange={() => { }}
                />
                <Input
                  Label="Password"
                  type="password"
                  value=""
                  placeholder="Password"
                  onChange={() => { }}
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