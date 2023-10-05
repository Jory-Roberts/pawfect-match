import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import DogLanding from './components/DogLanding/DogLanding';
import DogDetail from './components/DogDetail/DogDetail';
import NewDogForm from './components/NewDogForm/NewDogForm';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchDogs();
  }, []);

  const fetchUser = async () => {
    const response = await fetch('/check_session');
    const userData = await response.json();
    setUser(userData);
  };

  const fetchDogs = async () => {
    const response = await fetch('/dogs');
    const dogData = await response.json();
    setDogs(dogData);
  };

  const addDog = (dog) => {
    setDogs((current) => [...current, dog]);
  };

  const handleSetUser = (user) => {
    setUser(user);
    navigate('/');
  };

  return (
    <div>
      <main>
        <Header />
        <Navigation />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/signup'
            element={<SignUp onSignUp={handleSetUser} />}
          />
          <Route
            path='/login'
            element={<Login onLogIn={handleSetUser} />}
          />
          <Route
            path='/dogs'
            element={<DogLanding dogs={dogs} />}
          />
          <Route
            path='/dogs/new'
            element={<NewDogForm addDog={addDog} />}
          />
          <Route
            path='/dogs/:id'
            element={<DogDetail user={user} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
