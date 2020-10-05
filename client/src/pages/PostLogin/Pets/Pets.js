// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import trackPromise, { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';

// Style
import './Pets.css'
import Container from 'react-bootstrap/Container';

// Components
import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import PetImage from '../../../components/PetImage.js'
import LoadingIndicator from '../../../utils/LoadingIndicator.js'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
export default class Pets extends Component {

    state = { pets: [],
              sharedPets: [],
              petImages: [] }


    componentDidMount() {
      // Get owned pets
      manuallyIncrementPromiseCounter();
        axios.get("/api/pets/", { withCredentials: true })
            .then((petResponse) => {
              const pets = petResponse.data;
              this.setState({ pets });
              manuallyDecrementPromiseCounter();
              document.getElementById('petsPage').hidden = false;
            })
            .catch((error) => {
              console.log(error);
              manuallyDecrementPromiseCounter();
            })
        // Get shared pets
        axios.get("/api/pets/shared", { withCredentials: true })
            .then((petResponse) => {
                const sharedPets = petResponse.data;
                this.setState({ sharedPets });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
    return (

      <div className="fontWrap">
        <div>
          <Header />
        </div>

        <div className="petsAccentBar"></div>
    
        <div className="fullPageContainer">

          <LoadingIndicator></LoadingIndicator>
            <Container fluid>
              <div id="petsPage" className="mainPageBody nopadding" hidden={true}>
                  <Tabs defaultActiveKey="myPets" id="petsViewTab">
                      <Tab eventKey="myPets" title="My Pets">
                          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "baseline"}}
                               className="mainPageContents shadowedBox">
                              {this.state.pets.map(pet =>
                                  <div className="PetContainer">
                                      <Link id="PetLink" to={"/Pets/" + pet.PetId} key={pet.PetId}>
                                          <PetImage {...{PetId: pet.PetId, ProfileUrl: pet.ProfileUrl}}/>
                                      </Link>
                                      <div className="text-center">
                                          <p style={{width: "129px", margin: "auto"}} className="NameText">{pet.PetName}</p>
                                      </div>
                                  </div>
                              )}
                              <div className="PetContainer">
                                  <Link id="AddPetLink" to={"/Pets/New"}>
                                      <div id="AddPetCircle">
                                          <img className="AddPetImage"></img>
                                          <p id="AddPetText">Add Pet<br/>< FontAwesomeIcon id="PlusIcon" icon="plus"
                                                                                           size="2x"/></p>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      </Tab>
                      <Tab eventKey="sharedWithMe" title="Shared With Me">
                          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "baseline"}}
                               className="mainPageContents shadowedBox">
                              {this.state.sharedPets.map(pet =>
                                  <div className="PetContainer">
                                      <Link id="PetLink" to={"/Pets/" + pet.PetId} key={pet.PetId}>
                                          <PetImage {...{PetId: pet.PetId, ProfileUrl: pet.ProfileUrl}}/>
                                      </Link>
                                      <div className="text-center">
                                          <p style={{width: "129px", margin: "auto"}} className="NameText">{pet.PetName}</p>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </Tab>
                  </Tabs>



              </div>
            </Container>
      </div>
          <div className="mainPageFooter">
              <Footer />
          </div>
    </div>
    )
  }
}
