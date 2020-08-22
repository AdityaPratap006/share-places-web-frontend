import { createContext } from 'react';

interface IAuthContext {
    isLoggedIn: boolean;
    userId: string | null;
    login: (uid: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    userId: null,
    login: () => { },
    logout: () => { },
});