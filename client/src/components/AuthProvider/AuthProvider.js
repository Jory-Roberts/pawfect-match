import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const response = await fetch('/check-session');

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setErrors(errorData);
        setUser(null);
      }
    } catch (err) {
      setErrors({ message: 'An error occurred. Unable to verify username' });
      setUser(null);
    }
  };

  const login = async (userData) => {
    await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    setUser(userData);
  };

  const logout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });

      if (response.ok) {
        await response.json();
        setUser(null);
      } else {
        const logoutError = await response.json();
        setErrors(logoutError);
      }
    } catch (err) {
      setErrors({ message: 'An error occurred. Unable to logout' });
    }
  };

  return (
    <AuthContext.Provider value={{ user, errors, login, logout, checkUserSession }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
