import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import Pets from './components/PostLogin/Pets'
import PetProfile from './components/PostLogin/PetProfile'
import PetRecords from './components/PostLogin/PetRecords'
import PetHealth from './components/PostLogin/PetHealth'
import PetTestPage from './components/PostLogin/PetTestPage'
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
      <Route path="/pets/profile/:PetId" exact component={(props)=>isUserLoggedIn()?<PetProfile {...props} /> : <HomePage/>} />
      <Route path="/pets/health/:PetId" exact component={(props)=>isUserLoggedIn()?<PetHealth {...props} /> : <HomePage/>} />
      <Route path="/pets/records" exact component={()=>isUserLoggedIn()?<PetRecords/> : <HomePage/>} />
      <Route path="/logout" exact component={()=>isUserLoggedIn()?<Logout/> : <HomePage/>} />

      <Route path="/pets/testpage/" exact component={(props)=> < PetTestPage {...props} />} />
    </Router>
  );
}

export default App;
