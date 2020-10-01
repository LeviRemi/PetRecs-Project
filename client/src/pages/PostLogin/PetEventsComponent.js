// PetEventsComponent.js

import React, { Component } from 'react';
import axios from 'axios';
import trackPromise, { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from 'react-promise-tracker';

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

export default class PetEventsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   events: [],
                   EventId: '',
                   showAdd: false,
                   showUpdate: false };
    this.handleShowAdd = this.handleShowAdd.bind(this);
    this.handleCloseAdd = this.handleCloseAdd.bind(this);
    this.handleShowUpdate = this.handleShowUpdate.bind(this);
    this.handleCloseUpdate = this.handleCloseUpdate.bind(this);

    console.log("PetEventsComponent - Using PetId: " + this.state.PetId);
  }

  handleCloseAdd() { this.setState({ showAdd: false }); }
  handleShowAdd() { this.setState({ showAdd: true }); }
  handleCloseUpdate() { this.setState({ showUpdate: false }); }
  handleShowUpdate() { this.setState({ showUpdate: true }); }
  updateStateEventId(buttonEventId) { this.setState({ EventId: buttonEventId }); }
  
  deleteEvent = async (EventId) => {
      Swal.fire({
        title: 'Are you sure you want to delete this event?',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`,
    }).then((result) => {
        // User selects "delete"
        if (result.isDenied) {
            axios.delete(`/api/pet-events/` + EventId, {withCredentials: true} )
            .then(response=>{
              console.log("EventId " + EventId + " deleted sucessfully.");
              Swal.fire('Success!', 'This event has been deleted', 'success').then(function() {
                window.location.reload();
              });
            })
            .catch((error) => {
              console.log(error);
              Swal.fire('Oops...', "You do not have permission to delete this event", 'error');
            })
        }
    })
  };

  componentDidMount() {
    manuallyIncrementPromiseCounter();
    axios.get(`/api/pet-events/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({events: response.data});
        document.getElementById("PetEventBodyId").hidden = false;
        manuallyDecrementPromiseCounter();
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        manuallyDecrementPromiseCounter();
      })
  };

  eventTypeIdToString(TypeId) {
    let stringType = "";
    if (TypeId === 1) { stringType = "Medical"; } 
    else if (TypeId === 2) { stringType = "Grooming"; } 
    else if (TypeId === 3) { stringType = "Fitness"; } 
    else if (TypeId === 4) { stringType = "Food"; } 
    else if (TypeId === 5) { stringType = "Potty"; } 
    else if (TypeId === 6) { stringType = "Behavior"; } 
    else if (TypeId === 7) { stringType = "Other"; } 

    return stringType;
  }

  render() {
  return (
      <div id="PetEventBodyId" className="petProfileBody nopadding" hidden="true">
        <div style={{ maxWidth: '100%'}}>
          <MaterialTable
            columns={[
              { title: 'Type', field: 'EventTypeId',
                lookup:  { 1: 'Medical', 2: 'Grooming',
                           3: 'Fitness', 4: 'Food',
                           5: 'Potty',   6: 'Behavior',
                           7: 'Other' }},
              { title: 'Date', field: 'Date', type: 'datetime'},
              { title: 'Description', field: 'EventDescription'}
            ]}
            data={this.state.events}
            title="Pet Events"
            icons={tableIcons}
            actions={[
              {
                icon: UpdateRounded,
                tooltip: 'Update Event',
                onClick: (event, rowData) => {
                  this.updateStateEventId(rowData.EventId);
                  this.handleShowUpdate();
               }
              },
              {
                icon: DeleteRounded,
                tooltip: 'Delete Event',
                onClick: (event, rowData) => this.deleteEvent(rowData.EventId)
              },
              {
                icon: AddRounded,
                tooltip: 'Add Event',
                isFreeAction: true,
                onClick: (event) => this.handleShowAdd()
              }
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
            }}
            >
            </MaterialTable>
          <Modal
                show={this.state.showAdd}
                onHide={this.handleCloseAdd}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddEventComponent petid={this.state.PetId}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseAdd}>Close</Button>
                    <Button variant="primary" type="submit" form="AddEventForm">Add Event</Button>
            </Modal.Footer>
          </Modal>

          <Modal
                show={this.state.showUpdate}
                onHide={this.handleCloseUpdate}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Update Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateEventComponent eventid={this.state.EventId}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseUpdate}>Close</Button>
                    <Button variant="primary" type="submit" form="UpdateEventForm">Update Event</Button>
            </Modal.Footer>
          </Modal>
        </div>
        
      </div>
    )
  }
}

