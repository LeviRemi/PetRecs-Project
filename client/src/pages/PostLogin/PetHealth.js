// PetHealth.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//function PetProfile() {
  
export default class PetHealth extends Component {
  
  state = { PetId: "1", Weight: "5", Date: "2012-01-12"}

  handleChange = event => {
    //this.setState({ PetId: event.target.value, Weight: event.target.value, Date: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    //const { match: { params } } = this.props;

    const data = {
      PetId: this.state.PetId,
      Weight: this.state.Weight,
      Date: this.state.Date,
    };

    axios.post(`http://localhost:5000/api/pet-weights/`, data, {withCredentials: true} )
        .then(response=>{
            console.log(response);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(data);
            console.log(this.state.PetId);
            console.log(this.state.Weight);
            console.log(this.state.Date);
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
                  name:  pet.PetName  <br />
                  gender: pet.PetGender  <br />
              <Col>
              </Col>
              <Col>
              </Col>
            </Row>
          </div>

          <div className="petProfileNavBar">
              <Row>
              <Col sm="1">
              </Col>
              <Col>
                  <Link to="/petrecords">
                    <button className="btn-petprofile-nav">
                      Records
                    </button>
                  </Link>
                  <Link to="/pethealth">
                    <button className="btn-petprofile-nav">
                      Health
                    </button>
                  </Link>
                  <Link to="/petevents">
                    <button className="btn-petprofile-nav">
                      Events
                    </button>
                  </Link>
                  <Link to="/petreminders">
                    <button className="btn-petprofile-nav">
                      Reminders
                    </button>
                  </Link>
              </Col>
              <Col sm="1">
              </Col>
              </Row>
          </div>
        <div className="petProfileBody">
          <form onSubmit={this.handleSubmit}>
            <label>
              pet id:
              <input type="text" name="PetId" onChange={this.handleChange} />
            </label>
            <label>
              pet weight:
              <input type="text" name="Weight" onChange={this.handleChange} />
            </label>
            <label>
              date:
              <input type="date" name="Date" onChange={this.handleChange} />
            </label>
            <button type="submit"> add weight </button>
          </form>
        </div>
        </Container>

        <div className="mainPageFooter">
          <Footer />
        </div> 

      </div>
    )
}
}
