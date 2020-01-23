import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { outfitActions } from '../actions';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var domain = 'http://closetmap.herokuapp.com';

class Outfits extends React.Component {

  componentDidMount() {
    this.props.fetchOutfits()
  }

  renderImage = (outfit) => {
    if (outfit.image) {
      return (
        <div className="square-image">
          {outfit.image &&
            <img alt={outfit.name} src={domain + outfit.image} />
          }
        </div>
      )
    } else {
      return (
        <div className="outfit-default-img">
          <FontAwesomeIcon icon="walking" />
        </div>
      )
    }
  }

  render() {
    return (
      <Container>
        <Link to="/home">Back</Link>
        <h1>Your Outfits</h1>
        <p>Hint: scroll through your outfits. Click on the buttons below to add an
          outfit or switch to the items view. You can view the details of your outfit by clicking on it.</p>
        <Row>
          {this.props.outfits.map((outfit, index) => {
            return (
              <Col key={outfit.pk} xs={4} md={3} lg={2}>
                <Link to={{
                  pathname: `/outfit/${outfit.pk}`,
                  state: {
                    outfit: outfit
                  }
                }}
                  className="outfit-link"
                >
                  <h2>{outfit.name}</h2>
                  {this.renderImage(outfit)}
                </Link>
              </Col>)
          })}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    outfits: state.outfits.outfits
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOutfits: () => {
      dispatch(outfitActions.fetchOutfits())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Outfits);
