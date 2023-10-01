import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Authentication from './components/Authentication/Authentication';
import DogLanding from './components/DogLanding/DogLanding';
import DogDetail from './components/DogDetail/DogDetail';
import NewDogForm from './components/NewDogForm/NewDogForm';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import AuthProvider, { useAuth } from './components/AuthProvider/AuthProvider';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [dogs, setDogs] = useState([]);
  const { user, checkUserSession } = useAuth();

  useEffect(() => {
    fetchDogs();
    checkUserSession();
  }, []);

  const fetchDogs = async () => {
    const response = await fetch('/dogs');
    const dogData = await response.json();
    setDogs(dogData);
  };

  const addDog = (dog) => {
    setDogs((current) => [...current, dog]);
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
            path='/dogs'
            element={<DogLanding dogs={dogs} />}
          />
          <Route
            path='/dogs/new'
            element={<NewDogForm addDog={addDog} />}
          />
          <Route
            path='/dogs/:id'
            element={<DogDetail />}
          />
          <Route
            path='/authentication'
            element={<Authentication />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
