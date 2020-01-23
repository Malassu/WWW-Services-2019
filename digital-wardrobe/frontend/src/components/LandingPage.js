import React from 'react';
import { Link } from 'react-router-dom';

// Resources
import mainlogo from '../resources/ClosetMap-logo.png';

import LoggedOutNav from './LoggedOutNav';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/style.css'

class LandingPage extends React.Component {

  render() {
    return (
      <div>
        <LoggedOutNav />
        <div className='hero-image'>
          <img src={mainlogo} alt='Closet Map' className='headerLogo' />
          <p className='slogan'>Multiple closets all organized in your pocket!</p>
        </div>
        <Container>
          <Row>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <button onClick={() => this.props.history.push('/signup')}>Sign up</button>
              <p>Or <Link to='/login'> log in</Link></p>
              <div>
                <h2>How does it work?</h2>
                <ol>
                  <li>Create your wardrobes</li>
                  <li>Add your clothes</li>
                  <li>Find it whenever your need!</li>
                </ol>
              </div>
              <p>
                To find you clothes with ability,
                Remember to use your creativity,
                The closet map is your servant,
              To help you find your garment.</p>
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

export default LandingPage;