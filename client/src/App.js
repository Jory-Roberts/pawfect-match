import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Authentication from './components/Authentication/Authentication';
import DogLanding from './components/DogLanding/DogLanding';
import DogDetail from './components/DogDetail/DogDetail';
import NewDogForm from './components/NewDogForm/NewDogForm';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import UseContext from './components/UseContext/UseContext';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [dogs, setDogs] = useState([]);
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchDogs();
    fetchUser();
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
      setErrors(err);
    }
  };

  const addDog = (dog) => {
    setDogs((current) => [...current, dog]);
  };

  const updateUser = (user) => setUser(user);

  if (!user)
    return (
      <>
        <Navigation updateUser={updateUser} />
        <Authentication updateUser={updateUser} />
      </>
    );

  return (
    <div>
      <main>
        <Header />
        <Navigation updateUser={updateUser} />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/dogs'
            element={<DogLanding dogs={dogs} />}
          />
          <Route
            path='/dogs/new'
            element={<NewDogForm addDog={addDog} />}
          ></Route>
          <Route
            path='/dogs/:id'
            element={<DogDetail />}
          />
          <Route
            path='/authentication'
            element={<Authentication updateUser={updateUser} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
