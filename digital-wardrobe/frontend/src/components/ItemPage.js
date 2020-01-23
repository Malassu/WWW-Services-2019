import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { outfitActions, itemActions } from '../actions';

import { Container, Row, Col, Table, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Confirm-alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

var domain = 'http://closetmap.herokuapp.com';

class ItemPage extends Component {
  constructor(props) {
    super(props)
    this.item = props.location.state.item;
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.outfitsByItem(this.item)
  }

  goBack() {
    this.props.history.goBack();
  }

  confirmDelete() {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to delete ${this.item.name}?`,
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
      this.props.deleteItem(this.item)
    } catch (err) {
      alert('An error occurred. Item not deleted.')
    }
  }

  renderImage() {
    console.log('Image', this.item.image)
    if (this.item.image) {
      return (
        <div className="square-image">
          <img className="itempage-img" alt={this.item.name} src={domain + this.item.image} />
        </div>)
    } else {
      return (
        <div className="item-placeholder-img">
          <FontAwesomeIcon icon="tshirt" />
        </div>
      )
    }
  }

  renderOutfitImage(outfit) {
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

  renderOutfits() {
    if (this.props.itemOutfits.length > 0) {
      return (
        <Row>
          {this.props.itemOutfits.map((outfit) => {
            return (
              <Col key={outfit.pk} xs={4} md={3} lg={2}>
                <Link to={{
                  pathname: `/outfit/${outfit.pk}`,
                  state: {
                    outfit: outfit
                  }
                }}
                  className="item-link"
                >
                  <h3>{outfit.name}</h3>
                  {this.renderOutfitImage(outfit)}
                </Link>

              </Col>
            )
          })}
        </Row>
      )
    } else {
      return (
        <Row>
          <Col>
            <p>This item is not yet part of any outfit</p>
          </Col>
        </Row>

      )
    }
  }

  render() {
    return (
      <div className="page-container">
        <button className="back-button" onClick={this.goBack}>Back</button>

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
              {this.renderImage()}
            </Col>
            <Col xs={12} md={6}>
              <h1 className="itempage-title">{this.item.name}</h1>
              <Table responsive>
                <tbody>
                  <tr>
                    <td>Wardrobe</td>
                    <td>{this.item.wardrobe}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{this.item.category ? this.itemcategory : '--'}</td>
                  </tr>
                  <tr>
                    <td>Season</td>
                    <td><em>Coming in future version</em></td>
                  </tr>
                  <tr>
                    <td>Tags</td>
                    <td><em>Coming in future version</em></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <h2>Outfits</h2>
           {this.renderOutfits()}
        </Container>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    itemOutfits: state.outfits.itemOutfits
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOutfits: () => {
      return dispatch(outfitActions.fetchOutfits())
    },
    outfitsByItem: (item) => {
      return dispatch(outfitActions.outfitsByItem(item))
    },
    deleteItem: (item) => {
      dispatch(itemActions.deleteItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
