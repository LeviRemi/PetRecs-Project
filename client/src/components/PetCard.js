// PetCard.js

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function PetCard(props) {
    const [urlpetid, setUrlpetid] = useState(useParams());
    const [petprofile, setPetprofile] = useState('');

    //console.log("calling PetCard");

    function fetchPetInfo() {
        axios.get(`http://localhost:5000/api/pets/${urlpetid.PetId}`, {withCredentials: true} )
        .then(response=>{
          //console.log(response.data);
          setPetprofile(response.data);
      })
    }

    useEffect(() => {
        fetchPetInfo();
    }, [])
    

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