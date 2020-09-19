// PetScene.js

import React, { Component, useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import PetRecordsComponent from './PetRecordsComponent.js';
import PetHealthComponent from './PetHealthComponent.js';
import PetEventsComponent from './PetEventsComponent.js';
import PetRemindersComponent from './PetRemindersComponent.js';

function PetScene() {
  console.log("'PetScene' loaded");

  const [urlpetid, setUrlpetid] = useState(useParams());

    return (
      <Router basename="/">

      <div className="fullPageContainer">
        <div>
          <Header />
        </div>
        <div>
            <PetCard value={urlpetid} />
          </div>
          <div>
            <PetNavBar value={urlpetid} />
          </div>

        <div className="mainContent">
            <Route exact path='/Pets/:PetId/Records' component={PetRecordsComponent} />
            <Route exact path='/Pets/:PetId/Health' component={PetHealthComponent} />
            <Route exact path='/Pets/:PetId/Events' component={PetEventsComponent} />
            <Route exact path='/Pets/:PetId/Reminders' component={PetRemindersComponent} />
        </div>

        <div className="mainPageFooter">
          <Footer />
        </div> 

      </div>
      </Router>
    )

    
}

export default PetScene