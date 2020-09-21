// PetHealthComponent.js

import React, { Component } from 'react'
import axios from 'axios';
  
export default class PetHealthComponent extends Component {

  constructor(props) {
    super(props);
    console.log("PetHealthComponent - Using PetId: " + props.match.params.PetId);
    this.state = { PetId: props.match.params.PetId, Weight: "", Date: ""}
  }

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
            console.log(response.data);
        })
        .catch((error) => {
            console.log(data);
            console.log(this.state.Weight);
            console.log(this.state.Date);
            console.log(error);
        })

  }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");
    
    return (

          <form onSubmit={this.handleSubmit}>
            <label>
              pet id: {this.handlePetIdChange}
            </label>
            <label>
              pet weight:
              <input type="text" name="Weight" value={this.state.value} onChange={this.handleWeightChange} />
            </label>
            <label>
              date:
              <input type="date" name="Date" value={this.state.value} onChange={this.handleDateChange} />
            </label>
            <button type="submit"> add weight </button>
          </form>
      
    )
}
}