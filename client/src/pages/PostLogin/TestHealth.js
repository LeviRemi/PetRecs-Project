// TestHealth.js

import React, { Component } from 'react';
import axios from 'axios';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
  
export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    //this.state = { PetId: props.match.params.PetId};
    //console.log("PetHealthComponent - Using PetId: " + props.match.params.PetId);
  }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");
    
    return (

      <div>
        <h3>View Weight component here</h3>
        <ViewWeightComponent />
        <h3>Add Weight component here</h3>

      </div>
        
    )
  }
}

class ViewWeightComponent extends Component {
  constructor(props) {
    super();
  }

  render(){

    const data = [{"PetWeightId":1,"PetId":1,"Weight":28,"Date":"2019-03-19"},
    {"PetWeightId":2,"PetId":1,"Weight":34,"Date":"2019-04-22T00:00:00.000Z"},
    {"PetWeightId":3,"PetId":1,"Weight":31,"Date":"2019-05-11T00:00:00.000Z"},
    {"PetWeightId":4,"PetId":1,"Weight":33,"Date":"2019-06-18T00:00:00.000Z"},
    {"PetWeightId":5,"PetId":1,"Weight":30,"Date":"2019-07-13T00:00:00.000Z"},
    {"PetWeightId":6,"PetId":1,"Weight":29,"Date":"2019-08-14T08:00:00.000Z"},
    {"PetWeightId":12,"PetId":1,"Weight":28,"Date":"2019-09-15T08:00:00.000Z"},
    {"PetWeightId":13,"PetId":1,"Weight":34,"Date":"2019-10-18T00:00:00.000Z"},
    {"PetWeightId":14,"PetId":1,"Weight":33,"Date":"2019-02-19T00:00:00.000Z"},
    {"PetWeightId":15,"PetId":1,"Weight":34,"Date":"2019-03-09T00:00:00.000Z"},
    {"PetWeightId":16,"PetId":1,"Weight":31,"Date":"2019-04-13T00:00:00.000Z"},
    {"PetWeightId":16,"PetId":1,"Weight":32,"Date":"2019-05-18T00:00:00.000Z"},
    {"PetWeightId":17,"PetId":1,"Weight":32,"Date":"2019-09-15T00:00:00.000Z"},
    {"PetWeightId":18,"PetId":1,"Weight":33,"Date":"2020-08-02T00:00:00.000Z"},
    {"PetWeightId":19,"PetId":1,"Weight":34,"Date":"2020-07-09T00:00:00.000Z"},
    {"PetWeightId":20,"PetId":1,"Weight":35,"Date":"2020-06-12T00:00:00.000Z"},
    {"PetWeightId":23,"PetId":1,"Weight":32,"Date":"2020-05-08T00:00:00.000Z"}];

    let sortedData = data.sort(function (a, b) {
      let formattedA = moment(a.Date);
      let formattedB = moment(b.Date);
      return ( formattedA - formattedB );
    });

    //console.log(sortedData);

    const fixedData = [];
    
    sortedData.forEach(function (weightEntry) {
      fixedData.push({Date: moment(weightEntry.Date).format("MMM DD, YYYY"), Weight: weightEntry.Weight});
    });

    //console.log(fixedData);

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

    axios.post(`http://petrecs.herokuapp.com/api/pet-weights/`, data, {withCredentials: true} )
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