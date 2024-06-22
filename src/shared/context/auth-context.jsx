import { createContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  role: null,
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const login = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };