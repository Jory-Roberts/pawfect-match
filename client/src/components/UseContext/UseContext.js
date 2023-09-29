import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const UseContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      setUser(true);
    }
  }, []);

  const login = () => {
    setUser(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem('isLoggedIn');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}
export default UseContext;
export { useAuth };
