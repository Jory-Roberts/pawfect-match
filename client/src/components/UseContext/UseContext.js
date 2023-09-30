import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const UseContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchDogs();
    fetchUser();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setUser(true);
    }
  }, []);

  const fetchDogs = async () => {
    const response = await fetch('/dogs');
    const dogData = await response.json();
    setDogs(dogData);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('/authorized');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }
    } catch (err) {
      setErrors({ message: 'An error occurred while fetching the user' });
    }
  };

  const login = () => {
    setUser(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, dogs, errors, login, logout, fetchDogs, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export default UseContext;
export { useAuth };
