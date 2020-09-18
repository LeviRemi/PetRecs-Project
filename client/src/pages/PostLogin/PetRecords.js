// PetRecords.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function PetRecords() {
  return (
    <div className="fullPageContainer">
      <div>
        <Header />
      </div>
      <Container fluid className="petProfileWindow">
      <div classname="petProfileCard">
          <Jumbotron>
              <Link to="/pets">
                <button className="btn-petprofile-nav">
                   &lt;&lt;Back
                </button>
              </Link>
              Pet Profile Card Placeholder
          </Jumbotron>
      </div>

      <div>
        <PetNavBar value="{urlpetid}" onChange="{handleChange}" />
      </div>

      <div className="petProfileBody nopadding">
          <h4> Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          Pet Record details here - Pet Record details here - Pet Record details here <br />
          </h4>
      </div>
      </Container>
      <div className="mainPageFooter">
        <Footer />
      </div> 
    </div>
    )
}

export default PetRecords