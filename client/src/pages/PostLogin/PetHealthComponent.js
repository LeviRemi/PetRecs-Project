// PetHealthComponent.js

import React, { Component } from 'react';
import axios from 'axios';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
  
export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   showAddWeight: false,
                   showUpdateWeight: false,
                   showAddMed: false,
                   showUpdateMed: false };
    this.handleShowAddWeight = this.handleShowAddWeight.bind(this);
    this.handleCloseAddWeight = this.handleCloseAddWeight.bind(this);
    this.handleShowUpdateWeight = this.handleShowUpdateWeight.bind(this);
    this.handleCloseUpdateWeight = this.handleCloseUpdateWeight.bind(this);
    this.handleShowAddMed = this.handleShowAddMed.bind(this);
    this.handleCloseAddMed = this.handleCloseAddMed.bind(this);
    this.handleShowUpdateMed = this.handleShowUpdateMed.bind(this);
    this.handleCloseUpdateMed = this.handleCloseUpdateMed.bind(this);
    console.log("PetHealthComponent - Using PetId: " + this.state.PetId);
  }

  handleCloseAddWeight() {  this.setState({ showAddWeight: false }); }

  handleShowAddWeight() { this.setState({ showAddWeight: true }); }

  handleCloseUpdateWeight() { this.setState({ showUpdateWeight: false }); }

  handleShowUpdateWeight() { this.setState({ showUpdateWeight: true }); }

  handleCloseAddMed() { this.setState({ showAddMed: false }); }

  handleShowAddMed() { this.setState({ showAddMed: true }); }

  handleCloseUpdateMed() { this.setState({ showUpdateMed: false }); }

  handleShowUpdateMed() { this.setState({ showUpdateMed: true }); }

  render() {
    
    console.log("Component: 'PetHealthComponent' loaded");
    
    return (

      <div>
        <Row>
          <Col>
          <h5>Meds</h5>
          <MedsComponent petid={this.state.PetId}/>
          <div>
            <Button onClick={this.handleShowAddMed} variant="outline-dark">Add Event</Button>
            <Modal
                show={this.state.showAddMed}
                onHide={this.handleCloseAddMed}
                backdrop="static"
                keyboard={false}
          >
            <Modal.Header closeButton>
            <Modal.Title>Add Medication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddMedicationComponent petid={this.state.PetId}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseAddMed}>Close</Button>
                    <Button variant="primary" type="submit" form="AddMedForm">Add Medication</Button>
            </Modal.Footer>
          </Modal>
          </div>
          </Col>

          <Col>
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
          </Col>
        </Row>

        
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

class MedsComponent extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = { PetId: props.petid,
                   medications: [],
                   MedicationId: ''
                  };
  }

  updateStateMedicationId(buttonMedicationId) { this.setState({ MedicationId: buttonMedicationId }); }


  deleteMedication = async (MedicationId) => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      axios.delete(`http://localhost:5000/api/medications/` + MedicationId, {withCredentials: true} )
        .then(response=>{
          //this.setState({events: response.data});
          console.log("Medication " + MedicationId + " deleted sucessfully.");
        })
        .catch((error) => {
          console.log(error);
        })
      }
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/medications/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({medications: response.data});
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  renderTableData() {
    return this.state.medications.map((medication, index) => {
      const { MedicationId, DosageAmount, DosageUnit, StartDate, EndDate, Notes } = medication
      return (
        <tr key={MedicationId}>
          <td>{DosageAmount}</td>
          <td>{DosageUnit}</td>
          <td>{moment(StartDate).format("MM/DD/YYYY")}</td>
          <td>{moment(EndDate).format("MM/DD/YYYY")}</td>
          <td>{Notes}</td>
          <td>
            <Button size="sm" variant="info" onClick={() => {
                this.updateStateMedicationId(MedicationId);
                this.handleShowUpdate();
             }}>
                &#x270E;
            </Button>
            </td>
          <td><Button size="sm" variant="danger" onClick={ () => { this.deleteMedication(MedicationId)}}>&#x2716;</Button></td>
        </tr>
      )
    })
  }



  render(){
    
    return (
      <div>
        <h2> Meds </h2>
        <div>
          <Table size="sm">
            <thead>
              <tr>
                <th>Dosage</th>
                <th>Unit</th>
                <th>Start</th>
                <th>End</th>
                <th>Notes</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

class AddMedicationComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.petid,
                   DosageAmount: "",
                   DosageUnit: "",
                   StartDate: "",
                   EndDate: "",
                   Notes: ""}
    console.log("Component: 'AddMedicationComponent' loaded");
  };

  handleDosageAmountChange = event => { this.setState({DosageAmount: event.target.value}); }
  handleDosageUnitChange = event => { this.setState({DosageUnit: event.target.value}); }
  handleStartDateChange = event => { this.setState({StartDate: event.target.value}); }
  handleEndDateChange = event => { this.setState({EndDate: event.target.value}); }
  handleNotesChange = event => { this.setState({Notes: event.target.value}); }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      PetId: this.state.PetId,
      DosageAmount: this.state.DosageAmount,
      DosageUnit: this.state.DosageUnit,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      Notes: this.state.Notes
    };

    axios.post(`http://localhost:5000/api/medications/`, data, {withCredentials: true} )
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
          <Form id="AddMedForm" onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage amount</Form.Label>
                <Form.Control name="DosageAmount" type="number" min={0}
                              defaultValue={0}
                              onChange={this.handleDosageAmountChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formDosageUnit">
                <Form.Label>unit</Form.Label>
                <Form.Control name="DosageUnit" type="number" min={0}
                              defaultValue={0}
                              onChange={this.handleDosageUnitChange}
                              required/>
              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col>
                <Form.Group controlId="formStartDate">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" type="date" max={moment().format("YYYY-MM-DD")}
                              onChange={this.handleStartDateChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formEndDate">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" type="date" 
                              min={moment(this.state.StartDate).format("YYYY-MM-DD")}
                              onChange={this.handleEndDateChange}
                              required/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control name="Notes" type="textarea" as="textarea" rows="5"
                                  placeholder="Enter a description of the event here..."
                                  onChange={this.handleNotesChange}
                                  required/>
                </Form.Group>
              </Col>
            </Row>
          </Form>
      </div>
    )
  }
}