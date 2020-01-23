import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemActions, outfitActions } from '../actions';
import { Link } from 'react-router-dom';

class OutfitForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      items: [],
      item: '',
      image: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllItems();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addOutfit(this.state)
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

  handle_add = (e) => {
    e.preventDefault();
    if (this.state.item === 'None' || this.state.item === '') {
      return;
    }
    this.state.items.push(this.state.item);
    this.setState({ item: '' });
    console.log(this.state.items);
  };

  // Todo: write

  render() {
    return (
      <div className="OutfitForm">
        <form onSubmit={this.onSubmit} className="OutfitForm">
          <h4>Create outfit</h4>
          <Link to="/home">Back</Link>
          <p>Hint: you are in the shoes of a fashion designer: what do you want to wear? Add item to combine them in your dream outfit and name your creation!
</p>
          <div>
            <label htmlFor="Item">Add item: </label>
            <select name='Item' id='item' value={this.state.item} onChange={this.handleChange} >
              <option key={'none'} value={null}>None</option>
              {this.props.items.map((item, index) => {
                return (<option key={index} value={item.name}>{item.name}</option>);
              })}
            </select>
          </div>
          <div>Added items:</div>
          <ul>
            {this.state.items.map(id => (<Row id={id} />))}
          </ul>
          <button onClick={this.handle_add}>Add Item</button>
          <div>
            <label htmlFor="name">Outfit name: </label>
            <input type="text" name='name' id='name' value={this.state.name} onChange={this.handleChange} required />
          </div>
          <div>
            <label htmlFor="photo">Add photo</label>
            <input type="file"
              name="photo"
              id="image"
              accept="image/png, image/jpeg" onChange={this.handleImageChange} />
          </div>
          <p>

            <input type="submit" value='Create outfit' />
          </p>
        </form>
      </div>
    );
  }
}

const Row = ({ id }) => (
  <li key={id}>{id}</li>
);

const mapStateToProps = state => {
  return {
    items: state.items.items,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllItems: () => {
      dispatch(itemActions.fetchAllItems())
    },
    addOutfit: (data) => {
      dispatch(outfitActions.addOutfit(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutfitForm);