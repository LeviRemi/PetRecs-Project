// PetTestPage.js

import React, { Component, useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import Container from 'react-bootstrap/Container';

import PetTestRecords from './PetTestRecords'
import PetTestProfile from './PetTestProfile'

function PetTestPage() {

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
          <div className="testLinks">
            <NavLink to="/pets/testrecords/"> testrecords </NavLink>
            <NavLink to={{pathname: `/pets/testprofile/${urlpetid.PetId}`}}> testprofile </NavLink>
          </div>

        <div className="mainContent">
            <Route exact path='/pets/testprofile/:PetId' component={PetTestProfile} />
            <Route exact path='/pets/testrecords/' component={PetTestRecords} />
        </div>

        <div className="mainPageFooter">
          <Footer />
        </div> 

      </div>
      </Router>

/*
      <div className="fullPageContainer">
        <div>
          <Header />
        </div>



        <Container fluid className="petProfileWindow">
          <div>
            <PetCard value={urlpetid} />
          </div>
          <div>
            <PetNavBar value={urlpetid} />
          </div>
        <div className="petProfileBody">
            <h4> Pet Profile </h4>
              name: petprofile.PetName <br />
              gender: pet.PetGender <br />
              birthday: pet.PetAgeMonth/pet.PetAgeDay/pet.PetAgeYear<br />
              allergies: pet.AllergyNote<br />
              care notes: pet.CareNotes<br />
              food notes: pet.FoodNotes<br />
              pet ID: pet.PetId<br />
              species ID:pet.SpeciesId<br />
        </div>
        </Container>
        <div className="mainPageFooter">
          <Footer />
        </div> 
      </div>

      */
    )

    
}

export default PetTestPage