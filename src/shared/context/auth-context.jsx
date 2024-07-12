import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userinfo:null,
  role:null,
  token: null,
  login: () => {},
  logout: () => {},
  changeRole: () => {},
  plan: null
});