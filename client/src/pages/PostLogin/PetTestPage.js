// PetTestPage.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import PetNavBar from '../../components/PetNavBar.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//function PetProfile() {
  
export default class PetTestPage extends Component {
  
  state = { pet: {} }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`http://localhost:5000/api/pets/${params.PetId}`, {withCredentials: true} )
        .then(response=>{
            console.log(response.data);
            //const pet = response.data;
            this.setState({ pet: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
}

  render() {
    const { pet } = this.state;
    return (
      <div className="fullPageContainer">
        <div>
          <Header />
        </div>

        <Container fluid className="petProfileWindow">
          <div className="petProfileCard">
            <Row>
              <Col>
                <Link to="/pets">
                <button className="btn-petprofile-nav">
                    &lt;&lt;Back
                </button>
                </Link>
              </Col>
                  name: {pet.PetName} <br />
                  gender: {pet.PetGender} <br />
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>
          </div>
          <div>
            <PetNavBar />
          </div>
        <div className="petProfileBody">
            <h4> Pet Profile </h4>
              name: {pet.PetName} <br />
              gender: {pet.PetGender} <br />
              birthday: {pet.PetAgeMonth}/{pet.PetAgeDay}/{pet.PetAgeYear}<br />
              allergies: {pet.AllergyNotes}<br />
              care notes: {pet.CareNotes}<br />
              food notes: {pet.FoodNotes}<br />
              pet ID: {pet.PetId}<br />
              species ID:{pet.SpeciesId}<br />
        </div>
        </Container>
        <div className="mainPageFooter">
          <Footer />
        </div> 
      </div>
    )
}
}

//export default PetProfile