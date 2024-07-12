import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userinfo, setuserinfo] = useState(false);
  const [role, setRole] = useState(null);

  const login = useCallback((uid, token, user, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setuserinfo(user);
    setRole(user.user_type?user.user_type:'guest');
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,       
        token: token, 
        userinfo: user,
        role: user.user_type?user.user_type:'guest',
        expiration: tokenExpirationDate.toISOString(),
       
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setuserinfo(null);
    setRole(null);
    localStorage.removeItem('userData');
  }, []);

  const changeRole = useCallback((newrole, expirationDate) => {    
    setRole(newrole);
    const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,       
        token: token, 
        userinfo: userinfo,
        role: newrole,
        expiration: tokenExpirationDate.toISOString(),
       
      })
    );
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
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.userinfo, new Date(storedData.expiration));
    }
  }, [login]);
  return { token, login, logout, userId, userinfo, role, changeRole };
};