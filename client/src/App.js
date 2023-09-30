import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Authentication from './components/Authentication/Authentication';
import DogLanding from './components/DogLanding/DogLanding';
import DogDetail from './components/DogDetail/DogDetail';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import UseContext from './components/UseContext/UseContext';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const response = await fetch('/dogs');
    const dogData = await response.json();
    setDogs(dogData);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <main>
        <UseContext>
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
              path='/dogs/:id'
              element={<DogDetail />}
            />
            <Route
              path='/authentication'
              element={<Authentication />}
            />
          </Routes>
        </UseContext>
      </main>
    </div>
  );
}

export default App;
