// PetCreation.js

import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import Swal from 'sweetalert2'
import Header from "../../components/Header";

function PetCreation() {
    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();

    const [speciesList, setSpeciesList] = useState([]);

    function fetchSpeciesList() {
        axios.get(`/api/species`, {withCredentials: true} )
            .then(response=>{
                setSpeciesList(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchSpeciesList();
    }, [])

    const onSubmit = (data) => {
        console.log(data);
        let bod = data.petBirthdate;


        axios.post('/api/pets/', {
            SpeciesId: data.petSpecies,
            BreedId: "599", /*the null breed (id: 599) is default*/
            PetName: data.petName,
            PetGender: data.petGender,
            PetAgeYear: bod.substring(0, 4),
            PetAgeMonth: bod.substring(5, 7),
            PetAgeDay: bod.substring(8, 10)
        }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                Swal.fire('Congratulations!', `${data.petName} has been added!`, 'success');
                history.push('/pets');
            }, (err) => {
                console.log(err.response.status)
                if (err.response.status === 409) {
                    Swal.fire('Oops...', err.response.data.message, 'error');
                }
                console.log(err);
            })
    }

    return (
        <div className="fullPageContainer">
            <div>
                <Header />
            </div>
            <div className="formBox">
                <div className="formTitle">
                    Add Pet
                </div>
                <Form onSubmit={handleSubmit(onSubmit)} className="loginRegForm">

                    <Form.Group controlId="formPetName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="petName" type="text" placeholder="Pet name"
                                      ref={register({ required: true,
                                          maxLength: {value: 45, message: "Name must be under 45 characters in length"}
                                      })}/>
                        <div className="text-danger">{errors.petName && (errors.petName.message || "Name is required")}</div>
                    </Form.Group>

                    <Form.Group controlId="formPetSpecies">
                        <Form.Label>Species</Form.Label>
                        <Form.Control name="petSpecies" as="select"
                                      ref={register({ required: true, validate: value => value !== 'Select...'})}>
                            <option>Select...</option>
                            {
                                speciesList.map((option, label) => {
                                    return (<option value={option.SpeciesId}>{option.SpeciesName}</option>)
                                })
                            }
                        </Form.Control>

                        <div className="text-danger">{errors.petSpecies && "Species is required"}</div>
                    </Form.Group>

                    <Form.Group controlId="formPetBirthdate">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control name="petBirthdate" type="date" ref={register({ required: true})}/>
                    </Form.Group>

                    <Form.Group controlId="formPetGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control name="petGender" as="select" ref={register({ required: true, validate: value => value !== 'Select...'})}>
                            <option>Select...</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                            <option value="NA">Unknown</option>
                        </Form.Control>
                        <div className="text-danger">{errors.petGender && "Gender is required"}</div>
                    </Form.Group>



                    <br />
                    <div className="text-center">
                        <Button variant="secondary" size="sm" className="btn-form" type="submit">Add Pet</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default PetCreation