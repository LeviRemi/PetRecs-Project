// HomePage.js

import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link, withRouter } from 'react-router-dom';

function HomePage() {

    const featureTitleStyle = {
        paddingTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'white',
    };

    const featureDescStyle = {
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: 'white'
    };

    return (
        <div className="fullPageContainer">
            <div className="homePageHeader">
                <div className="homePageHeaderItem">
                    <img src={require('../pet-recs-logo_low-qual.png')} width='48' height='55' />
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
            
            <Jumbotron fluid as="div">
                <h1>possible placeholder for an image</h1>
            </Jumbotron>

            <div className="homePageBody">
                This is where the description of the website will go.<br />
                This is where the description of the website will go.<br />
                This is where the description of the website will go. Hopefully a wide image above this text block.<br />
                This is where the description of the website will go.<br />
                This is where the description of the website will go.<br />
                <Container>
                    <Row>
                        <Col>
                            <p style={featureTitleStyle}>feature description #1<br /></p>
                        </Col>
                        <Col>
                            <p style={featureTitleStyle}>feature description #2<br /></p>
                        </Col>
                        <Col>
                            <p style={featureTitleStyle}>feature description #3<br /></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p style={featureDescStyle}>
                        The description of feature #1 will be written here.
                        Hopefully we can come up with a way to share the purpose
                        of our website in concise statements.
                        </p>
                        </Col>
                        <Col>
                        <p style={featureDescStyle}>
                        The description of feature #2 will be written here.
                        Hopefully we can come up with a way to share the purpose
                        of our website in concise statements.
                        </p>
                        </Col>
                        <Col>
                        <p style={featureDescStyle}>
                        The description of feature #3 will be written here.
                        Hopefully we can come up with a way to share the purpose
                        of our website in concise statements.
                        </p>
                        </Col>
                    </Row>
                    </Container>
            </div>
            
            <div className="homePageFooter">
                footer text placeholder - need to come up with proper content - footer text placeholder
            </div>            
            
        </div>
    )
}

export default HomePage