import { useState, useCallback, useEffect } from 'react';

interface UserLocalStorage {
    userId: string;
    token: string;
    expiration: string;
}


let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
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

    return { checkingAuthState, userId, token, login, logout };
};