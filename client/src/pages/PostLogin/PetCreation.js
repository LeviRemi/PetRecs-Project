// PetCreation.js

import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import Swal from 'sweetalert2'
import Header from "../../components/Header";
import moment from "moment";

function PetCreation() {
    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm();

    const [speciesList, setSpeciesList] = useState([]);
    const [dogBreedList, setDogBreedList] = useState([]);
    const [catBreedList, setCatBreedList] = useState([]);

    function fetchSpeciesList() {
        axios.get(`/api/species`, {withCredentials: true} )
            .then(response=>{
                setSpeciesList(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    function fetchDogBreedList() {
        axios.get(`/api/breeds/dog`, {withCredentials: true} )
            .then(response=>{
                setDogBreedList(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    function fetchCatBreedList() {
        axios.get(`/api/breeds/cat`, {withCredentials: true} )
            .then(response=>{
                setCatBreedList(response.data);
            })
            .catch(err=> {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchSpeciesList();
        fetchDogBreedList();
        fetchCatBreedList();
    }, [])

    const onSubmit = (data) => {
        //console.log(data);
        let bod = data.petBirthdate;

        axios.post('/api/pets/', {
            SpeciesId: data.petSpecies,
            BreedId: data.petSpecies == 1? data.petDogBreed : data.petSpecies == 2? data.petCatBreed : 599,
            PetName: data.petName,
            PetGender: data.petGender,
            PetAgeYear: bod.substring(0, 4),
            PetAgeMonth: bod.substring(5, 7),
            PetAgeDay: bod.substring(8, 10)
        }, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                Swal.fire('Congratulations!', `${data.petName} has been added!`, 'success');
                history.push('/pets');
            }, (err) => {
                if (err.response.status === 409) {
                    Swal.fire('Oops...', err.response.data.message, 'error');
                }
                console.log(err);
            })
    }

    return (
        <div className="fontWrap">
            <div>
                <Header />
            </div>
            <div className="petsAccentBar"></div>
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

                    <Form.Group controlId="formDogPetBreed" className={watch('petSpecies') == 1? "" : "hiddenForm"}>
                        <Form.Label>Breed</Form.Label>
                        <Form.Control name="petDogBreed" as="select"
                                      ref={register()}>
                            <option>Select...</option>
                            {
                                dogBreedList.map((option, label) => {
                                    return (<option value={option.BreedId}>{option.BreedName}</option>)
                                })
                            }
                        </Form.Control>

                        <div className="text-danger">{errors.petDogBreed && "Breed is required"}</div>
                    </Form.Group>

                    <Form.Group controlId="formCatPetBreed" className={watch('petSpecies') == 2? "" : "hiddenForm"}>
                        <Form.Label>Breed</Form.Label>
                        <Form.Control name="petCatBreed" as="select"
                                      ref={register()}>
                            <option>Select...</option>
                            {
                                catBreedList.map((option, label) => {
                                    return (<option value={option.BreedId}>{option.BreedName}</option>)
                                })
                            }
                        </Form.Control>

                        <div className="text-danger">{errors.petCatBreed && "Breed is required"}</div>
                    </Form.Group>

                    <Form.Group controlId="formPetBirthdate">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control name="petBirthdate" type="date" max={moment().format("YYYY-MM-DD")} ref={register()}/>
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