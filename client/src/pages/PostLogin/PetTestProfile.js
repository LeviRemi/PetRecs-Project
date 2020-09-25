// PetTestProfile.js

import React, { Component } from 'react'

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import TestHealth from './TestHealth.js';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PetTestProfile() {
  return (
    <div className="fontWrap">

      <div><Header /></div>

      <div className="navProfBar">
        <div className="navProf">
        <Row>
          <Col>
            <PetCard value={'1'} />
          </Col>
          <Col>
            <PetNavBar value={'1'} />
          </Col>
        </Row>
      </div>
      </div>
    
    <div className="fullPageContainer">

      <div className="mainContent">
        <TestHealth />

        <div className="mainPageFooter">
          <Footer />
        </div>
      </div>
    </div>
    </div>
    )
}

export default PetTestProfile