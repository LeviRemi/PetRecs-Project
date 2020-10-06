// Account.js

import React, {useEffect, useState} from 'react'
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import PetImage from "../../components/PetImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import * as swal from "sweetalert2";

function Account() {

    const [acct, setAcct] = useState("");
    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();

    function fetchAccount() {
        axios.get("/api/accounts/current", {withCredentials: true})
            .then(response => {
                setAcct(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchAccount();
    }, [])

    const onSubmit = (data) => {
        axios.put(`/api/accounts/${acct.AccountId}`, {
            FirstName: (data.firstName === "")? acct.FirstName : data.firstName,
            LastName: (data.lastName === "")? acct.LastName : data.lastName,
            Email: (data.email === "")? acct.Email : data.email
        }, {withCredentials: true})
            .then((res) => {
                swal.fire('Success!', "Your PetRecs account has been updated", 'success');
            })
            .catch((err) => {
                swal.fire("Oops...", "There was an error updating your account", "error");
            })
    }


    return (
        <div>
            <div className="fontWrap">
                <Header />
                <div className="petsAccentBar"></div>
            </div>
            <Container fluid>
                <div className="mainPageBody">
                    <div className="mainPageContents fullPageContainer">
                        <br/>
                            <h2 style={{textAlign: "center"}}>My Account</h2>
                        <br/>

                        <Form style={{width: "500px", margin: "auto"}} onSubmit={handleSubmit(onSubmit)}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control name="firstName" type="text" placeholder="First name" defaultValue={acct.FirstName}
                                                      ref={register({
                                                          maxLength: {value: 45, message: "First name must be under 45 characters in length"}
                                                      })}/>
                                        <div className="text-danger">{errors.firstName && errors.firstName.message}</div>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control name="lastName" type="text" placeholder="Last name" defaultValue={acct.LastName}
                                                      ref={register({
                                                          maxLength: {value: 45, message: "Last name must be under 45 characters in length"}
                                                      })}/>
                                        <div className="text-danger">{errors.lastName && errors.lastName.message}</div>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control name="email" type="email" placeholder="example@mail.com" defaultValue={acct.Email}
                                                      ref={register(
                                                          { required: true,
                                                              pattern: {
                                                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                  message: "invalid email address"
                                                              }
                                                          })}/>
                                        <div className="text-danger">{errors.email && (errors.email.message || "Email is required")}</div>
                                    </Form.Group>
                                </Col>

                            </Form.Row>
                            {/*<Form.Row>*/}
                            {/*    <Col>*/}
                            {/*        <Form.Group controlId="formBasicPassword">*/}
                            {/*            <Form.Label>New Password</Form.Label>*/}
                            {/*            <Form.Control name="password" type="password" placeholder="Password"*/}
                            {/*                          ref={register({*/}
                            {/*                              minLength: {value: 6, message: "Password must be at least 6 characters in length"},*/}
                            {/*                              maxLength: {value: 20, message: "Password must be at or under 20 characters in length"}*/}
                            {/*                          })} />*/}
                            {/*            <div className="text-danger">{errors.password && (errors.password.message || "Password is required")}</div>*/}
                            {/*        </Form.Group>*/}
                            {/*    </Col>*/}
                            {/*    <Col>*/}
                            {/*        <Form.Group controlId="formBasicRepeatPassword">*/}
                            {/*            <Form.Label>Verify</Form.Label>*/}
                            {/*            <Form.Control name="password_confirm" type="password" placeholder="Password"*/}
                            {/*                          ref={register({ validate: value => value === watch('password') })} />*/}
                            {/*            <div className="text-danger">{errors.password_confirm && "Both passwords must match"}</div>*/}
                            {/*        </Form.Group>*/}
                            {/*    </Col>*/}
                            {/*</Form.Row>*/}


                            <br />
                            <div className="text-center">
                                <Button variant="primary" size="sm" className="btn-form" type="submit">Update Account</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
            <div className="mainPageFooter">
                <Footer />
            </div>
        </div>
    )
}

export default Account