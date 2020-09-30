// Login.js

import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useForm} from "react-hook-form"
import {useHistory} from "react-router";
import Swal from "sweetalert2";


function Login() {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        axios.post('/api/accounts/login/', {
            Email: data.email,
            Password: data.password
        }, { withCredentials: true })
            .then((res) => {
                history.push('/Pets');
            }, (err) => {
                console.log(err);
                Swal.fire('Oops...', "Wrong email or password", 'error');
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
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="example@mail.com" autoComplete="email"
                                      ref={register(
                                          { required: true,
                                              pattern: {
                                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                  message: "invalid email address"
                                              }
                                          })}/>
                        <div className="text-danger">{errors.email && (errors.email.message || "Email is required")}</div>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" autoComplete="current-password"
                                      ref={register({ required: true})} />
                        <div className="text-danger">{errors.password && "Password is required"}</div>
                    </Form.Group>
                    <br />
                    <div className="text-center">
                        <Button variant="secondary" size="sm" className="btn-form" type="submit">Log in</Button>
                    </div>
                </Form>
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