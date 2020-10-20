// Account.js

import React, {useEffect, useState} from 'react'
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import Footer from "../../components/Footer";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";
import * as swal from "sweetalert2";

function Account() {

    const [acct, setAcct] = useState("");
    const { register, handleSubmit, errors } = useForm();

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
            </div>
            <div className="petsAccentBar"></div>
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