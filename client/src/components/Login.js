// Login.js

import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useForm} from "react-hook-form"


function Login() {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));

        axios.post('http://localhost:5000/api/accounts/login/', {
            // need to see if ok to send password in POST request
            Email: data.email,
            Password: data.password
        })
            .then((res) => {
                console.log(res);
                alert("Your account credentials are valid!")
            }, (err) => {
                console.log(err);
                alert("These credentials do not match anything in our database")
            })
    }

    return (
        <div className="fill-window fullPageContainer">
            <div className="loginRegPageHeader">
                <div className="homePageHeaderItem">
                    <img alt="PetRecs Logo" src={require('../pet-recs-logo_low-qual.png')} width='48' height='55' />
                    PetRecs
                </div>
            </div>
            <div className="formBox">
                <div className="formTitle">
                    Log In
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} className="loginRegForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="example@mail.com" autoComplete="email"
                                      ref={register(
                                          { required: true,
                                              pattern: {
                                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                  message: "invalid email address"
                                              }
                                          })}/>
                        {errors.email && (errors.email.message || "Email is required")}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" autoComplete="current-password"
                                      ref={register({ required: true})} />
                        {errors.password && "Password is required"}
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