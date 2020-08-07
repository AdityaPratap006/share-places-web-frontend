import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import MainNavigation from './UI/shared/components/Navigation/MainNavigation';

// Pages
import Users from './UI/user/pages/Users';
import NewPlace from './UI/places/pages/NewPlace';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route exact path="/places/new">
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
