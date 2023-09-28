import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/DogDetail';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import 'bootstrap/scss/bootstrap.scss';

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
        <Header />
        <Navigation />
        <Routes>
          <Route
            path='/'
            element={<Home dogs={dogs} />}
          />
          <Route
            path='/dogs/:id'
            element={<DogDetail />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
