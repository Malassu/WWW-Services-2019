import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryActions, itemActions } from '../actions';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Confirm-alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

var domain = 'http://closetmap.herokuapp.com';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props)

    // Get data relayed through link from previous view
    this.category = props.location.state.category
    this.wardrobe = props.location.state.wardrobe

    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchWardrobeCategoryItems(this.wardrobe, this.category.category);
  }

  // TODO:
  confirmDelete() {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to delete category ${this.category}? \n All items will remain in the wardrobe.`,
      buttons: [
        {
          label: 'Yes, delete',
          onClick: () => alert('Not implemented!')
        },
        {
          label: 'Cancel'
        }
      ]
    })
  }

  handleDelete() {
    try {
      // TODO: Delete category
      console.log('NOT IMPLEMENTED')
    } catch (err) {
      alert('An error occurred. Category not deleted.')
    }
  }

  renderItems() {
    return (
      <Row>
        {this.props.items.map((item) => {
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
                <h2>{item.name}</h2>
                <div className="square-image">

                  { // TODO: Render placeholder image!
                    item.image &&
                    <img alt={item.name} src={domain + item.image} />
                  }
                </div>
              </Link>
            </Col>)
        })
        }
      </Row>
    )
  }

  renderItemImage = () => {

  }

  /**
   * TODO:
   * - Add back link
   * - Add link to renaming category
   * - Add link for deleting category
   */

  render() {
    return (
      <div>
        <Link className="back-link" to="/home">Back to wardrobes</Link>
        <h1>{this.wardrobe}: {this.category.category}</h1>
        <Container className="item-grid">
          {this.renderItems()}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWardrobeCategoryItems: (wardrobeName, categoryName) => {
      return dispatch(itemActions.fetchWardrobeCategoryItems(wardrobeName, categoryName))
    },
    deleteCategory: (e, data) => {
      return dispatch(categoryActions.deleteCategory(e, data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
