import React, { Component } from 'react';

/* Router */
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { history } from './router/history';

/* Redux */
import { Provider, connect } from "react-redux";
import rootReducer from './reducers';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authActions } from './actions';

/* Components */
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ItemForm from './components/ItemForm';
import ItemDelForm from './components/ItemDelForm';
import ItemPage from './components/ItemPage';
import CategoryPage from './components/CategoryPage';
import CategoryForm from './components/CategoryForm';
import HomePage from './components/HomePage';
import OutfitForm from './components/OutfitForm';
import Outfits from './components/Outfits';
import OutfitPage from './components/OutfitPage';
import Wardrobe from './components/Wardrobe';
import WardrobeForm from './components/WardrobeForm';
import WardrobeRenameForm from './components/WardrobeRenameForm';
import Welcome from './components/Welcome';
import FAQ from './components/FAQ';
import NavigationBar from './components/NavigationBar';

/* Styles */
import './styles/style.scss';

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTrash, faFolder, faTshirt, faWalking } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faTrash, faFolder, faTshirt, faWalking);

var domain = 'http://closetmap.herokuapp.com';

// Create a redux store using the combined reducer from reducers/index.js
const reduxStore = createStore(
  rootReducer, applyMiddleware(thunk)
);

class AppContainerComp extends Component {

  componentDidMount() {
    // TODO: Check whether user is logged in, before trying to load user
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return (
          <div>
            <NavigationBar />
            <ChildComponent {...props} />
          </div>
        )
      }
    }} />
  }

  render() {
    let { PrivateRoute } = this;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/FAQ" component={FAQ} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/addwrdb" component={WardrobeForm} />
          <PrivateRoute exact path="/addcat" component={CategoryForm} />
          <PrivateRoute exact path="/additem" component={ItemForm} />
          <PrivateRoute exact path="/wrdbs/:wardrobeId" component={Wardrobe} />
          <PrivateRoute exact path="/wrdbs/:wardbrobeId/:category" component={CategoryPage} />
          <PrivateRoute exact path="/items/:itemId" component={ItemPage} />
          <PrivateRoute exact path="/del-item" component={ItemDelForm} />
          <PrivateRoute exact path="/edit-wrdb" component={WardrobeRenameForm} />
          <PrivateRoute exact path="/outfits" component={Outfits} />
          <PrivateRoute exact path="/outfit/:outfitId" component={OutfitPage} />
          <PrivateRoute exact path="/addoutfit" component={OutfitForm} />
          <Route component={NotFound} />
        </Switch>
      </ Router >
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(authActions.loadUser());
    }
  }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainerComp);

class App extends Component {

  render() {
    return (
      <Provider store={reduxStore}>
        <AppContainer />
      </Provider>
    );
  }

  // TODO: Implement in actions
  wd_view = (e) => {
    e.preventDefault();
    var war = e.target.value;
    this.get_cats(war);
    if (war) {
      let data = { wardrobe: war, category: '' };
      var items = [];
      var items_str = [];
      fetch(domain + '/get_items/', {
        method: 'POST',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          //handle items here
          var url = '';
          for (var i = 0; i < json.length; i++) {
            url = (json[i].image).substring(16);
            items.push(<div key={i}><img src={url} alt={json[i].name} name={json[i].name} width="100" height="100" /><figcaption>{json[i].name}</figcaption></div>);
            items_str.push(json[i].name);
          }
          this.setState({ displayed_form: '', current_wd: war, items: items, items_str: items_str, ofs: false });
          this.all_cats();
        });
    }
    else {
      this.setState({ displayed_form: '', current_wd: war, items: [], items_str: [] });
      this.all_cats();
      this.all_items();
    }
  };

  // TODO: Implement in actions
  open_cats = (e) => {
    e.preventDefault();
    var cat = e.target.id;
    var war = this.state.current_wd;
    let data = { wardrobe: war, category: cat };
    var items = [];
    var items_str = [];
    fetch(domain + '/get_items/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        //handle items here
        var url = '';
        for (var i = 0; i < json.length; i++) {
          if (json[i].image) {
            url = (json[i].image).substring(16);
          }
          items.push(<div key={i}><img src={url} name={json[i].name} width="100" height="100" alt="Item_photo" /><figcaption>{json[i].name}</figcaption></div>);
          items_str.push(json[i].name);
        }
        this.setState({ categories: [], displayed_form: '', current_wd: war, items: items, items_str: items_str });
        this.all_cats();
      });
  };

}

export default App;
