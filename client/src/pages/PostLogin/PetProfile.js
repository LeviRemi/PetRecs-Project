// PetProfile.js

import React, { Component, useState } from 'react';
import { useParams } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import Container from 'react-bootstrap/Container';

import PetTestRecords from './PetTestRecords'
import PetTestProfile from './PetTestProfile'

function PetProfile(props) {
  
  const [urlpetid, setUrlpetid] = useState(useParams());


  return(
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
              name: pet.PetName <br />
              gender: pet.PetGender <br />
              birthday: pet.PetAgeMonth/pet.PetAgeDay/pet.PetAgeYear<br />
              allergies: pet.AllergyNotes<br />
              care notes: pet.CareNotes<br />
              food notes: pet.FoodNotes<br />
              pet ID: pet.PetId<br />
              species ID: pet.SpeciesId<br />
        </div>
        </Container>
        <div className="mainPageFooter">
          <Footer />
        </div> 
      </div>
    )
}

export default PetProfile