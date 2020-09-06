// Login.js

import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function Login() {
    return (
        <div className="fill-window">
            
            <div className="formBox">

                <div className="formTitle">
                    LOGIN
                </div>
                <br />
                <Form className="loginRegForm">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>EMAIL ADDRESS</Form.Label>
                    <Form.Control type="email" placeholder="example@mail.com" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">TEST FORM LOGIN BUTTON -- log in</Button>
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