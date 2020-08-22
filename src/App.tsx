import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import MainNavigation from './UI/shared/Navigation/MainNavigation';

// Pages
import Users from './UI/user/pages/Users';
import NewPlace from './UI/places/pages/NewPlace';
import UserPlaces from './UI/places/pages/UserPlaces';
import UpdatePlace from './UI/places/pages/UpdatePlace';
import Auth from './UI/user/pages/Auth';

// Contexts
import { AuthContext } from './UI/shared/context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid: string) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
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
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route exact path="/:userId/places" >
          <UserPlaces />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        login,
        logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
