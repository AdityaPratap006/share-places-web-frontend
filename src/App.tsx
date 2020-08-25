import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Components
import MainNavigation from './UI/shared/Navigation/MainNavigation';

// Pages
import Users from './UI/user/pages/Users';
import NewPlace from './UI/places/pages/NewPlace';
import UserPlaces from './UI/places/pages/UserPlaces';
import UpdatePlace from './UI/places/pages/UpdatePlace';
import Auth from './UI/user/pages/Auth';
import SplashScreen from './UI/shared/pages/SplashScreen';

// Contexts
import { AuthContext } from './UI/shared/context';

// hooks
import { useAuth } from './UI/shared/hooks';

function App() {
  const { checkingAuthState, token, userId, login, logout } = useAuth();

  if (checkingAuthState) {
    return <SplashScreen />;
  }

  let routes;

  if (token) {
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
        token,
        isLoggedIn: !!token,
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
