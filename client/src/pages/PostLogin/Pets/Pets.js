// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Style
import './Pets.css'
import Container from 'react-bootstrap/Container';

// Components
import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import PetImage from '../../../components/PetImage.js'

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

      <div className="fontWrap">
        <div>
          <Header />
        </div>

        <div className="petsAccentBar"></div>
    
        <div className="fullPageContainer">
          <div className="mainContent">
            <Container fluid>
              <div className="mainPageBody nopadding">
                  <div className="mainPageContents">
                    { this.state.pets.map(pet => 
                    <Link id="PetLink" to={"/Pets/" + pet.PetId} key={pet.PetId}>
                      <PetImage {...{PetId: pet.PetId, ProfileUrl: pet.ProfileUrl}}/>
                        <div>
                            <p className="NameText">{pet.PetName}</p> 
                        </div>
                    </Link>
                    )}
                    <Link id="PetLink" to={"/Pets/New"}>
                      <div id="AddPetContainer">
                        <div id="AddPetCircle">
                          <img className="AddPetImage"></img>
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
      </div>
    </div>   
    )
  }
}
