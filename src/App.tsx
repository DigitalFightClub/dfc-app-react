import React from 'react';
import MenuAppBar from './components/menuAppBar';
import Gym from './components/gym';
import GymFighters from './components/gymFighters';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <hr />
      <Gym/>
      <hr/>
      <GymFighters/>
    </div>
  );
}

export default App;
