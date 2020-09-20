import React, {
  FC, createContext, useContext, useState, useEffect,
} from 'react';
import jwt_decode from 'jwt-decode';
import { CHATTER_TOKEN_COOKIE, getCoockie } from '../services/cookie';
import { User } from '../models/User.model';

interface AuthContextProps {
  user: User;
  isAuthorized: () => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthorized: () => false,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  // decode token from params or try to retrieve from cookie
  const getUser = (token?: string): User => {
    const tok = token ?? getCoockie(CHATTER_TOKEN_COOKIE);

    if (!tok) {
      return null;
    }

    try {
      const decodedUser: { exp: number; id: string; orig_iat: number } = jwt_decode(tok);

      return decodedUser || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const isAuthorized = () =>
    // check via getUser() method, because token could be expired and if users won't decoded navigate to login page
    !!getUser();
  useEffect(() => setUser(getUser()), []);

  return <AuthContext.Provider value={{ user, isAuthorized }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
