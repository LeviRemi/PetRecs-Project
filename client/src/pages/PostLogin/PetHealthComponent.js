// PetHealthComponent.js

import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
  
export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId};
    console.log("PetHealthComponent - Using PetId: " + props.match.params.PetId);
  }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");
    
    return (

      <div>
        <h3>View Weight</h3>
        <ViewWeightComponent petid={this.state.PetId}/>
        <h3>Add Weight</h3>
        <AddWeightComponent petid={this.state.PetId}/>
      </div>
        
    )
  }
}

class ViewWeightComponent extends Component {
  constructor(props) {
    super();
  }

  render(){

    return (
      <div>
          content goes here
      </div>
    )
  }
}

class AddWeightComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.petid, Weight: '', Date: ''};
    console.log("Component: 'AddWeightComponent' loaded");
  };

  handleWeightChange = event => {
    this.setState({Weight: event.target.value});
  }
  handleDateChange = event => {
    this.setState({Date: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      PetId: this.state.PetId,
      Weight: this.state.Weight,
      Date: this.state.Date,
    };

    axios.post(`http://localhost:5000/api/pet-weights/`, data, {withCredentials: true} )
        .then(response=>{
            console.log(response);
        })
        .catch((error) => {
            console.log(data);
            console.log(error);
        })
  }

  render() {
    return (
      <div className="formBox">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formWeight">
              <Form.Label>Pet weight</Form.Label>
              <Form.Control name="weight" type="number" placeholder="Weight"
                            onChange={this.handleWeightChange}
                            required/>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control name="date" type="date"
                            onChange={this.handleDateChange}
                            required/>
            </Form.Group>

            <Button type="submit"> Add Weight </Button>
          </Form>
      </div>
    )
  }
}