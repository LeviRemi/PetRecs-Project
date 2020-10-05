// HomePage.js

import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';

function HomePage() {

    const featureTitleStyle = {
        paddingTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'var(--COLOR_WHITE)',
    };

    const featureDescStyle = {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: 'var(--COLOR_WHITE)'
    };

    return (
        <div className="fullPageContainer">
            <div className="homePageHeader">
                <div className="homePageHeaderItem">
                    <img src={require('../pet-recs-logo_low-qual.png')} alt='PetRecs Dogument Logo' width='48' height='55' />
                    PetRecs
                </div>

                <div className="homePageHeaderItem push-right">
                    <Link to="/register">
                        <button className="btn-homepage-header btn-homepage-header-register">
                            Create an Account
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="btn-homepage-header">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>

            <div class="img-banner">
                <img src={require('../dog-bone-banner.jpg')} class="img-fluid" alt="Different dog breeds on a bone"></img>
            </div>

            <div className="homePageBody">
                PetRecs is the place for you to store all of the information for your furry, or scaly, friend. Store medical records
                digitally, track health data, and keep record of important events all in one place.
                <Container>
                    <Row>
                        <Col>
                            <p style={featureTitleStyle}>Create Individual Profiles<br /></p>
                        </Col>
                        <Col>
                            <p style={featureTitleStyle}>Store Records Digitally<br /></p>
                        </Col>
                        <Col>
                            <p style={featureTitleStyle}>Monitor Health Data<br /></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p style={featureDescStyle}>
                        Setup a Pet Profile for each of your pets. This
                        allows you to keep all your information
                        separate and only share the pets you want.
                        </p>
                        </Col>
                        <Col>
                        <p style={featureDescStyle}>
                        Upload scans/digital copies of your medical records
                        from the Vet. Minimize the chance of
                        physical records getting misplaced or
                        damaged.
                        </p>
                        </Col>
                        <Col>
                        <p style={featureDescStyle}>
                        Track weight, current medication, and
                        significant events related to health. Have it
                        accessible all in once place to make sure you
                        don't forget something important.
                        </p>
                        </Col>
                    </Row>
                    </Container>
            </div>

            <div>
                <Footer />
            </div>

        </div>
    )
}

export default HomePage