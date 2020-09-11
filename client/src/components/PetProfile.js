// PetProfile.js

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

function PetProfile() {
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
                <Link to="/petrecords">
                  <button className="btn-petprofile-nav">
                    Records
                  </button>
                </Link>
                <Link to="/pethealth">
                  <button className="btn-petprofile-nav">
                    Health
                  </button>
                </Link>
                <Link to="/petevents">
                  <button className="btn-petprofile-nav">
                    Events
                  </button>
                </Link>
                <Link to="/petreminders">
                  <button className="btn-petprofile-nav">
                    Reminders
                  </button>
                </Link>
            </Col>
            <Col sm="1">
            </Col>
            </Row>
        </div>
        <div className="petProfileBody">
            <h4> Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            Pet Profile details here - Pet Profile details here - Pet Profile details here <br />
            </h4>
        </div>
        </Container>
        <div className="mainPageFooter">
          <Footer />
        </div> 
      </div>
    )
}

export default PetProfile