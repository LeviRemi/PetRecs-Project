// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { storage } from "../../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import './Pets.css'

import Header from '../../../components/Header.js';
import Footer from '../../../components/Footer.js';
import FileUpload from '../../../utils/FileUpload.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function HasProfilePic(props) {

  var imageRef = storage.child(`PetImages/`+String(props.AccountId) + String(props.PetId)+`.png`);
  console.log(props.PetId);
  imageRef.getDownloadURL().then((url) => {
    var img = document.getElementById('ImageId' + props.PetId);
    img.src = url;
    console.log(url);
  }).catch((error) => {
    var img = document.getElementById('ImageCircle');
    var url = "https://firebasestorage.googleapis.com/v0/b/petrecs-file-system.appspot.com/o/PetImages%2FPetRecsDefault.png?alt=media&token=eaa9f503-8783-4a18-ae32-c53bd67a5fc4";
    img.src = url;
  })
  return null;
}

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
                  
                  { this.state.pets.map(pet => 
                  <Link id="PetLink" to={"/Pets/Profile/" + pet.PetId}>
                    <div id="PetContainer">
                      <div id="PetCircle">
                        <img  id={"ImageId" + pet.PetId} class="PetImage"></img>
                        {<HasProfilePic AccountId={account.AccountId} PetId={pet.PetId}/>}
                      </div>
                      <div>
                          <p id="NameText">{pet.PetName}</p> 
                      </div>
                    </div>
                  </Link>
                  )}
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