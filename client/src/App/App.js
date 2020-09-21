import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import About from '../pages/About'
import Pets from '../pages/PostLogin/Pets/Pets'

import PetScene from '../pages/PostLogin/PetScene'

import isUserLoggedIn from "../utils/AuthApi"
import Logout from '../utils/Logout'
import {Redirect, Switch} from "react-router-dom";
import NotFound from "../pages/NotFound";
import PetCreation from "../pages/PostLogin/PetCreation";

library.add(faPlus)

function App(){
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={()=>isUserLoggedIn()?<Redirect to={"/pets"}/> : <HomePage/> } />
          <Route path="/login" exact component={()=>isUserLoggedIn()?<Redirect to={"/pets"}/> : <Login/>} />
          <Route path="/register" exact component={()=>isUserLoggedIn()?<Redirect to={"/pets"}/> : <Register/>} />
          <Route path="/logout" exact component={()=>isUserLoggedIn()?<Logout/> : <Redirect to={"/"}/>} />
          <Route path="/about" exact component={()=>isUserLoggedIn()?<About/> : <Redirect to={"/"}/>} />
          <Route path="/pets" exact component={()=>isUserLoggedIn()?<Pets/> : <Redirect to={"/"}/>} />
          <Route path="/pets/new" exact component={()=>isUserLoggedIn()?<PetCreation/> : <Redirect to={"/"}/>} />{/*Keep this component above "pets/:PetId"*/}
          <Route path="/pets/:PetId/"  component={(props)=>isUserLoggedIn()?<PetScene {...props} /> : <Redirect to={"/"}/>} />
          <Route exact component={NotFound} /> {/*Keep this component at the end*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
