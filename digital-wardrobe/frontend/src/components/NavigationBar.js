import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../actions';

// Resources
import hangerlogo from '../resources/ClosetMap-logo-hanger.svg';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavigationBar extends React.Component {

  render() {
    return (
      <Navbar sticky='top'>
        <Navbar.Brand>
          <a href='/home'>
            <img src={hangerlogo} alt='Closet Map' style={{ height: 35, marginTop: -7 }} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/outfits'>Outfits</Nav.Link>
            <Nav.Link href='/addwrdb'>Add wardrobe</Nav.Link>
            <Nav.Link href='/additem'>Add item</Nav.Link>
            <Nav.Link href='/addcat'>Add category</Nav.Link>
            <Nav.Link href='/addoutfit'>Add outfit</Nav.Link>
            <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    // username: state.auth.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);