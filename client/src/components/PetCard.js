// PetCard.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function PetCard(props) {

    console.log("Component: 'PetCard' loaded");
    
    const [petprofile, setPetprofile] = useState('');

    function fetchPetProfile() {
        axios.get(`http://localhost:5000/api/pets/${props.value.PetId}`, {withCredentials: true} )
            .then(response=>{
                setPetprofile(response.data);
            })
            .catch(err=> {
                setPetprofile({
                    PetName: "N/A - Invalid Pet Id",
                    PetGender: "N/A - Invalid Pet Id"
                });
            })
    }

    useEffect(() => {
        fetchPetProfile();
    }, [])
    

    return (
        <div className="petProfileCard">
            <Row>
                <Col>
                <Link to="/Pets">
                    <button className="btn-petprofile-nav">
                        &lt;&lt;Back
                    </button>
                </Link>
                </Col>

                <Col>
                    name: {petprofile.PetName} <br />
                    gender: {petprofile.PetGender} <br />
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    )
}

export default PetCard;