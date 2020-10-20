// PetMedicationsComponent.js

import React, { Component } from 'react';
import axios from 'axios';

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
import UpdateRounded from '@material-ui/icons/EditRounded';
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
    //console.log("PetMedicationsComponent - Using PetId: " + this.state.PetId);
  }

  handleCloseAddMed() { this.setState({ showAddMed: false }); }
  handleShowAddMed() { this.setState({ showAddMed: true }); }
  handleCloseUpdateMed() { this.setState({ showUpdateMed: false }); }
  handleShowUpdateMed() { this.setState({ showUpdateMed: true }); }
  updateStateMedicationId(buttonMedicationId) { this.setState({ MedicationId: buttonMedicationId }); }

  componentDidMount() {
    this.setState({medications: this.props.meds});
      if(this.props.acquired) {
          document.getElementById("PetMedTableId").hidden = false;
      }
  };

  deleteMedication = async (MedicationId) => {
    Swal.fire({
      title: 'Delete medication?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
  }).then((result) => {
      // User selects "delete"
      if (result.isDenied) {
          Swal.fire({
              title: 'Loading'
          });

          Swal.showLoading();
        axios.delete(`/api/medications/` + MedicationId, {withCredentials: true} )
          .then(response=>{
            //console.log(response);
            //console.log("Medication " + MedicationId + " deleted sucessfully.");
            Swal.fire('Medication Deleted', '', 'success');
            this.props.fetch();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire('Oops...', "You do not have permission to delete this medication", 'error');
          })
        }
    })
  };

  checkNullDate(date) {
    if (date === null) { return (<span>NA</span>) }
    else { return ( <span> { moment(date).format("MM/DD/YYYY") } </span>) }
  }

  render(){
    return (
      <div id="PetMedTableId" className="petProfileBody nopadding FadeIn" hidden={true} style={{height: "100%"}}>
        <div style={{ maxWidth: '100%'}}>
        <MaterialTable
            columns={[
              { title: 'Name', field: 'Name' },
              { title: 'Dosage', field: 'DosageAmount' },
              { title: 'Unit of Measurement', field: 'DosageUnit' },
              { title: 'Notes', field: 'Notes', render: row => <span className="tableWordBreak"> { row["Notes"] }</span>},
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
              exportButton: true,
            }}
            components={{
              Toolbar: props => (
                  <div>
                      <MTableToolbar {...props}></MTableToolbar>
                      <div style={{padding: '0px 10px'}}>
                          <div id="MedButtons">
                              <div className="AddButtonContainer">
                                  <Button className="FormAddButton" onClick={this.handleShowAddMed}>
                                    <span className="FormAddButtonText"> Add Medication </span>
                                    <span className="FormAddButtonIcon">
                                      <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                      <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" fill="#282828"></path>
                                      </svg>
                                    </span>
                                  </Button> <br/>
                              </div>
                          </div>
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
                <AddMedicationComponent petid={this.state.PetId} fetch={this.props.fetch}/>
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
              <UpdateMedicationComponent medicationid={this.state.MedicationId} fetch={this.props.fetch} />
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
                   Name: "",
                   DosageAmount: "",
                   DosageUnit: "",
                   StartDate: "",
                   EndDate: "",
                   Notes: ""};

    //console.log("Component: 'AddMedicationComponent' loaded");
  }

  handleNameChange = event => { this.setState({Name: event.target.value}); }
  handleDosageAmountChange = event => { this.setState({DosageAmount: event.target.value}); }
  handleDosageUnitChange = event => { this.setState({DosageUnit: event.target.value}); }
  handleStartDateChange = event => { this.setState({StartDate: moment(event.target.value).local().format()}); }
  handleEndDateChange = event => { this.setState({EndDate: moment(event.target.value).local().format()}); }
  handleNotesChange = event => { this.setState({Notes: event.target.value}); }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      PetId: this.state.PetId,
      Name: this.state.Name,
      DosageAmount: this.state.DosageAmount,
      DosageUnit: this.state.DosageUnit,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      Notes: this.state.Notes
    };

      Swal.fire({
          title: 'Loading'
      });

      Swal.showLoading();

    axios.post(`/api/medications/`, data, {withCredentials: true} )
        .then(response=>{
            //console.log(response);
            //console.log("Medication added successfully.");
            Swal.fire('Medication Added', '', 'success');
            this.props.fetch();
          })
        .catch((error) => {
            console.log(error);
            //console.log(data);
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
              <Form.Group controlId="formName">
                <Form.Label>Name of Medication</Form.Label>
                <Form.Control name="name" type="text" min={0} maxLength={45}
                              placeholder="Name of Medication"
                              onChange={this.handleNameChange}
                              required/>
              </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage Amount</Form.Label>
                <Form.Control name="DosageAmount" type="number" min={0} precision={2} step={0.01}
                              placeholder="Dosage Amount"
                              onChange={this.handleDosageAmountChange}
                              required/>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="formDosageUnit">
                <Form.Label>Dosage Unit</Form.Label>
                <Form.Control name="DosageUnit" type="text" min={0} maxLength={45}
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
                    <Form.Control name="Notes" type="textarea" as="textarea" rows="5" maxLength={300}
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
                   Name: "",
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
        //console.log(response);
        this.setState({ Name: response.data.Name,
                        DosageAmount: response.data.DosageAmount,
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

  handleNameChange = event => { this.setState({Name: event.target.value}); }
  handleDosageAmountChange = event => { this.setState({DosageAmount: event.target.value}); }
  handleDosageUnitChange = event => { this.setState({DosageUnit: event.target.value}); }
  handleStartDateChange = event => { this.setState({StartDate: moment(event.target.value).local().format()}); }
  handleEndDateChange = event => { this.setState({EndDate: moment(event.target.value).local().format()}); }
  handleNotesChange = event => { this.setState({Notes: event.target.value}); }

  handleUpdate = event => {
    event.preventDefault();

    const data = {
      MedId: this.state.MedId,
      Name: this.state.Name,
      DosageAmount: this.state.DosageAmount,
      DosageUnit: this.state.DosageUnit,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      Notes: this.state.Notes,
    };

      Swal.fire({
          title: 'Loading'
      });

      Swal.showLoading();

    axios.put(`/api/medications/` + this.state.MedId, data, {withCredentials: true} )
        .then(response=>{
          //console.log(response);
          //console.log("Medication updated successfully.");
          Swal.fire('Medication Updated', '', 'success');
          this.props.fetch();
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
      //console.log("initial check: noEndCheckBox is checked");
      endDateElement.setAttribute("disabled", "true")
      this.setState( {EndDate: null} );
      
    }
    else {
      //console.log("initial check: noEndCheckBox is unchecked");
      endDateElement.removeAttribute("disabled")
    }
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
      this.setState( {EndDate: "" } );
    }
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="UpdateMedForm" onSubmit={this.handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name of Medication</Form.Label>
                  <Form.Control name="name" type="text" min={0} maxLength={45}
                                defaultValue={this.state.Name}
                                placeholder="Name of Medication"
                                onChange={this.handleNameChange}
                                required/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formDosageAmount">
                <Form.Label>Dosage Amount</Form.Label>
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
                    <Form.Control name="Notes" type="textarea" as="textarea" rows={5} maxLength={300}
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