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

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout
      }}
    >
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
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
