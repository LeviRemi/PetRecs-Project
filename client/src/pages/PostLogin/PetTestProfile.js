// PetTestProfile.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PetTestProfile() {
  return (
      <div className="petProfileBody nopadding">
          <h4> Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          Pet Test Profile details herePet Test Profile details herePet Test Profile details here <br />
          </h4>
      </div> 
    )
}

export default PetTestProfile