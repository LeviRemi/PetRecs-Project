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
import PetProfile from '../pages/PostLogin/PetProfile'
import PetRecords from '../pages/PostLogin/PetRecords'
import PetHealth from '../pages/PostLogin/PetHealth'
import PetEvents from '../pages/PostLogin/PetEvents'
import PetTestPage from '../pages/PostLogin/PetTestPage'
import isUserLoggedIn from "../utils/AuthApi"
import Logout from '../utils/Logout'

library.add(faPlus)

function App(){
  return (
    /*
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

      <Route path="/pets/testpage/:PetId" exact component={()=> < PetTestPage />} />
    </Router>
    */
    //un auth test router
    <Router>
      <Route path="/" exact component={()=><Pets/>} />
      <Route path="/login" exact component={()=><Pets/>} />
      <Route path="/register" exact component={()=><Pets/>} />
      <Route path="/about" exact component={()=><About/> } />
      <Route path="/pets" exact component={()=><Pets/> } />
      <Route path="/pets/profile/:PetId" exact component={(props)=><PetProfile {...props} />} />
      <Route path="/pets/health/:PetId" exact component={(props)=><PetHealth {...props} />} />
      <Route path="/pets/events/:PetId" exact component={(props)=><PetEvents {...props} />} />
      <Route path="/pets/records/:PetId" exact component={(props)=><PetRecords {...props} />} />
      <Route path="/logout" exact component={()=><Logout/>} />

      <Route path="/pets/testpage/:PetId" exact component={()=> < PetTestPage />} />
    </Router>


  );
}

export default App;
