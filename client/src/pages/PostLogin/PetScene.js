// PetScene.js

import React, {useState } from 'react';
import { useParams } from 'react-router';
import {Route, Switch} from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import PetRecordsComponent from './PetRecordsComponent.js';
import PetHealthComponent from './PetHealthComponent.js';
import PetEventsComponent from './PetEventsComponent.js';
import PetRemindersComponent from './PetRemindersComponent.js';
import PetAboutComponent from "./PetAboutComponent";

import isUserLoggedIn from '../../utils/AuthApi';
import {Redirect} from 'react-router-dom';

import FileUpload from '../../utils/FileUpload/FileUpload.js';
import NotFound from "../NotFound";

function PetScene() {
  console.log("'PetScene' loaded");

  const [urlpetid, setUrlpetid] = useState(useParams());

  return (

    <div className="fontWrap">
      <div><Header /></div>

      <div className="navProfBar">
        <div className="navProf">
        <Row>
          <Col>
            <PetCard value={urlpetid} />
          </Col>
          <Col>
            <PetNavBar value={urlpetid} />
          </Col>
        </Row>
      </div>
      </div>
    
    <div className="fullPageContainer">
      <div className="mainContent">
        <Route exact path='/Pets/:PetId/Records' component={(props)=>isUserLoggedIn()?<PetRecordsComponent {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path="/Pets/:PetId/Health" component={(props)=>isUserLoggedIn()?<PetHealthComponent {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/Pets/:PetId/Events' component={PetEventsComponent} />
        <Route exact path='/Pets/:PetId/Reminders' component={PetRemindersComponent} />
        <Route exact path='/Pets/:PetId/' component={(props)=>isUserLoggedIn()?<PetAboutComponent {...props} /> : <Redirect to={"/"}/>} />
        <div className="mainPageFooter">
          <Footer />
        </div>
      </div>
    </div>
  </div>
    )
}

export default PetScene