// Register.js

import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="fill-window fullPageContainer">
            <div className="loginRegPageHeader">
                <div className="homePageHeaderItem">
                    <img src={require('../pet-recs-logo_low-qual.png')} width='48' height='55' />
                    PetRecs
                </div>
            </div>
            <div className="formBox">
                <div className="formTitle">
                    Create an Account
                </div>
                <Form className="loginRegForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control type="email" placeholder="example@mail.com" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicRepeatPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="secondary" size="sm" className="btn-form"  type="submit">Register</Button>
                </Form>
                
                <br /><br />
                <Link to="/" className="btn btn-secondary">Register</Link>
            </div>
        </div>
    )
}

export default Register