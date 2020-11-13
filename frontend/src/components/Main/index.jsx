import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';

import Header from '../Header';
import Login from '../Login';
import Profile from '../Profile';
import Application from '../Application';
import Cookies from 'js-cookie';

function isAuthorized() {
  return !!Cookies.get('auth');
}

function checkAuth(component) {
  if (isAuthorized()) {
    return component;
  }
  return <Redirect to="/sign" />
}

const Main = () => (
  <div className="Main container-md">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          { checkAuth(<Redirect to="/profile" />) }
        </Route>
        <Route exact path="/sign">
          { !isAuthorized() && <Login /> || <Redirect to="/profile" />}
        </Route>
        <Route exact path="/profile">
           {/* todo: uncomment it!  checkAuth(<Profile />) */}
          <Profile />
        </Route>
        <Route exact path="/applications">
          {/* todo: uncomment it!  checkAuth(<Application/>) */}
          <Application/>
        </Route>
      </Switch>
    </Router>
  </div>
);

export default Main;
