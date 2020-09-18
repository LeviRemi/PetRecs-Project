// PetCard.js

import React from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function PetCard(props) {
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  console.log(props.value.PetId);

    return (
        <div className="petProfileCard">
            <Row>
                <Col>
                <Link to="/pets">
                <button className="btn-petprofile-nav">
                    &lt;&lt;Back
                </button>
                </Link>
                </Col>

                <Col>
                    name: pet.PetName <br />
                    gender: pet.PetGender <br />
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    )
}

export default PetCard;