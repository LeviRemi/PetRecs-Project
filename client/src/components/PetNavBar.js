// PetNavBar.js

import React from 'react'
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PetNavBar(props) {
  
    console.log("Navbar PetId for links: " + props.value.PetId);
    return (
      
        <div className="petProfileNavBar">
              <Row>
                <Col sm="1">
                </Col>

                <Col>
                    <NavLink to={{pathname: `/Pets/${props.value.PetId}/Records`}}>  
                      <button className="btn-petprofile-nav">
                        Records
                      </button>
                    </NavLink>
                    <NavLink to={{pathname: `/Pets/${props.value.PetId}/Health`}}>
                      <button className="btn-petprofile-nav">
                        Health
                      </button>
                    </NavLink>
                    <NavLink to={{pathname: `/Pets/${props.value.PetId}/Events`}}>
                      <button className="btn-petprofile-nav">
                        Events
                      </button>
                    </NavLink>
                    <NavLink to={{pathname: `/Pets/${props.value.PetId}/Reminders`}}>
                      <button className="btn-petprofile-nav">
                        Reminders
                      </button>
                    </NavLink>
                </Col>

                <Col sm="1">
                </Col>
              </Row>
          </div>
    )
}

export default PetNavBar