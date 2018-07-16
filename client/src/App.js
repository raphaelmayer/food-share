import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { history } from './helpers/history';
import { alertActions } from './_actions/alert.actions';
import PrivateRoute from './components/PrivateRoute';
import { store } from './helpers/store';

import Chat from './containers/Chat';

import { Nav } from './containers/nav';
import GetStarted from './components/GetStarted';
import Profile from './containers/profile';
import ProfileEdit from './containers/ProfileEdit';
import GigEdit from './containers/GigEdit';
import { Find } from './containers/find';
import { Login } from './containers/login';
import { Register } from './containers/register';
import Footer from './components/footer';
import New from './containers/new';
import { Gig } from './containers/gig';
import Settings from './containers/settings';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  componentDidMount() {
    //this.setState(store.getState())
    //console.log("store", store.getState());
    //console.log("this.state", this.state);
    //console.log("this.props", this.props);
  }

  render() {
    const { alert, auth } = this.props;
    return (
        <Router history={ history }>
          <div className="App">
            
            { alert ? alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div> : null }
  
            <Nav />

            <Switch>
              <Route path="/register" component={ Register } />
              <Route path="/login" component={ Login } />
              <Route path="/getstarted" component={ GetStarted } />
              <Route path="/settings" component={ Settings } />
              
              <PrivateRoute exact path="/editprofile" component={ ProfileEdit } />
              <Route exact path="/chat" component={ Chat } />
              <PrivateRoute path="/editgig/:username/:gigTitle" component={ GigEdit } />
    
              <Route path="/:username/:gigTitle" component={ Gig } />
              <Route exact path="/" component={ Find } />
              <PrivateRoute path="/new" component={ New } />
              <Route exact path="/:username" component={ Profile } />
            </Switch> 
  
            <Footer />
  
          </div>
        </Router>
    );
  }
}

function mapStateToProps(state) {
    const { alert, auth, client } = state;
    return {
        alert,
        auth,
        client
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
