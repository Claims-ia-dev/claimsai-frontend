import { createContext, useState , useEffect} from 'react';


const AuthContext = createContext({
  isLoggedIn: false,
  role: null,
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(null);
  // const [username, setUsername] = useState(null);   
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //     axios.get('/') // API endpoint returns the user data
  //       .then(response => {
  //         setUsername(response.data.username); // Set the username from the API response
  //         setIsLoggedIn(true);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

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