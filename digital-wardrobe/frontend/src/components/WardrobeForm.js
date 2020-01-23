import React from 'react';
import { connect } from 'react-redux';
import { wardrobeActions } from '../actions';
import { Link } from 'react-router-dom';

class WardrobeForm extends React.Component {
  state = {
    wardrobe: '',
    image: null
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addWardrobe(this.state)
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Link to="/home">Back</Link>
        <h4>Add Wardrobe</h4>
        <label htmlFor="wardrobe">Wardrobe name</label>
        <input
          type="text"
          name="wardrobe"
          value={this.state.wardrobe}
          onChange={this.handle_change}
        />
        <label htmlFor="photo">Set icon</label>
        <input type="file"
          name="photo"
          id="image"
          accept="image/png, image/jpeg" onChange={this.handleImageChange} />
        <input type="submit" value="Add Wardrobe" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addWardrobe: (data) => {
      return dispatch(wardrobeActions.addWardrobe(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WardrobeForm);