class AddEventComponent extends Component {
  constructor(props) {
    super();
    this.state = { EventTypeId: 1,
                   PetId: props.petid,
                   EventDescription: "",
                   Date: ''}
    console.log("Component: 'AddEventComponent' loaded");
  };

  handleEventTypeIdChange = event => {
    this.setState({EventTypeId: event.target.value});
  }

  handleEventDescriptionChange = event => {
    this.setState({EventDescription: event.target.value});
  }

  handleDateChange = event => {
    this.setState({Date: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      EventTypeId: this.state.EventTypeId,
      PetId: this.state.PetId,
      EventDescription: this.state.EventDescription,
      Date: this.state.Date,
    };

    axios.post(`/api/pet-events/`, data, {withCredentials: true} )
        .then(response=>{
          console.log(response);
          console.log("Event added successfully.");
              Swal.fire('Success!', 'This event has been added', 'success').then(function() {
                window.location.reload();
              });
            })
            .catch((error) => {
              console.log(error);
              Swal.fire('Oops...', "You do not have permission to create this event", 'error');
            })
  }

  render() {
    return (
      <div className="formBoxAddEvent">
          <Form id="AddEventForm" onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formEventType">
                <Form.Label>Event Type</Form.Label>
                <Form.Control name="eventTypeId" as="select"
                              value="1"
                              onChange={this.handleEventTypeIdChange}>
                  <option value="1">Medical</option>
                  <option value="2">Grooming</option>
                  <option value="3">Fitness</option>
                  <option value="4">Food</option>
                  <option value="5">Potty</option>
                  <option value="6">Behavior</option>
                  <option value="7">Other</option>
                </Form.Control>
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
            </Form.Row>
                
            <Form.Row>
              <Col>
                <Form.Group controlId="formEventDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="eventDescription" type="textarea" as="textarea" rows="5"
                                  placeholder="Enter a description of the event here..."
                                  onChange={this.handleEventDescriptionChange}
                                  required/>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
      </div>
    )
  }
}


class UpdateEventComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      EventTypeId: "",
      EventId: props.eventid,
      EventDescription: "",
      Date: ''}
  }

  componentDidMount() {
    axios.get(`/api/pet-events/` + this.state.EventId, {withCredentials: true} )
      .then(response=>{
        this.setState({EventTypeId: response.data.EventTypeId,
                        EventId: response.data.EventId,
                        EventDescription: response.data.EventDescription,
                        Date: response.data.Date});
      })
      .catch((error) => {
          console.log(error);
      })
  }

  handleEventTypeIdChange = event => {
    this.setState({EventTypeId: event.target.value});
  }

  handleEventDescriptionChange = event => {
    this.setState({EventDescription: event.target.value});
  }

  handleDateChange = event => {
    this.setState({Date: event.target.value});
  }

  handleUpdate = event => {
    
    event.preventDefault();

    const data = {
        EventTypeId: this.state.EventTypeId,
        PetId: this.state.PetId,
        EventDescription: this.state.EventDescription,
        Date: this.state.Date,
      };

    axios.put(`/api/pet-events/` + this.state.EventId, data, {withCredentials: true} )
          .then(response=>{
            console.log("Event added successfully.");
                Swal.fire('Success!', 'This event has been updated', 'success').then(function() {
                  window.location.reload();
                });
              })
              .catch((error) => {
                console.log(error);
                Swal.fire('Oops...', "You do not have permission to update this event", 'error');
              })
    }

  render() {
    return (
      <div className="formBoxAddEvent">
          <Form id="UpdateEventForm" onSubmit={this.handleUpdate}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formEventType">
                <Form.Label>Event Type</Form.Label>
                <Form.Control name="eventTypeId" as="select"
                              onChange={this.handleEventTypeIdChange}
                              value={this.state.EventTypeId}
                               >
                  <option value="1">Medical</option>
                  <option value="2">Grooming</option>
                  <option value="3">Fitness</option>
                  <option value="4">Food</option>
                  <option value="5">Potty</option>
                  <option value="6">Behavior</option>
                  <option value="7">Other</option>
                </Form.Control>
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
            </Form.Row>
                
            <Form.Row>
              <Col>
                <Form.Group controlId="formEventDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="eventDescription" type="textarea" as="textarea" rows={5}
                                  defaultValue={this.state.EventDescription}
                                  onChange={this.handleEventDescriptionChange}
                                  required/>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
      </div>
    )
  }
}