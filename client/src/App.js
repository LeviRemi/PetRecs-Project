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
import PetHealth from './components/PetHealth'
import isUserLoggedIn from "./utils/AuthApi"
import Logout from './components/Logout'

function App(){
  return (
    <Router>
      <Route path="/" exact component={()=>isUserLoggedIn()?<Pets/> : <HomePage/>} />
      <Route path="/login" exact component={()=>isUserLoggedIn()?<Pets/> : <Login/>} />
      <Route path="/register" exact component={()=>isUserLoggedIn()?<Pets/> : <Register/>} />
      <Route path="/about" exact component={()=>isUserLoggedIn()?<About/> : <HomePage/>} />
      <Route path="/pets" exact component={()=>isUserLoggedIn()?<Pets/> : <HomePage/>} />
      <Route path="/pets/profile/:PetId" exact component={()=>isUserLoggedIn()?<PetProfile/> : <HomePage/>} />
      <Route path="/pets/health/:PetId" exact component={PetHealth} />
      <Route path="/pets/records" exact component={()=>isUserLoggedIn()?<PetRecords/> : <HomePage/>} />
      <Route path="/logout" exact component={()=>isUserLoggedIn()?<Logout/> : <HomePage/>} />
    </Router>
  );
}

export default App;
