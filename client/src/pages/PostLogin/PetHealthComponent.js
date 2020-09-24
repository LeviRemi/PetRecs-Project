// PetHealthComponent.js

import React, { Component } from 'react';
import axios from 'axios';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
  
export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId };
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
    this.state = { data: [{Weight: '', Date: ''}] };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/pet-weights/pet/` + this.props.petid, {withCredentials: true} )
      .then(response=>{
        this.setState({data: response.data});
      })
      .catch((error) => {
          console.log(error);
      })
  }

  render(){
    let petData = this.state.data;

    let sortedData = petData.sort(function (a, b) {
      let formattedA = moment(a.Date);
      let formattedB = moment(b.Date);
      return ( formattedA - formattedB );
    });
    
    const fixedData = [];
    
    sortedData.forEach(function (weightEntry) {
      fixedData.push({Date: moment(weightEntry.Date).format("MMM DD, YYYY"), Weight: weightEntry.Weight});
    });

    const dateFormatter = tickItem => moment(tickItem).format("MMM YY");

    return (
      <LineChart
        width={500} height={300}
        data={fixedData}
        margin={{top: 5, right: 20, left: 20, bottom: 10,}}
      >
        <XAxis tickFormatter={dateFormatter} dataKey="Date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="Weight" stroke="#8884d8" activeDot={{r: 4}} />
      </LineChart>
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