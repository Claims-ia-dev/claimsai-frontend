import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userinfo:null,
  token: null,
  login: () => {},
  logout: () => {}
});