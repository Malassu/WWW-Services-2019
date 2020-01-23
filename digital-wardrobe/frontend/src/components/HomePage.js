import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { wardrobeActions, authActions } from '../actions';
import NavigationBar from './NavigationBar';

import 'react-multi-carousel/lib/styles.css';

// Slick carousel
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from './SliderArrows';

import '../styles/style.scss';

// Resources
import closeticon from '../resources/closet.png';
// import maincloseticon from '../resources/closet2.png';
var domain = 'http://closetmap.herokuapp.com';
/* Component that represents the 'home page' user lands on after logging in */
class HomePage extends React.Component {

  componentDidMount() {
    this.props.fetchWardrobes();
    console.log(this.props.wardrobes)
  }

  render() {
    const sliderSettings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      className: 'slides',
      infinite: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className="home-container">
        <h1>Welcome to Your Wardrobes</h1>
        <p> Hint: Scroll to see your wardrobes and click on the buttons below to add a wardrobe or an item. The Main wardrobe contains all your clothes.
          </p>
        <Slider {...sliderSettings}>
          {console.log('WARDROBES', this.props.wardrobes)}
          {this.props.wardrobes.map(function (wrd) {
            let imgsrc = wrd.image ? (domain + wrd.image) : closeticon
            return (
              <div className="carousel-wardrobe" key={wrd.pk}>
                <h2>{wrd.name}</h2>
                <Link key={wrd.pk} to={{
                  pathname: `/wrdbs/${wrd.pk}`,
                  state: {
                    name: wrd.name
                  }
                }}>
                  <img alt={wrd.name} src={imgsrc} />
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}

// "Map" application state to the props of the component    <li><Link to="/del-wrdb">Delete wardrobe</Link> </li>
const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    wardrobes: state.wardrobes.wardrobes,
    user: state.auth.user
  }
}

// Mapping action dispatcher functions to props
const mapDispatchToProps = dispatch => {
  return {
    fetchWardrobes: () => {
      dispatch(wardrobeActions.fetchWardrobes());
    },
    logout: () => dispatch(authActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
