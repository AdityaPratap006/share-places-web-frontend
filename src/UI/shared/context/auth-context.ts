import { createContext } from 'react';

interface IAuthContext {
    token: string | undefined;
    isLoggedIn: boolean;
    userId: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    token: undefined,
    isLoggedIn: false,
    userId: null,
    login: () => { },
    logout: () => { },
});