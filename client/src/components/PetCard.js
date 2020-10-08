// PetCard.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import moment from 'moment';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PetImage, { PetCardImage } from './PetImage.js'
import {useHistory} from "react-router";

function PetCard(props) {

    console.log("Component: 'PetCard' loaded");

    const history = useHistory();
    const [petprofile, setPetprofile] = useState('');
    const [cardAcquired, setCardAcquired] = useState(false);

    function fetchPetProfile() {
        axios.get(`/api/pets/${props.value.PetId}`, {withCredentials: true} )
            .then(response=>{
                setCardAcquired(true);
                setPetprofile(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    let date = (petprofile.PetAgeYear + '-' + petprofile.PetAgeMonth + ' ' +petprofile.PetAgeDay);
    let ageYears = 10;

    if ( moment().diff(date, 'year') >= 1) {
        ageYears = moment().diff(date, 'years') + 'y';
    }

    else if (moment().diff(date, 'month') < 1 ) {
        ageYears = moment().diff(date, 'days') + 'd';
    }

    else {
        ageYears = moment().diff(date, 'months') + 'm';
    }

    useEffect(() => {
        fetchPetProfile();
    }, [])
    
    return (
        <div className="petProfileCard">
            <Row>
                <Col md="1">
                <Link to={{pathname: '/pets', state: {prevPage: "petScene"}}}>
                        <button className="back-btn-petprofile-nav">
                        &#x2b9c;
                        </button>
                    </Link>
                </Col>
                <Col md="auto">
                    {cardAcquired && <PetCardImage {...{PetId: petprofile.PetId, ProfileUrl: petprofile.ProfileUrl}}/>}
                </Col>
                <Col md="auto">
                    {cardAcquired && <div className="petCardInfo FadeIn">
                                &#128062; {petprofile.PetName} <br/>
                                &#9892; {petprofile.PetGender} &nbsp;&nbsp;&nbsp;
                                &#128197; {ageYears} &nbsp;&nbsp;&nbsp;
                    </div>}
                </Col>
            </Row>
        </div>
    )
}

export default PetCard;