import React from 'react';
import { connect } from 'react-redux';
import { categoryActions } from '../actions';
import { Link } from 'react-router-dom';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      category: '',
      category_old: '',
      category_new: '',
      current_wd: this.props.current_wd,
      image: ''
    };
  }

  componentDidMount() {
    this.props.fetchAllCategories()
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addCategory(this.state)
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
      <form onSubmit={this.onSubmit}>
        <h4>Manage Categories</h4>
        <Link to="/home">Back</Link>
        <div>
          <label htmlFor="Category">Category: </label>
          <select name='Category' id='category_old' value={this.state.category_old} onChange={this.handleChange} >
            <option key={'none'} value={null}>None</option>
            {this.props.categories.map((cat, index) => {
              return (<option key={index} value={cat.category}>{cat.category}</option>);
            })}
          </select>
        </div>
        <div>
          <label htmlFor="New_name">New name: </label>
          <input type="text" name='New_name' id='category_new' value={this.state.category_new} onChange={this.handleChange} />
        </div>
        <p>
          <button onClick={e => this.props.deleteCategory(e, this.state)}>Delete Category</button>
          <button onClick={e => this.props.modifyCategory(e, this.state)}>Modify Category</button>
        </p>
        <label htmlFor="category">Add Category: </label>
        <input
          type="text"
          name="category"
          id="category"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <label htmlFor="photo">Upload category photo</label>
        <input type="file"
          name="photo"
          id="image"
          accept="image/png, image/jpeg" onChange={this.handleImageChange} />
        <input type="submit" value="New Category" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    wardrobes: state.wardrobes,
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: (data) => {
      return dispatch(categoryActions.addCategory(data));
    },
    fetchWardrobeCategories: (wardrobe) => {
      return dispatch(categoryActions.fetchWardrobeCategories(wardrobe));
    },
    fetchAllCategories: () => {
      return dispatch(categoryActions.fetchAllCategories());
    },
    deleteCategory: (e, data) => {
      return dispatch(categoryActions.deleteCategory(e, data));
    },
    modifyCategory: (e, data) => {
      return dispatch(categoryActions.modifyCategory(e, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
