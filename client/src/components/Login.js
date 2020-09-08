// Login.js

import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function Login() {
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
                    Log In
                </div>
                <Form className="loginRegForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control type="email" placeholder="example@mail.com" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Passord</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="secondary" size="sm" className="btn-form" type="submit">Log in</Button>
                </Form>
                
                <br /><br />
                <Link to="/Pets" className="btn btn-secondary">Login</Link>
            </div>


            
        </div>
    )
}

export default Login



/*

import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
    return (
        
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <p>This is the Login Page.</p>
            
            <Link to="/Pets" className="btn btn-secondary">Login</Link>
        </div>
    )
}

export default Login

*/