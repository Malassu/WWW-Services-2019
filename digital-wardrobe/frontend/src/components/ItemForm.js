import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { itemActions, wardrobeActions, categoryActions } from '../actions';
import { Link } from 'react-router-dom';

import itemPlaceholder from '../resources/item-placeholder.png';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      wardrobe: '',
      category: '',
      image: ''
    }
  }

  componentDidMount() {
    this.props.fetchWardrobes();
    this.props.fetchAllCategories(); // Fetching all categories doesn't work
  }

  onSubmit = e => {
    e.preventDefault();
    const wrd = e.target.wardrobe.value;
    const cat = e.target.category.value;
    try {
      this.props.addItem({ ...this.state, category: cat, wardrobe: wrd })
    } catch (error) {
      console.log("Error", error)
    }
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
      <div className="ItemForm">
        <Link to="/home">Back</Link>
        <form onSubmit={this.onSubmit} className="ItemForm">
          <p>Hint: Give a name to your outfit that helps you find it! You can be creative! Put it in a wardrobe and give it a category if you want to. You can also upload a photo.</p>
          <h4>Add Item</h4>
          <label htmlFor="Name">Name</label>
          <input type="text" name='Name' id='name' value={this.state.name} onChange={this.handleChange} required />
          <div>
            <label htmlFor="Wardrobe">Wardrobe: </label>
            <select name='Wardrobe' id='wardrobe' value={this.state.wardrobe} onChange={this.handleChange} required>
              {this.props.wardrobes.map((wardrobe, index) => {
                return (<option key={index} value={wardrobe.name}>{wardrobe.name}</option>);
              })}
            </select>
          </div>
          <div>
            <label htmlFor="Category">Category: </label>
            <select name='Category' id='category' value={this.state.category} onChange={this.handleChange} >
              <option key={'none'} value={null}>None</option>
              {this.props.categories.map((cat, index) => {
                return (<option key={index} value={cat.category}>{cat.category}</option>);
              })}
            </select>
          </div>
          <div>
            <label htmlFor="photo">Upload photo</label>
            <input type="file"
              name="photo"
              id="image"
              accept="image/png, image/jpeg" onChange={this.handleImageChange} />
            <input type="submit" value='Add Item' />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wardrobes: state.wardrobes.wardrobes,
    categories: state.categories.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (data) => {
      dispatch(itemActions.addItem(data))
    },
    fetchWardrobes: () => {
      dispatch(wardrobeActions.fetchWardrobes())
    },
    fetchAllCategories: () => {
      dispatch(categoryActions.fetchAllCategories())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemForm));
