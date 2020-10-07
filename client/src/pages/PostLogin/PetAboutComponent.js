// PetAboutComponent.js

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import PetImage, {PetCardImage, PetProfileImage} from "../../components/PetImage";
import axios from "axios";
import trackPromise, { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';

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

import '../../utils/FileUpload/FileUpload.css'

function PetAboutComponent(props) {
    const history = useHistory();
    const [petprofile, setPetprofile] = useState('');
    const [profilepreview, setProfilePreview] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [petBreed, setPetBreed] = useState('');
    const [show, setShow] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [speciesList, setSpeciesList] = useState([]);
    const [dogBreedList, setDogBreedList] = useState([]);
    const [catBreedList, setCatBreedList] = useState([]);
    const { register, handleSubmit, errors, watch } = useForm();
    const [isLoading, setLoading] = useState({display: "none"});

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [urlpetid, setUrlpetid] = useState(useParams());

    //const handleCloseUpload = () => props.closeModal();

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    function fetchPetProfile() {
        document.getElementById("petProfileBodyId").hidden = true;
        manuallyIncrementPromiseCounter();
        axios.get(`/api/pets/${props.match.params.PetId}`, {withCredentials: true} )
            .then(response=>{
                setPetprofile(response.data);
                setProfilePreview(response.data.ProfileUrl);

                const requestSpecies = axios.get(`/api/species/${response.data.SpeciesId}`, {withCredentials: true});
                const requestBreed = (response.data.SpeciesId === 1 || response.data.SpeciesId === 2)? axios.get(`/api/breeds/${response.data.BreedId}`, {withCredentials: true}) : "";

                axios.all([requestSpecies, requestBreed]).then(axios.spread((...responses) => {
                    const responseSpecies = responses[0];
                    const responseBreed = responses[1];

                    setPetSpecies(responseSpecies.data);
                    setPetBreed(responseBreed.data);
                    document.getElementById("petProfileBodyId").hidden = false;
                    manuallyDecrementPromiseCounter();
                })).catch(err =>{
                    console.log(err);
                    manuallyDecrementPromiseCounter();
                })
            })
            .catch(err=> {
                Swal.fire('Oops...', "A pet with this ID does not exist", 'error');
                manuallyDecrementPromiseCounter();
                history.push('/pets');
            })
    }

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
        fetchPetProfile();
        fetchSpeciesList();
        fetchDogBreedList();
        fetchCatBreedList();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseShare = () => setShowShare(false);
    const handleShowShare = () => setShowShare(true);
    const handleCloseUpload = () => setShowUpload(false);
    const handleShowUpload = () => setShowUpload(true);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    // Handling file selection from input
    const onFileSelected = async (e) => {
        console.log("File Selected");
      if (e.target.files[0]) {
        setSelectedFile(e.target.files[0], handleFileUpload);
        setFileName(e.target.files[0].name);
        setProfilePreview(URL.createObjectURL(e.target.files[0]));
      }
    };

    const onSubmit = (data) => {
        setLoading({display: "initial"});
        let bod = data.petBirthdate;

        axios.put(`/api/pets/${petprofile.PetId}`, {
            PetName: data.petName,
            SpeciesId: data.petSpecies,
            BreedId: data.petSpecies == 1? data.petDogBreed : data.petSpecies == 2? data.petCatBreed : 599,
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
                handleClose();
                Swal.fire('Congratulations!', "This pet profile has been updated", 'success').then(function() {
                    //fetchPetProfile();
                    window.location.reload();
                  });
            }, (err) => {
                setLoading({display: "none"});
                console.log(err.response.status)
                Swal.fire('Oops...', "You do not have permission to update this pet profile", 'error');
            })


    }

    const onShare = (data) => {
        console.log(data);
        setLoading({display: "initial"});

        axios.post(`/api/pets/${petprofile.PetId}/share`, {
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
                axios.delete(`/api/pets/${petprofile.PetId}`, {withCredentials: true})
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

    // Uploading image to Cloud Storage
    const handleFileUpload = async (e) => {
        setLoading({display: "initial"});
        e.preventDefault();

        const allowedFileTypes = ["png", "jpg", "jpeg"];
        // First validate that user is owner of pet
        axios.get(`/api/pets/${petprofile.PetId}/validate`, {withCredentials: true})
            .then(res => {
                // Then validate that file is of the correct type
                if (!allowedFileTypes.includes(fileName.substr(fileName.length - 3).toLowerCase())
                    && !allowedFileTypes.includes(fileName.substr(fileName.length - 4).toLowerCase())) {
                    setLoading({display: "none"});
                    Swal.fire("Oops...", "We only accept jpg or png files", "error");
                    return;
                } else {
                    // If validations pass, attempt the upload
                    try {
                        if (selectedFile !== '') {
                            // Creating a FormData object
                            let fileData = new FormData();

                            // Adding the 'image' field and the selected file as value to our FormData object
                            // Changing file name to make it unique and avoid potential later overrides
                            fileData.set(
                                'image',
                                selectedFile,
                                `${Date.now()}-${selectedFile.name}`,
                            );
                            console.log(fileData);
                            axios.post("/api/upload", fileData, {withCredentials: true})
                                .then((response) => {
                                    axios.put('/api/pets/' + urlpetid.PetId, {"ProfileUrl": response.data.fileLocation},
                                        {Params: {id: urlpetid.PetId}, withCredentials: true })
                                        .then((res) => {
                                            setLoading({display: "none"});
                                            console.log(res);
                                            handleCloseUpload();
                                            Swal.fire("Congratulations!", "Profile picture updated", "success").then(function() {
                                                window.location.reload();
                                              });
                                        })
                                }, (error) => {
                                    setLoading({display: "none"});
                                    Swal.fire("Oops...", `Error uploading file ${fileName}`, "error");
                                    console.log(error);
                                });
                        }
                    } catch (error) {
                        setLoading({display: "none"});
                        Swal.fire("Oops...", "No file was selected", "error");
                        console.log(error);
                    }
                }
            })
            .catch(err => {
                setLoading({display: "none"});
                Swal.fire("Oops...", "Only owners can change a pet's profile photo", "error");
                return;
            })
    };

    return (
        <Container id="petProfileBodyId" className="petProfileBody shadowedBox" style={{textAlign: "center"}} hidden={true}>

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
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formPetName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="petName" type="text" placeholder="Pet name" defaultValue={petprofile.PetName}
                                                  ref={register({ required: true,
                                                      maxLength: {value: 45, message: "Name must be under 45 characters in length"}
                                                  })}/>
                                    <div className="text-danger">{errors.petName && (errors.petName.message || "Name is required")}</div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPetSpecies">
                                    <Form.Label>Species</Form.Label>
                                    <Form.Control name="petSpecies" as="select" defaultValue={petprofile.SpeciesId} ref={register()}
                                    >
                                        {
                                            speciesList.map((option, label) => {
                                                return (<option key={label} value={option.SpeciesId}>{option.SpeciesName}</option>)
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="formDogPetBreed" className={watch('petSpecies') == 1? "" : petprofile.SpeciesId === 1? "" : "hiddenForm"}>
                            <Form.Label>Breed</Form.Label>
                            <Form.Control name="petDogBreed" as="select" defaultValue={petprofile.BreedId}
                                          ref={register()}>
                                <option>Select...</option>
                                {
                                    dogBreedList.map((option, label) => {
                                        return (<option value={option.BreedId} key={option.BreedId}>{option.BreedName}</option>)
                                    })
                                }
                            </Form.Control>

                            <div className="text-danger">{errors.petDogBreed && "Breed is required"}</div>
                        </Form.Group>

                        <Form.Group controlId="formCatPetBreed" className={watch('petSpecies') == 2? "" : petprofile.SpeciesId === 2? ""  : "hiddenForm"}>
                            <Form.Label>Breed</Form.Label>
                            <Form.Control name="petCatBreed" as="select" defaultValue={petprofile.BreedId}
                                          ref={register()}>
                                <option>Select...</option>
                                {
                                    catBreedList.map((option, label) => {
                                        return (<option value={option.BreedId} key={option.BreedId}>{option.BreedName}</option>)
                                    })
                                }
                            </Form.Control>

                            <div className="text-danger">{errors.petCatBreed && "Breed is required"}</div>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formPetGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control name="petGender" as="select"  defaultValue={petprofile.PetGender}  ref={register()}
                                    >
                                        <option value="F">Female</option>
                                        <option value="M">Male</option>
                                        <option value="NA">Unknown</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPetBirthdate">
                                    <Form.Label>Birthdate</Form.Label>
                                    <Form.Control name="petBirthdate" type="date"
                                                  defaultValue={petprofile.PetAgeYear + "-"
                                                  + String(petprofile.PetAgeMonth).padStart(2, '0') + "-"
                                                  + String(petprofile.PetAgeDay).padStart(2, '0') } ref={register()}/>
                                </Form.Group>
                            </Col>
                        </Form.Row>

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
            {/*Share Pet Profile*/}
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
            {/*Update Profile Picture*/}
            <Modal
                show={showUpload}
                onHide={handleCloseUpload}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Picture</Modal.Title>
                </Modal.Header>

                <div id="UploadButtons">
                    <Modal.Body>
                        <PetProfileImage {...{PetId: petprofile.PetId, ProfileUrl: profilepreview}}/>
                        <div>
                            <br />
                            <Button onClick={handleClick} variant="secondary">Select Image</Button>
                            <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} style={{display: "none"}} />
                            <p id="fileChosen">File Selected: {fileName || "none"}</p>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <div style={isLoading}>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpload}>Close</Button>
                        <Button variant="primary" onClick={handleFileUpload}>Save Profile Picture</Button>
                    </Modal.Footer>

                </div>

            </Modal>

            <Row>
                <Col></Col>
                <Col>
                    <PetProfileImage {...{PetId: petprofile.PetId, ProfileUrl: petprofile.ProfileUrl}}/>
                    <Button onClick={handleShowUpload} style={{borderRadius: "100%", height: "48px", position: "absolute", bottom: "5px", backgroundColor: "rgba(255,255,255,0.7)", right: "85px", zIndex: "5"}} variant="light"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-camera-fill" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path fillRule="evenodd"
                              d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                    </svg></Button>

                </Col>
                <Col style={{textAlign: "right"}}>
                    <Button onClick={handleShowShare} variant="" style={{top: "0%"}} >
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711C15.3166 7.09763 14.6834 7.09763 14.2929 6.70711L13 5.41421V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V5.41421L9.70711 6.70711C9.31658 7.09763 8.68342 7.09763 8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289L11.2929 2.29289ZM4 11C4 9.89543 4.89543 9 6 9H8C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11H6V20H18V11H16C15.4477 11 15 10.5523 15 10C15 9.44772 15.4477 9 16 9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11Z" fill="#282828"></path>
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
                {petSpecies.SpeciesName === "Dog"? <Col><h6>Breed: {petBreed.BreedName}</h6></Col> : ""}
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