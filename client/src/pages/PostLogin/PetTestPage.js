// PetTestPage.js

import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function PetTestPage() {

  const [urlpetid, setUrlpetid] = useState(useParams());

  function handleChange(newPetid) {
    setUrlpetid(newPetid);
  }

    return (
      <div className="fullPageContainer">
        <div>
          <Header />
        </div>

        <Container fluid className="petProfileWindow">
          <div>
            <PetCard />
          </div>
          <div>
            <PetNavBar value={urlpetid} onChange={handleChange} />
          </div>
        <div className="petProfileBody">
            <h4> Pet Profile </h4>
              name: pet.PetName <br />
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
    )
}

export default PetTestPage