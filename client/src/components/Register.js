// Register.js

import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useForm} from "react-hook-form"

import { Link } from 'react-router-dom';

function Register(props) {

    const { register, handleSubmit, errors, watch } = useForm();
    const onSubmit = (data) => {
        axios.post('http://localhost:5000/api/accounts/', {
            FirstName: "",
            LastName: "",
            Email: data.email,
            Password: data.password,
            AccountTypeId: data.accountType
        })
            .then((res) => {
                console.log(res);
                alert("Account created");
            }, (err) => {
                console.log(err);
                alert("Error creating account");
            })
    }

    const accountOptions = [
        { value: '',  label: 'Select...'}, // default value, cannot be submitted
        { value: '1', label: 'Pet Owner' },
        { value: '2', label: 'Veterinarian'}
    ];

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
                    Create an Account
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} className="loginRegForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="example@mail.com"
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
                        <Form.Control name="password" type="password" placeholder="Password"
                                      ref={register({ required: true,
                                          minLength: {value: 6, message: "Password must be at least 6 characters in length"},
                                          maxLength: {value: 20, message: "Password must be at or under 20 characters in length"}
                                      })} />
                        {errors.password && (errors.password.message || "Password is required")}
                    </Form.Group>

                    <Form.Group controlId="formBasicRepeatPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control name="password_confirm" type="password" placeholder="Password"
                                      ref={register({ required: true, validate: value => value === watch('password') })} />
                        {errors.password_confirm && "Both passwords must match"}
                    </Form.Group>

                    <Form.Group controlId="formBasicAccountType">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control name="accountType" as="select"
                                      ref={register({ required: true, validate: value => value !== 'Select...'})}> {
                                accountOptions.map((option, label) => {
                                    return (<option value={option.value}>{option.label}</option>)
                                })
                            }
                        </Form.Control>
                        {errors.accountType && "Account Type is required"}
                    </Form.Group>

                    <br />
                    <Button variant="secondary" size="sm" className="btn-form" type="submit">Register</Button>
                </Form>
                
                <br /><br />
                <Link to="/" className="btn btn-secondary">Register</Link>
            </div>
        </div>
    )
}

export default Register