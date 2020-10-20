// PetScene.js

import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {Link, Route} from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';

import PetRecordsComponent from './PetRecordsComponent.js';
import PetHealthComponent from './PetHealthComponent.js';
import PetEventsComponent from './PetEventsComponent.js';
import PetMedicationsComponent from './PetMedicationsComponent.js';
import PetAboutComponent from "./PetAboutComponent";

import isUserLoggedIn from '../../utils/AuthApi';
import {Redirect} from 'react-router-dom';

import LoadingIndicator from '../../utils/LoadingIndicator.js'
import axios from "axios";
import moment from "moment";
import {PetCardImage} from "../../components/PetImage";
import Container from "react-bootstrap/Container";
import {manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter} from "react-promise-tracker";
import * as Swal from "sweetalert2";

function PetScene(props) {
  //console.log("'PetScene' loaded");

  const [urlpetid] = useState(useParams());
  const [petprofile, setPetprofile] = useState({pet: '', species: '', breed: ''});
  const [cardAcquired, setCardAcquired] = useState(false);
  const [infoAcquired, setInfoAcquired] = useState(undefined);
  const [speciesList, setSpeciesList] = useState([]);
  const [dogBreedList, setDogBreedList] = useState([]);
  const [catBreedList, setCatBreedList] = useState([]);
  const [records, setRecords] = useState([]);
  const [events, setEvents] = useState([]);
  const [weights, setWeights] = useState([]);
  const [meds, setMeds] = useState([]);
  const [sharedAccts, setSharedAccts] = useState([]);


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
            manuallyDecrementPromiseCounter();
            setInfoAcquired(true);
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
  let ageYears;

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
              //console.log(response.data);
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
              //console.log(response.data);
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
                //console.log(this.state.medications);
                //console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

  function fetchSharedAccounts() {
      axios.get(`/api/pets/${props.match.params.PetId}/getShared`, {withCredentials: true})
          .then(response=> {
              setSharedAccts(response.data);
              //console.log(response.data);
          })
          .catch(err => {
              console.log(err);
          })
  }

  useEffect(() => {
    fetchPetProfile();
    fetchSharedAccounts();
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
        <Route exact path='/pets/:PetId/records' component={(props)=>isUserLoggedIn()?<PetRecordsComponent records={records} fetch={refreshRecords} acquired={infoAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path="/pets/:PetId/health" component={(props)=>isUserLoggedIn()?<PetHealthComponent weights={weights} fetch={refreshWeights} acquired={infoAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/pets/:PetId/journal' component={(props)=>isUserLoggedIn()?<PetEventsComponent events={events} fetch={refreshEvents} acquired={infoAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/pets/:PetId/medications' component={(props)=>isUserLoggedIn()?<PetMedicationsComponent meds={meds} fetch={refreshMeds} acquired={infoAcquired} {...props} /> : <Redirect to={"/"}/>} />
        <Route exact path='/pets/:PetId/about' component={(props)=>isUserLoggedIn()?<PetAboutComponent profile={petprofile} acquired={infoAcquired} speciesList={speciesList} catList={catBreedList} dogList={dogBreedList} sharedAccts={sharedAccts} refreshShares={fetchSharedAccounts} fetch={refreshPetProfile} {...props} /> : <Redirect to={"/"}/>} />
      </div>
    </div>
      <div className="mainPageFooter">
        <Footer />
      </div>
  </div>
    )
}

export default PetScene