// Pets.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Pets.css'

import Header from './Header.js';
import Footer from './Footer.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PetObject = props => (
    <Link id="PetLink" to="/Pets">
        <div id="PetContainer">
            <div id="ImageCircle">
                <p id="PetText">Add Pet</p>
            </div>
            <div>
                <p id="NameText">{props.petObject.PetName}</p>
            </div>
        </div>
    </Link>
)

export default class Pets extends Component {

    state = { pets: [] }

    componentDidMount() {
        axios.get("http://localhost:5000/api/pets/", { withCredentials: true })
            .then(response=>{
                const pets = response.data;
                this.setState({ pets });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
    return (
        <div className="fullPageContainer">
        
        <div>
          <Header />
        </div>
        <div className="mainPageBody nopadding">
          <Container fluid>
              <div className="mainPageContents">
                { this.state.pets.map(pet => 
                <Link id="PetLink" to="/Pets">
                  <div id="PetContainer">
                    <div id="ImageCircle">
                        <p id="PetText">Add Pet</p>
                    </div>
                    <div>
                        <p id="NameText">{pet.PetName}</p>
                    </div>
                  </div>
                </Link>
                )}
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

//export default Pets