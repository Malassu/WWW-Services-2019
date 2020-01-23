import React, { Component } from 'react';
import { connect } from 'react-redux';
import { wardrobeActions } from '../actions';
import { Link } from 'react-router-dom';

class WardrobeRenameForm extends Component {
  constructor(props) {
    super(props)

    this.wardrobeName = props.location.state.wardrobeName;
    this.wrdbPath = props.location.state.path;

    this.state = {
      new_name: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault()
    // e => this.props.wd_modify(e, this.state)
    try {
      this.props.modifyWardrobe(this.wardrobeName, this.state.new_name)
      this.props.history.push(this.wrdbPath, { name: this.state.new_name })
    } catch (err) {
      console.log('Error', err)
    }
  }

  render() {
    return (
      <div className="WardrobeDelForm">
        <Link to="/home">Back</Link>
        <form onSubmit={this.onSubmit} className="WardrobeDelForm">
          <h4>Rename wardrobe '{this.wardrobeName}'</h4>
          <div>
            <label htmlFor="New_name">New name: </label>
            <input type="text" name='New_name' id='new_name' value={this.state.new_name} onChange={this.handleChange} />
          </div>
          <p>
            <input type="submit" value='Modify Wardrobe' />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wardrobes: state.wardrobes.wardrobes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteWardrobe: (wardrobeName) => {
      dispatch(wardrobeActions.deleteWardrobe(wardrobeName))
    },
    modifyWardrobe: (wardrobeName, newName) => {
      dispatch(wardrobeActions.modifyWardrobe(wardrobeName, newName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WardrobeRenameForm);