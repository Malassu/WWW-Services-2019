import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import hangerlogo from '../resources/ClosetMap-logo-hanger.svg';

class LoggedOutNav extends React.Component {
  render() {
    return (
      <Navbar sticky='top'>
        <Navbar.Brand>
          <a href='/'>
            <img src={hangerlogo} alt='Closet Map' style={{ height: 35, marginTop: -7 }} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/faq'>FAQs</Nav.Link>
            <Nav.Link href='/welcome'>Welcome</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default LoggedOutNav;