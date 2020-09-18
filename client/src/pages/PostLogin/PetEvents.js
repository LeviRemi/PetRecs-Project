// PetEvents.js

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


function PetEvents() {

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
            <PetCard value={urlpetid} onChange={handleChange}/>
          </div>

          <div>
            <PetNavBar value={urlpetid} onChange={handleChange} />
          </div>

          <div className="petProfileBody">
              <h4> events </h4>
          </div>
        </Container>

        <div className="mainPageFooter">
          <Footer />
        </div> 

      </div>
    )
}

export default PetEvents