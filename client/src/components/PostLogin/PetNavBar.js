// PetNavBar.js

import React from 'react'
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PetNavBar() {
    return (
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
    )
}

export default PetNavBar