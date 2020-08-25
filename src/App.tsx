import React, { useState, useCallback, useEffect } from 'react';
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

function App() {
  const [checkingAuthState, setCheckingAuthState] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string) => {
    setToken(token);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
    }));
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(undefined);
    setUserId(null);
  }, []);

  useEffect(() => {
    const localUserData = localStorage.getItem('userData');
    if (localUserData) {
      const userData = JSON.parse(localUserData) as { userId: string; token: string; };
      if (userData.token) {
        setCheckingAuthState(false);
        login(userData.userId, userData.token);
      }
    }
  }, [login]);

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
