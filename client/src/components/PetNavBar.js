// PetNavBar.js

import React from 'react'
import { Link } from 'react-router-dom';
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
                  <NavLink to={{pathname: `/Pets/Records/${props.value.PetId}`}}>
                    <button className="btn-petprofile-nav">
                      Records
                    </button>
                  </NavLink>
                  <Link to={{pathname: `/Pets/Health/${props.value.PetId}`}}>
                    <button className="btn-petprofile-nav">
                      Health
                    </button>
                  </Link>
                  <Link to={{pathname: `/Pets/Events/${props.value.PetId}`}}>
                    <button className="btn-petprofile-nav">
                      Events
                    </button>
                  </Link>
                  <Link to={{pathname: `/Pets/Reminders/${props.value.PetId}`}}>
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