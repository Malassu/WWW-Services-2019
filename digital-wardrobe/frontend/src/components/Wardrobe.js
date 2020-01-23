import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryActions, itemActions, wardrobeActions } from '../actions';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Confirm-alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

var domain = 'http://closetmap.herokuapp.com';

class Wardrobe extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.location.state.name;
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // Fetch categories in the wardrobe
    this.props.fetchWardrobeCategories(this.name)

    // Fetch items that are in the wardrobe
    if (this.name === 'Main Wardrobe') {
      this.props.fetchAllItems()
    } else {
      this.props.fetchWardrobeItems(this.name)
    }
  }

  confirmDelete() {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to delete wardrobe ${this.name}? \n All items will still be accessible through the main wardrobe.`,
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
      this.props.deleteWardrobe(this.name)
    } catch (err) {
      alert('An error occurred. Wardrobe not deleted.')
    }
  }

  renderLinks = () => {
    return (
      <div>
        <Link to={{
          pathname: '/edit-wrdb/',
          state: {
            wardrobeName: this.name,
            path: this.props.location.pathname,
          },
        }}>
          Rename wardrobe
        </Link>
        <button onClick={this.confirmDelete}>
          <FontAwesomeIcon icon="trash" />&nbsp;Delete wardrobe
        </button>
      </div>
    )
  }

  renderCategoryImage = (category) => {
    if (category.image) {
      return (
        <div className="square-image">
          {category.image &&
            <img alt={category.category} src={domain + category.image} />
          }
        </div>
      )
      // Render placeholder icon
    } else {
      return (
        <div className="category-default-img">
          <FontAwesomeIcon icon="folder" />
        </div>
      )
    }
  }

  // TODO:
  renderItemImage = (item) => {

  }

  render() {
    return (
      < div >
        {console.log('Wardrobe items', this.props.items)}
        {console.log('Wardrobe categories', this.props.categories)}
        <Link to="/home">Back to wardrobes</Link>
        {(this.name !== 'Main Wardrobe') && this.renderLinks()}
        <h1>{this.name}</h1>
        <p>Hint: scroll through your items,
          click on the buttons below to add an item or switch to the outfit view,
          you can view the details of your item by clicking on it.</p>
        <Container className="item-grid">
          <Row>
            {this.props.categories.map((category, index) => {
              return (
                <Col key={index} xs={4} md={3} lg={2}>
                  <Link to={{
                    pathname: `category/${category.category.replace(' ', '-')}`,
                    state: {
                      category: category,
                      wardrobe: this.name
                    }
                  }}
                    className="category-link"
                  >
                    <h2>{category.category}</h2>
                    {this.renderCategoryImage(category)}
                  </Link>
                </Col>
              )
            })}
            {this.props.items.filter((item) => {
              if (this.name !== 'Main Wardrobe') {
                return (item.wardrobe === this.name)
              } else {
                return true;
              }
            }).map((item, index) => {
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
                      {item.image &&
                        <img alt={item.name} src={domain + item.image} />
                      }
                    </div>
                  </Link>
                </Col>)
            })}
          </Row>
        </Container>
      </div >
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE', state)
  return {
    // State has to be modified so that items are divided by wardrobe
    items: state.items.items,
    categories: state.categories.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWardrobeCategories: (wardrobeName) => {
      return dispatch(categoryActions.fetchWardrobeCategories(wardrobeName))
    },
    fetchWardrobeItems: (wardrobe) => {
      return dispatch(itemActions.fetchWardrobeItems(wardrobe))
    },
    fetchWardrobeCategoryItems: (wardrobe, category) => {
      return dispatch(itemActions.fetchWardrobeCategoryItems(wardrobe, category))
    },
    fetchAllItems: () => {
      return dispatch(itemActions.fetchAllItems())
    },
    deleteWardrobe: (wardrobeName) => {
      return dispatch(wardrobeActions.deleteWardrobe(wardrobeName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wardrobe);
