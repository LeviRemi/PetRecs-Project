// PetAboutComponent.js

import React, {useEffect, useState} from 'react';
import PetImage, {PetCardImage, PetProfileImage} from "../../components/PetImage";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import {useHistory} from "react-router";
import Alert from "react-bootstrap/Alert";

function PetAboutComponent(props) {
    const history = useHistory();
    const [petprofile, setPetprofile] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [show, setShow] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [speciesList, setSpeciesList] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const [isLoading, setLoading] = useState({display: "none"});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseShare = () => setShowShare(false);
    const handleShowShare = () => setShowShare(true);

    function fetchPetProfile() {
        axios.get(`http://localhost:5000/api/pets/${props.match.params.PetId}`, {withCredentials: true} )
            .then(response=>{
                setPetprofile(response.data);
                axios.get(`http://localhost:5000/api/species/${response.data.SpeciesId}`, {withCredentials: true})
                    .then(response=>{
                        setPetSpecies(response.data);
                    });
            })
            .catch(err=> {
                Swal.fire('Oops...', "A pet with this ID does not exist", 'error');
                history.push('/pets');
            })
    }

    function fetchSpeciesList() {
        axios.get(`http://localhost:5000/api/species`, {withCredentials: true} )
            .then(response=>{
                setSpeciesList(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchPetProfile();
        fetchSpeciesList();
    }, [])

    const onSubmit = (data) => {
        setLoading({display: "initial"});
        console.log(data);

        let bod = data.petBirthdate;

        axios.put(`http://localhost:5000/api/pets/${petprofile.PetId}`, {
            PetName: data.petName,
            SpeciesId: data.petSpecies,
            PetGender: data.petGender,
            PetAgeYear: bod.substring(0, 4),
            PetAgeMonth: bod.substring(5, 7),
            PetAgeDay: bod.substring(8, 10),
            AllergyNotes: data.petAllergy,
            FoodNotes: data.petFood,
            CareNotes: data.petCare
        }, {withCredentials: true})
            .then((res) => {
                setLoading({display: "none"});
                console.log(res);
                Swal.fire('Congratulations!', "This pet profile has been updated", 'success');
                handleClose();
                fetchPetProfile()
            }, (err) => {
                setLoading({display: "none"});
                console.log(err.response.status)
                Swal.fire('Oops...', "You do not have permission to update this pet profile", 'error');
            })


    }

    const onShare = (data) => {
        console.log(data);
        setLoading({display: "initial"});

        axios.post(`http://localhost:5000/api/pets/${petprofile.PetId}/share`, {
            Email: data.email
        }, {withCredentials: true})
            .then((res) => {
                setLoading({display: "none"});
                console.log(res);
                Swal.fire('Congratulations!', "This pet profile has been shared with " + data.email, 'success');
                handleCloseShare();
            }, (err) => {
                setLoading({display: "none"});
                console.log(err.response)
                if (err.response.status === 401) {
                    Swal.fire('Oops...', "You do not have permission to share this pet", 'error');
                } else if (err.response.status === 400) {
                    Swal.fire('Oops...', `User ${data.email} does not exist or they already have access to this pet profile`, 'error');
                } else {
                    Swal.fire('Oops...', "You are unable to share the pet at this time", 'error');
                }

            })

    }

    const handleDelete = (data) => {
        Swal.fire({
            title: 'Are you sure you want to delete this pet profile?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
        }).then((result) => {
            // User selects "delete"
            if (result.isDenied) {
                setLoading({display: "initial"});
                axios.delete(`http://localhost:5000/api/pets/${petprofile.PetId}`, {withCredentials: true})
                    .then((res) => {
                        setLoading({display: "none"});
                        console.log(res);
                        Swal.fire('Success!', 'This pet profile has been deleted', 'success');
                        history.push("/pets");
                    }, (err) => {
                        setLoading({display: "none"});
                        console.log(err.response.status)
                        Swal.fire('Oops...', "You do not have permission to delete this pet profile", 'error');
                    })
            }
        })
    }

    return (
        <Container className="petProfileBody" style={{textAlign: "center"}}>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pet Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id="EditPetForm" onSubmit={handleSubmit(onSubmit)} className="loginRegForm">

                        <Form.Group controlId="formPetName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="petName" type="text" placeholder="Pet name" defaultValue={petprofile.PetName}
                                          ref={register({ required: true,
                                              maxLength: {value: 45, message: "Name must be under 45 characters in length"}
                                          })}/>
                            <div className="text-danger">{errors.petName && (errors.petName.message || "Name is required")}</div>
                        </Form.Group>

                        <Form.Group controlId="formPetSpecies">
                            <Form.Label>Species</Form.Label>
                            <Form.Control name="petSpecies" as="select" defaultValue={petprofile.SpeciesId} ref={register()}
                            >
                                {
                                    speciesList.map((option, label) => {
                                        return (<option value={option.SpeciesId}>{option.SpeciesName}</option>)
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPetGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control name="petGender" as="select"  defaultValue={petprofile.PetGender}  ref={register()}
                            >
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                                <option value="NA">Unknown</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formPetBirthdate">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control name="petBirthdate" type="date"
                                          defaultValue={petprofile.PetAgeYear + "-"
                                          + String(petprofile.PetAgeMonth).padStart(2, '0') + "-"
                                          + String(petprofile.PetAgeDay).padStart(2, '0') } ref={register()}/>
                        </Form.Group>

                        <Form.Group controlId="formPetAllergy">
                            <Form.Label>Allergy Notes</Form.Label>
                            <Form.Control name="petAllergy" as="textarea" placeholder="Allergy Notes..." defaultValue={petprofile.AllergyNotes}
                                          ref={register({
                                              maxLength: {value: 300, message: "Allergy notes must be under 300 characters in length"}
                                          })}/>
                            <div className="text-danger">{errors.petAllergy && errors.petAllergy.message}</div>
                        </Form.Group>

                        <Form.Group controlId="formPetFood">
                            <Form.Label>Food Notes</Form.Label>
                            <Form.Control name="petFood" as="textarea" placeholder="Food Notes..." defaultValue={petprofile.FoodNotes}
                                          ref={register({
                                              maxLength: {value: 300, message: "Food notes must be under 300 characters in length"}
                                          })}/>
                            <div className="text-danger">{errors.petFood && errors.petAllergy.message}</div>
                        </Form.Group>

                        <Form.Group controlId="formPetCare">
                            <Form.Label>Care Notes</Form.Label>
                            <Form.Control name="petCare" as="textarea" placeholder="Care Notes..." defaultValue={petprofile.CareNotes}
                                          ref={register({
                                              maxLength: {value: 300, message: "Care notes must be under 300 characters in length"}
                                          })}/>
                            <div className="text-danger">{errors.petCare && errors.petCare.message}</div>
                        </Form.Group>

                        <div style={{textAlign: "center"}}>
                            <div style={isLoading}>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button style={{position: "absolute", left: "12px"}} variant="danger" onClick={handleDelete}>Delete Pet</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit" form="EditPetForm">Save Changes</Button>
                </Modal.Footer>

            </Modal>

            <Modal
                show={showShare}
                onHide={handleCloseShare}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Share Pet Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert key="ShareAlert" variant="warning">
                        Share {petprofile.PetName} with another PetRecs user?
                    </Alert>
                    <Form id="SharePetForm" onSubmit={handleSubmit(onShare)} className="loginRegForm">

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="example@mail.com"
                                          ref={register(
                                              { required: true,
                                                  pattern: {
                                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                      message: "invalid email address"
                                                  }
                                              })}/>
                            <div className="text-danger">{errors.email && (errors.email.message || "Email is required")}</div>
                        </Form.Group>


                        <div style={{textAlign: "center"}}>
                            <div style={isLoading}>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseShare}>Close</Button>
                    <Button variant="primary" type="submit" form="SharePetForm">Share Pet Profile</Button>
                </Modal.Footer>

            </Modal>

            <Row>
                <Col></Col>
                <Col>
                    <PetProfileImage {...{PetId: petprofile.PetId, ProfileUrl: petprofile.ProfileUrl}}/>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <Button onClick={handleShowShare} variant="none" style={{top: "0%"}} >
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711C15.3166 7.09763 14.6834 7.09763 14.2929 6.70711L13 5.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V5.41421L9.70711 6.70711C9.31658 7.09763 8.68342 7.09763 8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2929 2.29289ZM4 11C4 9.89543 4.89543 9 6 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H6V20H18V11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11Z" fill="#282828"></path>
                        </svg>
                    </Button>
                    <Button onClick={handleShow} variant="outline-dark">Edit Profile</Button>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><h3>{petprofile.PetName}</h3></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><h6>Species: {petSpecies.SpeciesName}</h6></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><h6>Gender: {petprofile.PetGender==="M"? "Male" : petprofile.PetGender==="F"? "Female" : "Not Applicable"}</h6></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><h6>Birthdate: {petprofile.PetAgeMonth}/{petprofile.PetAgeDay}/{petprofile.PetAgeYear}</h6></Col>
                <Col></Col>
            </Row>
            <br/>
            <Row>
                <Col><h5>Allergy Notes:</h5></Col>
                <Col><h5>Food Notes:</h5></Col>
                <Col><h5>Care Notes:</h5></Col>
            </Row>
            <Row>
                <Col><p>{petprofile.AllergyNotes}</p></Col>
                <Col><p>{petprofile.FoodNotes}</p></Col>
                <Col><p>{petprofile.CareNotes}</p></Col>
            </Row>
        </Container>

    )

}

export default PetAboutComponent