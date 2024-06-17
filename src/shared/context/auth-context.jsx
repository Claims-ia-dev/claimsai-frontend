import { createContext } from 'react';

/**
 * Create an AuthContext with default values.
 * 
 * The context has three properties:
 *  - isLoggedIn: a boolean indicating whether the user is logged in
 *  - login: a function to log the user in
 *  - logout: a function to log the user out
 */
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});
