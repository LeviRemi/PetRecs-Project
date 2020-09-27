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

function PetAboutComponent(props) {

    console.log("Component: 'PetAboutComponent' loaded");

    const [petprofile, setPetprofile] = useState('');
    const [petSpecies, setPetSpecies] = useState('');

    const [show, setShow] = useState(false);

    const { register, handleSubmit, errors, watch } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [speciesList, setSpeciesList] = useState([]);


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
                setPetprofile({
                    PetName: "N/A - Invalid Pet Id",
                    PetGender: "N/A - Invalid Pet Id"
                });
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
                console.log(res);
                Swal.fire('Congratulations!', "Your pet's profile has been edited", 'success');
                handleClose();
                fetchPetProfile()
            }, (err) => {
                console.log(err.response.status)
                Swal.fire('Oops...', err.response.data.message, 'error');
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

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit" form="EditPetForm">Save Changes</Button>
                </Modal.Footer>

            </Modal>

            {/*<h4> Hello {props.match.params.PetId}</h4>*/}
            <Row>
                <Col></Col>
                <Col>
                    <PetProfileImage {...{PetId: petprofile.PetId, ProfileUrl: petprofile.ProfileUrl}}/>
                </Col>
                <Col style={{textAlign: "right"}}><Button onClick={handleShow} variant="outline-dark">Edit Profile</Button></Col>
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