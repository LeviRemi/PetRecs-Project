// PetRecords.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

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
      <div className="petProfileNavBar">
          <Row>
          <Col sm="1">
          </Col>
          <Col>
              <Link to="/pets/records">
                <button className="btn-petprofile-nav">
                  Records
                </button>
              </Link>
              <Link to="/pets/health">
                <button className="btn-petprofile-nav">
                  Health
                </button>
              </Link>
              <Link to="/pets/events">
                <button className="btn-petprofile-nav">
                  Events
                </button>
              </Link>
              <Link to="/pets/reminders">
                <button className="btn-petprofile-nav">
                  Reminders
                </button>
              </Link>
          </Col>
          <Col sm="1">
          </Col>
          </Row>
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