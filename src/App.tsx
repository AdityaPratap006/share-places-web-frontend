import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import MainNavigation from './UI/shared/Navigation/MainNavigation';

// Pages
import Users from './UI/user/pages/Users';
import NewPlace from './UI/places/pages/NewPlace';
import UserPlaces from './UI/places/pages/UserPlaces';
import UpdatePlace from './UI/places/pages/UpdatePlace';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route exact path="/:userId/places" >
            <UserPlaces />
          </Route>
          <Route exact path="/places/new">
            <NewPlace />
          </Route>
          <Route exact path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Route exact path="/auth">
            <h1>Authentication</h1>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
