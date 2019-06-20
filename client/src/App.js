import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { history } from './helpers/history';
import { alertActions } from './_actions/alert.actions';
import PrivateRoute from './components/PrivateRoute';
import { store } from './helpers/store';

// import Chat from './pages/Chat';

import { Nav } from './containers/Nav';
import Footer from './components/Footer';

import GetStarted from './pages/GetStarted';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import GigEdit from './pages/GigEdit';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import New from './pages/GigNew';
import { Gig } from './pages/Gig';
import Settings from './pages/Settings';

console.log(process.env)
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
              <PrivateRoute path="/settings" component={ Settings } />
              <PrivateRoute path="/messages" component={ Messages } />
              
              <PrivateRoute exact path="/editprofile" component={ ProfileEdit } />
              <PrivateRoute path="/editgig/:username/:gigTitle" component={ GigEdit } />
    
              <Route path="/:username/:gigTitle" component={ Gig } />
              <Route exact path="/" component={ Search } />
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
