import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemActions, wardrobeActions, categoryActions } from '../actions';
import { Link } from 'react-router-dom';

class ItemDelForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      wardrobe: '',
      new_name: '',
      category: '',
      image: ''
    };
  }

  componentDidMount() {
    this.props.fetchWardrobes();
    this.props.fetchAllCategories();
    this.props.fetchAllItems();
  }

  deleteItem = e => {
    e.preventDefault();
    this.props.deleteItem(this.state)
  }

  updateItem = e => {
    e.preventDefault();
    this.props.modifyItem(this.state)
    // e => this.props.handle_modify(e, this.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  render() {
    return (
      <div className="ItemDelForm">
        <Link to="/home">Back</Link>
        <form onSubmit={this.updateItem} className="ItemDelForm">
          <h4>Modify/Delete Item</h4>
          <div>
            <label htmlFor="Item">Item: </label>
            <select name='Item' id='name' value={this.state.name} onChange={this.handleChange} required>
              <option key={'none'} value={null}>None</option>
              {this.props.items.map((item, index) => {
                return (<option key={index} value={item.name}>{item.name}</option>);
              })}
            </select>
          </div>
          <div>
            <label htmlFor="New_name">New name: </label>
            <input type="text" name='New_name' id='new_name' value={this.state.new_name} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="Wardrobe">New Wardrobe: </label>
            <select name="Wardrobe" id='wardrobe' value={this.state.wardrobe} onChange={this.handleChange} required>
              {this.props.wardrobes.map((wardrobe, index) => {
                return (<option key={index} value={wardrobe.name}>{wardrobe.name}</option>);
              })}
            </select>
          </div>
          <div>
            <label htmlFor="Category">New Category: </label>
            <select name='Category' id='category' value={this.state.category} onChange={this.handleChange} >
              <option key={'none'} value={null}>None</option>
              {this.props.categories.map((cat, index) => {
                return (<option key={index} value={cat.category}>{cat.category}</option>);
              })}
            </select>
          </div>
          <div>
            <label htmlFor="photo">Change photo</label>
            <input type="file"
              name="photo"
              id="image"
              accept="image/png, image/jpeg" onChange={this.handleImageChange} />
          </div>
          <p>
            <button type="submit" onClick={this.deleteItem}>Delete Item</button>
            <input type="submit" value='Modify Item' />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    items: state.items.items,
    wardrobes: state.wardrobes.wardrobes,
    categories: state.categories.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: (data) => {
      dispatch(itemActions.deleteItem(data))
    },
    modifyItem: (data) => {
      dispatch(itemActions.modifyItem(data))
    },
    fetchAllItems: () => {
      dispatch(itemActions.fetchAllItems())
    },
    fetchWardrobes: () => {
      dispatch(wardrobeActions.fetchWardrobes())
    },
    fetchAllCategories: () => {
      dispatch(categoryActions.fetchAllCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDelForm);
