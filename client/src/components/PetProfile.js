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

        <div className="petProfileCard_off">
            <Row>
                <Col sm="2">
                    <Link to="/pets">
                    <button className="btn-petprofile-nav">
                        <b>&lt;&lt;Back</b>
                    </button>
                    </Link>
                </Col>
                <Col>
                    <div className="petProfileCard">
                        <Row>
                            <Col sm="3">
                                <br />
                                [image here?]<br />
                                [image here?]<br />
                                [image here?]<br /><br />
                            </Col>
                            <Col>
                                test<br />
                                test<br />
                                test<br />
                                test<br />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col sm="2">
                </Col>
            </Row>
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
                  <button className="btn-petprofile-nav shadow-none">
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