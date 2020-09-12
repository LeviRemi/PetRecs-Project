import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Pets from './components/Pets'
import PetProfile from './components/PetProfile'
import PetRecords from './components/PetRecords'

function App(){
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/about" exact component={About} />
      <Route path="/pets" exact component={Pets} />
      <Route path="/pets/profile" exact component={PetProfile} />
      <Route path="/pets/records" exact component={PetRecords} />
    </Router>
  );
}

export default App;
