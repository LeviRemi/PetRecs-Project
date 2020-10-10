// PetScene.js

import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {Link, Route, Switch} from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';
import PetCard from '../../components/PetCard.js';

import PetRecordsComponent from './PetRecordsComponent.js';
import PetHealthComponent from './PetHealthComponent.js';
import PetEventsComponent from './PetEventsComponent.js';
import PetMedicationsComponent from './PetMedicationsComponent.js';
import PetAboutComponent from "./PetAboutComponent";

import isUserLoggedIn from '../../utils/AuthApi';
import {Redirect} from 'react-router-dom';

import NotFound from "../NotFound";
import LoadingIndicator from '../../utils/LoadingIndicator.js'
import axios from "axios";
import moment from "moment";
import {PetCardImage} from "../../components/PetImage";
import Container from "react-bootstrap/Container";
import {manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter} from "react-promise-tracker";
import * as Swal from "sweetalert2";

function PetScene(props) {
  console.log("'PetScene' loaded");

  const [urlpetid, setUrlpetid] = useState(useParams());
  const [petprofile, setPetprofile] = useState({pet: '', species: '', breed: ''});
  const [cardAcquired, setCardAcquired] = useState(false);
  const [infoAcquired, setInfoAcquired] = useState(undefined);
  const [petSpecies, setPetSpecies] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [speciesList, setSpeciesList] = useState([]);
  const [dogBreedList, setDogBreedList] = useState([]);
  const [catBreedList, setCatBreedList] = useState([]);
  const [records, setRecords] = useState([]);
  const [recordsAcquired, setRecordsAcquired] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsAcquired, setEventsAcquired] = useState(false);
  const [weights, setWeights] = useState([]);
  const [weightsAcquired, setWeightsAcquired] = useState(false);
  const [meds, setMeds] = useState([]);
  const [medsAcquired, setMedsAcquired] = useState(false);


  const history = useHistory();

  function fetchPetProfile() {
    manuallyIncrementPromiseCounter();
    axios.get(`/api/pets/${props.match.params.PetId}`, {withCredentials: true} )
        .then(response=>{
          const profile = response.data;

          const requestSpecies = axios.get(`/api/species/${response.data.SpeciesId}`, {withCredentials: true});
          const requestBreed = (response.data.SpeciesId === 1 || response.data.SpeciesId === 2)? axios.get(`/api/breeds/${response.data.BreedId}`, {withCredentials: true}) : "";
          axios.all([requestSpecies, requestBreed]).then(axios.spread((...responses) => {
            const responseSpecies = responses[0];
            const responseBreed = responses[1];
            setCardAcquired(true);
            setPetprofile({
                pet: profile,
                species: responseSpecies.data,
                breed: responseBreed.data
            });
            setInfoAcquired(true);
            manuallyDecrementPromiseCounter();
          })).catch(err =>{
            console.log(err);
            manuallyDecrementPromiseCounter();
          })
        })
        .catch(err=> {
          console.log(err);
            Swal.fire('Oops...', "A pet with this ID does not exist", 'error');
            history.push('/pets');
          manuallyDecrementPromiseCounter();
        })
  }
  // For after edit
  function refreshPetProfile() {
    axios.get(`/api/pets/${props.match.params.PetId}`, {withCredentials: true} )
        .then(response=>{
          const profile = response.data;

          const requestSpecies = axios.get(`/api/species/${response.data.SpeciesId}`, {withCredentials: true});
          const requestBreed = (response.data.SpeciesId === 1 || response.data.SpeciesId === 2)? axios.get(`/api/breeds/${response.data.BreedId}`, {withCredentials: true}) : "";
          axios.all([requestSpecies, requestBreed]).then(axios.spread((...responses) => {

              const responseSpecies = responses[0];
              const responseBreed = responses[1];
              setCardAcquired(true);
              setPetprofile({
                  pet: profile,
                  species: responseSpecies.data,
                  breed: responseBreed.data
              });
          })).catch(err =>{
            console.log(err);
          })
        })
        .catch(err=> {
          console.log(err);
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

  let date = (petprofile.pet.PetAgeYear + '-' + petprofile.pet.PetAgeMonth + ' ' +petprofile.pet.PetAgeDay);
  let ageYears = 10;

  if ( moment().diff(date, 'year') >= 1) {
    ageYears = moment().diff(date, 'years') + 'y';
  }

  else if (moment().diff(date, 'month') < 1 ) {
    ageYears = moment().diff(date, 'days') + 'd';
  }

  else {
    ageYears = moment().diff(date, 'months') + 'm';
  }

  function fetchRecords() {
      manuallyIncrementPromiseCounter();
      axios.get(`/api/pet-records/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setRecords(response.data);
              setRecordsAcquired(true);
              console.log(response.data);
              manuallyDecrementPromiseCounter();
          })
          .catch((error) => {
              console.log(error);
              manuallyDecrementPromiseCounter();
          })
  }

  function refreshRecords() {
      axios.get(`/api/pet-records/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setRecords(response.data);
              setRecordsAcquired(true);
              console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
  }

  function fetchEvents() {
      manuallyIncrementPromiseCounter();
      axios.get(`/api/pet-events/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setEvents(response.data);
              setEventsAcquired(true);
              manuallyDecrementPromiseCounter();
              //console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
              manuallyDecrementPromiseCounter();
          })
  }

  function refreshEvents() {
      axios.get(`/api/pet-events/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setEvents(response.data);
              setEventsAcquired(true);
              //console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
  }

  function fetchWeights() {
      manuallyIncrementPromiseCounter();
      axios.get(`/api/pet-weights/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setWeights(response.data);
              setWeightsAcquired(true);
              manuallyDecrementPromiseCounter();
          })
          .catch((error) => {
              console.log(error);
              manuallyDecrementPromiseCounter();
          })
  }

  function refreshWeights() {
      axios.get(`/api/pet-weights/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setWeights(response.data);
              setWeightsAcquired(true);
          })
          .catch((error) => {
              console.log(error);
          })
  }

  function fetchMeds() {
      manuallyIncrementPromiseCounter();
      axios.get(`/api/medications/pet/${props.match.params.PetId}`, {withCredentials: true} )
          .then(response=>{
              setMeds(response.data);
              setMedsAcquired(true);
              //console.log(this.state.medications);
              manuallyDecrementPromiseCounter();
              //console.log(response.data);
          })
          .catch((error) => {
              console.log(error);
              manuallyDecrementPromiseCounter();
          })
  }

    function refreshMeds() {
        axios.get(`/api/medications/pet/${props.match.params.PetId}`, {withCredentials: true} )
            .then(response=>{
                setMeds(response.data);
                setMedsAcquired(true);
                //console.log(this.state.medications);
                //console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

  useEffect(() => {
    fetchPetProfile();
    fetchSpeciesList();
    fetchDogBreedList();
    fetchCatBreedList();
    fetchRecords();
    fetchEvents();
    fetchWeights();
    fetchMeds();
  }, [])

  return (

    <div className="fontWrap">
      <div><Header/></div>

      <div className={"navProfBar slider"}>
        <div className="navProf">
          <Row>
            <Col>
              <div className="petProfileCard">
                <Row>
                  <Col md="1">
                    <Link to={{pathname: '/pets', state: {prevPage: "petScene"}}}>
                      <button className="back-btn-petprofile-nav">
                        &#x2b9c;
                      </button>
                    </Link>
                  </Col>
                  <Col md="auto">
                    {cardAcquired && <PetCardImage {...{PetId: petprofile.pet.PetId, ProfileUrl: petprofile.pet.ProfileUrl}}/>}
                  </Col>
                  <Col md="auto" style={{paddingLeft: "0px"}}>
                    {cardAcquired && <div className="petCardInfo FadeIn">
                      <Container fluid>
                        <Row>
                          <Col sm={{ span: 1 }} style={{right: "-5px"}}> &#128062; </Col>
                          <Col > {petprofile.pet.PetName}</Col>
                        </Row>
                        <Row>
                          <Col sm={{ span: 1 }} style={{right: "-8px"}}> &#9892; </Col>
                          <Col sm={{ span: 1 }}> {petprofile.pet.PetGender}</Col>
                          <Col sm={{ span: 1 }} style={{right: "-5px"}}> &#128197; </Col>
                          <Col sm="auto"> {ageYears} </Col>
                        </Row>
                      </Container>
                    </div>}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <PetNavBar value={urlpetid} />
            </Col>
          </Row>
        </div>
      </div>
    <LoadingIndicator></LoadingIndicator>
    <div className="fullPageContainer">
      <div className="mainContent">
        <Route exact path='/Pets/:PetId/Records' component={(props)=>isUserLoggedIn()?<PetRecordsComponent records={records} fetch={refreshRecords} acquired={recordsAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path="/Pets/:PetId/Health" component={(props)=>isUserLoggedIn()?<PetHealthComponent weights={weights} fetch={refreshWeights} acquired={weightsAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/Pets/:PetId/Events' component={(props)=>isUserLoggedIn()?<PetEventsComponent events={events} fetch={refreshEvents} acquired={eventsAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/Pets/:PetId/Medications' component={(props)=>isUserLoggedIn()?<PetMedicationsComponent meds={meds} fetch={refreshMeds} acquired={medsAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/Pets/:PetId/' component={(props)=>isUserLoggedIn()?<PetAboutComponent profile={petprofile} acquired={infoAcquired} speciesList={speciesList} catList={catBreedList} dogList={dogBreedList} fetch={refreshPetProfile} {...props} /> : <Redirect to={"/"}/>} />
      </div>
    </div>
      <div className="mainPageFooter">
        <Footer />
      </div>
  </div>
    )
}

export default PetScene