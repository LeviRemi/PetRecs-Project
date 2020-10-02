// PetHealthComponent.js

import React, { Component } from 'react';
import axios from 'axios';
import trackPromise, { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

import MaterialTable, {MTableToolbar} from "material-table";

// MT Icons
import tableIcons from '../../utils/TableIcons.js'
import AddRounded from '@material-ui/icons/AddRounded';
import UpdateRounded from '@material-ui/icons/UpdateRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   showAddWeight: false,
                   showUpdateWeight: false
                  };
    this.handleShowAddWeight = this.handleShowAddWeight.bind(this);
    this.handleCloseAddWeight = this.handleCloseAddWeight.bind(this);
    this.handleShowUpdateWeight = this.handleShowUpdateWeight.bind(this);
    this.handleCloseUpdateWeight = this.handleCloseUpdateWeight.bind(this);
    console.log("PetHealthComponent - Using PetId: " + this.state.PetId);
  }

  handleCloseAddWeight() {  this.setState({ showAddWeight: false }); }

  handleShowAddWeight() { this.setState({ showAddWeight: true }); }

  handleCloseUpdateWeight() { this.setState({ showUpdateWeight: false }); }

  handleShowUpdateWeight() { this.setState({ showUpdateWeight: true }); }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");
    
    return (

      <div id="petHealthBodyId" hidden='true'>
          <h5>Weight</h5>

          <ViewWeightComponent petid={this.state.PetId}/>
          <Button onClick={this.handleShowAddWeight} variant="outline-dark">Add Weight</Button>
          <Modal
                show={this.state.showAddWeight}
                onHide={this.handleCloseAddWeight}
                backdrop="static"
                keyboard={false}
          >
            <Modal.Header closeButton>
            <Modal.Title>Add Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddWeightComponent petid={this.state.PetId}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseAddWeight}>Close</Button>
                    <Button variant="primary" type="submit" form="AddWeightForm">Add Weight</Button>
            </Modal.Footer>
          </Modal>

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
    manuallyIncrementPromiseCounter();
    axios.get(`/api/pet-weights/pet/` + this.props.petid, {withCredentials: true} )
      .then(response=>{
        this.setState({data: response.data});
        document.getElementById("petHealthBodyId").hidden = false;
        manuallyDecrementPromiseCounter();
      })
      .catch((error) => {
          console.log(error);
          manuallyDecrementPromiseCounter();
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
        <YAxis unit="lb"/>
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

    axios.post(`/api/pet-weights/`, data, {withCredentials: true} )
        .then(response=>{
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="AddWeightForm" onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formWeight">
                <Form.Label>Pet weight</Form.Label>
                <Form.Control name="weight" type="number" min={1}
                              placeholder="Weight"
                              onChange={this.handleWeightChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" type="date" max={moment().format("YYYY-MM-DD")}
                              onChange={this.handleDateChange}
                              required/>
                </Form.Group>
              </Col>
            </Row>
          </Form>
      </div>
    )
  }
}