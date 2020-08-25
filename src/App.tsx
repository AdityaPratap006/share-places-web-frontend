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

interface UserLocalStorage {
  userId: string;
  token: string;
  expiration: string;
}

let logoutTimer: NodeJS.Timeout;

function App() {
  const [checkingAuthState, setCheckingAuthState] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();

  const login = useCallback((uid: string, token: string, expirationDate?: Date) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString(),
    } as UserLocalStorage));

  }, []);

  const logout = useCallback(() => {
    setToken(undefined);
    setTokenExpirationDate(undefined);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const localUserData = localStorage.getItem('userData');
    if (localUserData) {
      const userData = JSON.parse(localUserData) as UserLocalStorage;
      if (userData.token && new Date(userData.expiration) > new Date()) {
        login(userData.userId, userData.token, new Date(userData.expiration));
      }
    }
    setCheckingAuthState(false);
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
