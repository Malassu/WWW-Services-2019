import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { outfitActions } from '../actions';

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Confirm-alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

var domain = 'http://closetmap.herokuapp.com';

class OutfitPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      _isMounted: false
    }

    this.outfit = props.location.state.outfit;
    this.goBack = this.goBack.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true
    this.props.openOutfit(this.props.location.state.outfit).then(() => {
      if (this._isMounted) {
        this.setState({
          loading: false,
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  goBack() {
    this.props.history.goBack();
  }

  confirmDelete() {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to delete outfit ${this.outfit.name}?`,
      buttons: [
        {
          label: 'Yes, delete',
          onClick: () => this.handleDelete()
        },
        {
          label: 'Cancel'
        }
      ]
    })
  }

  handleDelete() {
    try {
      this.props.deleteOutfit(this.outfit)
    } catch (err) {
      alert('An error occurred. Item not deleted.')
    }
  }

  render() {
    if (this.loading) {
      return (
        <div>Loading...</div>
      )
    } else {
      console.log('Props loaded: ', this.props.outfitItems)
      return (
        <div className="page-container">
          <Link className="back-button" to="/outfits">Back to outfits</Link>
          <Link to={{
            pathname: '/del-item/',
            state: this.item,
          }}>
            Edit item
        </Link>
          <button onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;Delete item
        </button>

          <Container>
            <Row>
              <Col xs={12} md={6}>
                <div className="square-image">
                  {this.outfit.image &&
                    <img className="itempage-img" alt={this.outfit.name} src={domain + this.outfit.image} />
                  }
                </div>
              </Col>
              <Col xs={12} md={6}>
                <h1 className="itempage-title">{this.outfit.name}</h1>
              </Col>
              <Col xs={12}>
                <h2>This outfit consists of...</h2>
              </Col>
            </Row>
            <Row>
              {this.props.outfitItems.map((item) => {
                return (
                  <Col key={item.pk} xs={4} md={3} lg={2}>
                    <Link to={{
                      pathname: `/items/${item.pk}`,
                      state: {
                        item: item
                      }
                    }}
                      className="item-link"
                    >
                      <h3>{item.name}</h3>
                      <div className="square-image">
                        {item.image &&
                          <img alt={item.name} src={domain + item.image} />
                        }
                      </div>
                    </Link>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div >
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    outfitItems: state.outfits.openOutfitItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openOutfit: (outfit) => {
      return dispatch(outfitActions.openOutfit(outfit))
    },
    deleteOutfit: (outfit) => {
      return dispatch(outfitActions.deleteOutfit(outfit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutfitPage);
