// PetHealthComponent.js

import React, { Component } from 'react'
import axios from 'axios';
  
export default class PetHealthComponent extends Component {
  
  state = { PetId: "1", Weight: "5", Date: "2012-01-12"}

  handleChange = event => {
    //this.setState({ PetId: event.target.value, Weight: event.target.value, Date: event.target.value });
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
            console.log(this.state.PetId);
            console.log(this.state.Weight);
            console.log(this.state.Date);
            console.log(error);
        })

  }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");

    const { pet } = this.state;
    
    return (

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
      
    )
}
}
