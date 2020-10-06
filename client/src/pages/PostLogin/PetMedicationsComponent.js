// PetMedicationsComponent.js

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

export default class PetMedicationsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   medications: [],
                   MedicationId: '',
                   showAddMed: false,
                   showUpdateMed: false
                  };
    this.handleShowAddMed = this.handleShowAddMed.bind(this);
    this.handleCloseAddMed = this.handleCloseAddMed.bind(this);
    this.handleShowUpdateMed = this.handleShowUpdateMed.bind(this);
    this.handleCloseUpdateMed = this.handleCloseUpdateMed.bind(this);
    console.log("PetMedicationsComponent - Using PetId: " + this.state.PetId);
  }

  handleCloseAddMed() { this.setState({ showAddMed: false }); }
  handleShowAddMed() { this.setState({ showAddMed: true }); }
  handleCloseUpdateMed() { this.setState({ showUpdateMed: false }); }
  handleShowUpdateMed() { this.setState({ showUpdateMed: true }); }
  updateStateMedicationId(buttonMedicationId) { this.setState({ MedicationId: buttonMedicationId }); }

  componentDidMount() {
    manuallyIncrementPromiseCounter();
    axios.get(`/api/medications/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({medications: response.data});
        //console.log(this.state.medications);
        document.getElementById("PetMedTableId").hidden=false;
        manuallyDecrementPromiseCounter();
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        manuallyDecrementPromiseCounter();
      })
  };

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
            //console.log(response);
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

  checkNullDate(date) {
    if (date === null) { return (<span> No end date</span>) } 
    else { return ( <span> { moment(date).format("MM/DD/YYYY") } </span>) };
  }

  render(){
    return (
      <div id="PetMedTableId" className="petProfileBody nopadding" hidden="true" style={{height: "100%"}}>
        <div style={{ maxWidth: '100%'}}>
        <MaterialTable
            columns={[
              { title: 'Dosage', field: 'DosageAmount' },
              { title: 'Unit of Measurement', field: 'DosageUnit' },
              { title: 'Notes', field: 'Notes' },
              { title: 'Start', field: 'StartDate', render: row => <span>{ moment(row["StartDate"]).format("MM/DD/YYYY") }</span> },
              { title: 'End', field: 'EndDate', render: row => this.checkNullDate( row["EndDate"])}
            ]}
            data={this.state.medications}
            title="Pet Medications"
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
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 5,
              pageSizeOptions: [ 5 ],
            }}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props}></MTableToolbar>
                  <div style={{padding: '0px 10px'}}>
                  <Button onClick={this.handleShowAddMed} variant="secondary">Add Medication</Button>

                  </div>
                </div>
              ),
            }}
            />
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
                   DosageAmount: 1,
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
      DosageAmount: this.state.DosageAmount,
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

  checkBoxDisableDate() {
    var checkbox = document.getElementById("formNoEndCheckbox");
    var endDateElement = document.getElementById("formEndDate");

    if (checkbox.checked) {
      //console.log("noEndCheckBox is checked");
      endDateElement.setAttribute("disabled", "true")
      this.setState( {EndDate: null} );
      
    }
    else {
      //console.log("noEndCheckBox is unchecked");
      endDateElement.removeAttribute("disabled")
    }
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="AddMedForm" onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage amount</Form.Label>
                <Form.Control name="DosageAmount" type="number" min={0} precision={2} step={0.01}
                              placeholder="Dosage amount"
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
                <Form.Control name="startDate" type="date"
                              onChange={this.handleStartDateChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formNoEndCheckbox">
                <Form.Label>End Date</Form.Label>
                <Form.Check name="noEndCheckbox" type="checkbox" label="Indefinite"
                            onChange={ () => this.checkBoxDisableDate() }/>
              </Form.Group>

              <Form.Group controlId="formEndDate">
                <Form.Control name="endDate" type="date" 
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
                   Notes: "",};

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
      .finally(() => {
        var checkbox = document.getElementById("formNoEndCheckbox");
        // if end date is null
        if (!this.state.EndDate) {
          checkbox.setAttribute("checked", "true");
        }
        this.initialCheckBoxCheck();
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
      Notes: this.state.Notes,
    };

    axios.put(`/api/medications/` + this.state.MedId, data, {withCredentials: true} )
        .then(response=>{
          console.log(response);
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

  initialCheckBoxCheck() {
    var checkbox = document.getElementById("formNoEndCheckbox");
    var endDateElement = document.getElementById("formEndDate");

    if (checkbox.checked) {
      console.log("noEndCheckBox is checked");
      endDateElement.setAttribute("disabled", "true")
      this.setState( {EndDate: null} );
      
    }
    else {
      console.log("noEndCheckBox is unchecked");
      endDateElement.removeAttribute("disabled")
    };
  }

  checkBoxDisableDate() {
    var checkbox = document.getElementById("formNoEndCheckbox");
    var endDateElement = document.getElementById("formEndDate");

    if (checkbox.checked) {
      console.log("noEndCheckBox is checked");
      endDateElement.setAttribute("disabled", "true")
      this.setState( {EndDate: null} );
      
    }
    else {
      console.log("noEndCheckBox is unchecked");
      endDateElement.removeAttribute("disabled")
      this.setState( {EndDate: "" } );
    };
  }

  checkNullDate(date) {
    if (date === null) { return (<span> No end date</span>) } 
    else { return ( <span> { moment(date).format("MM/DD/YYYY") } </span>) };
  }

  getDateValue(date) {
    if (date === null) { return null; }
    else { return ( moment(date).format("MM/DD/YYYY") ); };
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="UpdateMedForm" onSubmit={this.handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage amount</Form.Label>
                <Form.Control name="DosageAmount" type="number" min={0} precision={2} step={0.01}
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
                <Form.Control name="startDate" type="date"
                              defaultValue={this.state.StartDate}
                              onChange={this.handleStartDateChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formNoEndCheckbox">
                <Form.Label>End Date</Form.Label>
                <Form.Check name="noEndCheckbox" type="checkbox" label="Indefinite"
                            onChange={ () => this.checkBoxDisableDate() }/>
              </Form.Group>

              <Form.Group controlId="formEndDate">
                <Form.Control name="endDate" type="date" 
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