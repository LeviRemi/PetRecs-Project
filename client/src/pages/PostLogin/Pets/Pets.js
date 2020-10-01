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
              petImages: [] }

    componentDidMount() {
        axios.get("/api/pets/", { withCredentials: true })
            .then((petResponse) => {
          const pets = petResponse.data;
          this.setState({ pets });
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
            <Container fluid>
              <div className="mainPageBody nopadding">
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "start", alignItems: "baseline"}} className="mainPageContents">
                    { this.state.pets.map(pet =>
                        <div id="PetContainer">
                            <Link id="PetLink" to={"/Pets/" + pet.PetId} key={pet.PetId}>
                                <PetImage {...{PetId: pet.PetId, ProfileUrl: pet.ProfileUrl}}/>
                            </Link>
                            <div className="text-center">
                                <p style={{width: "129px", margin: "auto"}} className="NameText">{pet.PetName}</p>
                            </div>
                        </div>
                    )}
                    <div id="PetContainer">
                        <Link id="PetLink" to={"/Pets/New"}>
                            <div id="AddPetCircle">
                              <img className="AddPetImage"></img>
                              <p id="AddPetText">Add Pet<br />< FontAwesomeIcon id="PlusIcon" icon="plus" size="2x" /></p>
                            </div>
                        </Link>
                    </div>
                  </div>
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
