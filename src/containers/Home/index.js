import React from 'react';
import Layout from '../../components/Layout';
//import { Jumbotron } from 'react-bootstrap';
import { Container,Row,Col } from 'react-bootstrap';
import './style.css';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return (
    <div>
      <Layout>
        <Container fluid>
          <Row>
            <Col md={2}  className='sidebar'>SideBar</Col>
            <Col md={10} style={{marginLeft:'auto'}}>container</Col>
          </Row>
        </Container>
      </Layout>
    </div>
  )

}

export default Home;