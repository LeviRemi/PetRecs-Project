// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { storage } from "../../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Style
import './Pets.css'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Components
import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import FileUpload from '../../../utils/FileUpload.js';

export default class Pets extends Component {

    state = { pets: [], 
              account: {},
              petImages: [] }

    componentDidMount() {
      Promise.all([
        axios.get("/api/pets/", { withCredentials: true }), 
        axios.get("/api/accounts/1/", { withCredentials: true })
      ]).then(([petResponse, accountResponse]) => {
          const pets = petResponse.data;
          const account = accountResponse.data;
          this.setState({  pets, account });
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render() {
    const account = this.state.account;
    return (
        <div className="fullPageContainer">
          <div>
            <Header />
          </div>
          <Container fluid>
            <div className="mainPageBody nopadding">
                <div className="mainPageContents">
                {console.log("loading")}
                  { this.state.pets.map(pet => 
                  <Link id="PetLink" to={"/Pets/Profile/" + pet.PetId}>
                    <div id="PetContainer">
                      <div id="PetCircle">
                        <img  id={"ImageId" + pet.PetId} src={pet.ProfileUrl} class="PetImage"></img>
                      </div>
                      <div>
                          <p class="NameText">{pet.PetName}</p> 
                      </div>
                    </div>
                  </Link>
                  )}
                  {console.log("loaded")}
                  <Link id="PetLink">
                    <div id="AddPetContainer">
                      <div id="AddPetCircle">
                        <img  class="AddPetImage"></img>
                        <p id="AddPetText">Add Pet<br />< FontAwesomeIcon id="PlusIcon" icon="plus" size="2x" /></p>
                      </div>
                    </div>
                  </Link>
                </div>
            </div>
          </Container>
          <div className="mainPageFooter">
            <Footer />
          </div> 
        </div>
    )
    }
}