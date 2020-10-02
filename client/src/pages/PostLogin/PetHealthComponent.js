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
        <Row>
          <Col>
          <MedsComponent petid={this.state.PetId}/>
          <div>
            
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

class MedsComponent extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = { PetId: props.petid,
                   medications: [],
                   MedicationId: '',
                   showAddMed: false,
                   showUpdateMed: false
                  };
    this.handleShowAddMed = this.handleShowAddMed.bind(this);
    this.handleCloseAddMed = this.handleCloseAddMed.bind(this);
    this.handleShowUpdateMed = this.handleShowUpdateMed.bind(this);
    this.handleCloseUpdateMed = this.handleCloseUpdateMed.bind(this);
  }

  handleCloseAddMed() { this.setState({ showAddMed: false }); }
  handleShowAddMed() { this.setState({ showAddMed: true }); }
  handleCloseUpdateMed() { this.setState({ showUpdateMed: false }); }
  handleShowUpdateMed() { this.setState({ showUpdateMed: true }); }
  updateStateMedicationId(buttonMedicationId) { this.setState({ MedicationId: buttonMedicationId }); }

  deleteMedication = async (MedicationId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this medication?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
  }).then((result) => {
      // User selects "delete"
      if (result.isDenied) {
        axios.delete(`/api/medications/` + MedicationId, {withCredentials: true} )
          .then(response=>{
            console.log(response);
            console.log("Medication " + MedicationId + " deleted sucessfully.");
            Swal.fire('Success!', 'This medication has been deleted', 'success').then(function() {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire('Oops...', "You do not have permission to delete this medication", 'error');
          })
        }
    })
  };

  componentDidMount() {
    manuallyIncrementPromiseCounter();
    axios.get(`/api/medications/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({medications: response.data});
        console.log(this.state.medications);
        document.getElementById("petMedTableId").hidden=false;
        manuallyDecrementPromiseCounter();
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        manuallyDecrementPromiseCounter();
      })
  };

  render(){
    return (
      <div id="petMedTableId" className="petProfileBody nopadding" >
        <div style={{ maxWidth: '100%'}}>
        <MaterialTable
            columns={[
              { title: 'Dosage', field: 'DosageAmount' },
              { title: 'Unit', field: 'DosageUnit' },
              { title: 'Start', field: 'StartDate' },
              { title: 'End', field: 'EndDate' },
              { title: 'Notes', field: 'Notes' }
            ]}
            data={this.state.medications}
            title="Pet Medcations"
            icons={tableIcons}
            actions={[
              {
                icon: UpdateRounded,
                tooltip: 'Update Medication',
                onClick: (event, rowData) => {
                  this.updateStateMedicationId(rowData.MedId);
                  this.handleShowUpdateMed();
               }
              },
              {
                icon: DeleteRounded,
                tooltip: 'Delete Medication',
                onClick: (event, rowData) => this.deleteMedication(rowData.MedId)
              },
              {
                icon: AddRounded,
                tooltip: 'Add Medication',
                isFreeAction: true,
                onClick: (event) => this.handleShowAddMed()
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 5,
            }}
            >
            </MaterialTable>
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

            <Modal
                show={this.state.showUpdateMed}
                onHide={this.handleCloseUpdateMed}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Update Medication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UpdateMedicationComponent medicationid={this.state.MedicationId} />
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseUpdateMed}>Close</Button>
                    <Button variant="primary" type="submit" form="UpdateMedForm">Update Medication</Button>
            </Modal.Footer>
          </Modal>

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
                   Notes: ""};

    console.log("Component: 'AddMedicationComponent' loaded");
  }

  handleDosageAmountChange = event => { this.setState({DosageAmount: event.target.value}); }
  handleDosageUnitChange = event => { this.setState({DosageUnit: event.target.value}); }
  handleStartDateChange = event => { this.setState({StartDate: event.target.value}); }
  handleEndDateChange = event => { this.setState({EndDate: event.target.value}); }
  handleNotesChange = event => { this.setState({Notes: event.target.value}); }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      PetId: this.state.PetId,
      DosageAmount: "1",
      DosageUnit: this.state.DosageUnit,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      Notes: this.state.Notes
    };

    axios.post(`/api/medications/`, data, {withCredentials: true} )
        .then(response=>{
            console.log(response);
            console.log("Medication added successfully.");
            Swal.fire('Success!', 'The medication has been added', 'success').then(function() {
              window.location.reload();
            });
          })
        .catch((error) => {
            console.log(error);
            console.log(data);
            Swal.fire('Oops...', "You do not have permission to add this medication", 'error');
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
                              defaultValue={1}
                              onChange={this.handleDosageAmountChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formDosageUnit">
                <Form.Label>Dosage Unit</Form.Label>
                <Form.Control name="DosageUnit" type="text" min={0}
                              placeholder="Unit of measurement"
                              onChange={this.handleDosageUnitChange}
                              required/>
              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col>
                <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control name="date" type="date" max={moment().format("YYYY-MM-DD")}
                              onChange={this.handleStartDateChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
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
                                  placeholder="Enter notes about the medication here..."
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

class UpdateMedicationComponent extends Component {
  constructor(props) {
    super();
    this.state = { MedId: props.medicationid,
                   DosageAmount: "",
                   DosageUnit: "",
                   StartDate: "",
                   EndDate: "",
                   Notes: ""};

    //console.log("Component: 'UpdateMedicationComponent' loaded");
  }

  componentDidMount() {
    axios.get(`/api/medications/` + this.state.MedId, {withCredentials: true} )
      .then(response=>{
        console.log(response);
        this.setState({ DosageAmount: response.data.DosageAmount,
                        DosageUnit: response.data.DosageUnit,
                        StartDate: response.data.StartDate,
                        EndDate: response.data.EndDate,
                        Notes: response.data.Notes }); 
      })
      .catch((error) => {
          console.log(error);
      })
  }

  handleDosageAmountChange = event => { this.setState({DosageAmount: event.target.value}); }
  handleDosageUnitChange = event => { this.setState({DosageUnit: event.target.value}); }
  handleStartDateChange = event => { this.setState({StartDate: event.target.value}); }
  handleEndDateChange = event => { this.setState({EndDate: event.target.value}); }
  handleNotesChange = event => { this.setState({Notes: event.target.value}); }

  handleUpdate = event => {
    event.preventDefault();

    const data = {
      MedId: this.state.MedId,
      DosageAmount: this.state.DosageAmount,
      DosageUnit: this.state.DosageUnit,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      Notes: this.state.Notes
    };

    axios.put(`/api/medications/` + this.state.MedId, data, {withCredentials: true} )
        .then(response=>{
          console.log("Medication added successfully.");
          Swal.fire('Success!', 'The medication has been updated', 'success').then(function() {
            window.location.reload();
          });
        })
        .catch((error) => {
            console.log(error);
            Swal.fire('Oops...', "You do not have permission to update this medication", 'error');
        })
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="UpdateMedForm" onSubmit={this.handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage amount</Form.Label>
                <Form.Control name="DosageAmount" type="number" min={0}
                              value={this.state.DosageAmount}
                              onChange={this.handleDosageAmountChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formDosageUnit">
                <Form.Label>Dosage Unit</Form.Label>
                <Form.Control name="DosageUnit" type="text" min={0}
                              value={this.state.DosageUnit}
                              onChange={this.handleDosageUnitChange}
                              required/>
              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col>
                <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control name="date" type="date" max={moment().format("YYYY-MM-DD")}
                              defaultValue={this.state.StartDate}
                              onChange={this.handleStartDateChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control name="date" type="date" 
                              min={moment(this.state.StartDate).format("YYYY-MM-DD")}
                              defaultValue={this.state.EndDate}
                              onChange={this.handleEndDateChange}
                              required/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control name="Notes" type="textarea" as="textarea" rows={5}
                                  defaultValue={this.state.Notes}
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