// HomePage.js

import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';

function HomePage() {

    const featureTitleStyle = {
        paddingTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'var(--COLOR_WHITE)',
    };

    const featureTitleImageStyle = {
        display: "block",
        margin: "auto",
        marginBottom: "16px"
    };

    const featureDescStyle = {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: 'var(--COLOR_WHITE)'
    };

    return (
        <div className="fontWrap">
            <div className="fullPageContainer FadeIn">
                <div className="homePageHeader">
                    <div className="homePageHeaderItem">
                        <img src={require('../icon_lg.png')} alt='PetRecs Dogument Logo' width='58' height='64' />
                        PetRecs
                    </div>

                    <div className="homePageHeaderItem push-right">
                        <Link to="/register">
                            <button className="btn-homepage-header btn-homepage-header-register">
                                Create an Account
                            </button>
                        </Link>
                        <Link to="/login" style={{marginLeft: "10px", marginRight: "10px"}}>
                            <button className="btn-homepage-header btn-homepage-header-login">
                                Log In
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="img-banner">
                    <img src={require('../dog-bone-banner.jpg')} className="img-fluid" alt="Different dog breeds on a bone"></img>
                </div>

                <div className="homePageBody">
                    <p style={{textAlign: "center"}}>PetRecs is a digital hub to track health records for all of your furry, scaly, and feathered friends.<br/>
                    Register today and begin your journey towards better pet record management.</p>
                    <Container>
                        <Row>
                            <Col>
                                <p style={featureTitleStyle}>Create Pet Profiles</p>
                                <img style={featureTitleImageStyle} src={require('../pet-house.png')} alt='dog in a dog house' width='125' height='125' />
                            </Col>
                            <Col>
                                <p style={featureTitleStyle}>Store Records Online<br /></p>
                                <img style={featureTitleImageStyle} src={require('../file-icon.png')} alt='document with an upload symbol' width='125' height='125' />
                            </Col>
                            <Col>
                                <p style={featureTitleStyle}>Monitor Health Data<br /></p>
                                <img style={featureTitleImageStyle} src={require('../veterinary-icon.png')} alt='paw with a red cross' width='125' height='125' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <p style={featureDescStyle}>
                            Setup and customize individual Pet Profiles.
                            Keep each profile separate and private.
                            Share selected Pet Profiles with family, friends, or vets.
                            </p>
                            </Col>
                            <Col>
                            <p style={featureDescStyle}>
                            Upload digital copies of your pet's medical records.
                            Add custom labels and notes for organization.
                            Sort and search through stored records with ease.
                            </p>
                            </Col>
                            <Col>
                            <p style={featureDescStyle}>
                            Track weights, manage current medications, and
                            log health events all in one place. Optimize
                            pet care by keeping better track of your pet's health.
                            </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage