// PetRecords.js

import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
        <div className="mainPageBody nopadding">
          <Container fluid>
            <Row>
              <Col xs="2" className="nopadding">
                <div className="mainPageSideBtnGroup">
                  <button className="btn-mainpage-side">
                    Records
                  </button><br />
                  <button className="btn-mainpage-side">
                    Health
                  </button><br />
                  <button className="btn-mainpage-side">
                    Event
                  </button><br />
                  <button className="btn-mainpage-side">
                    Reminders
                  </button>
                  
                </div>
              </Col>

              <Col lg={true} className="nopadding">
                <div className="mainPageContents">
                  <h3> need to figure out here whether we will use multiple pages<br />
                  or if this should be a component that renders in when needed</h3>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="mainPageFooter">
          <Footer />
        </div> 
      </div>
    )
}

export default PetRecords