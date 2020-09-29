// PetEventsComponent.js

import React, { Component, useEffect } from 'react';
import axios from 'axios';


import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export default class PetEventsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   events: [],
                   show: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    console.log("PetEventsComponent - Using PetId: " + this.state.PetId);
  }

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
  }
  
  deleteEvent = async (EventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios.delete(`http://petrecs.herokuapp.com/api/pet-events/` + EventId, {withCredentials: true} )
        .then(response=>{
          //this.setState({events: response.data});
          console.log("EventId " + EventId + " deleted sucessfully.");
        })
        .catch((error) => {
          console.log(error);
        })
      }
  };

  componentDidMount() {
    axios.get(`http://petrecs.herokuapp.com/api/pet-events/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({events: response.data});
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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

  renderTableData() {
    return this.state.events.map((event, index) => {
      const { EventId, EventTypeId, EventDescription, Date } = event
      return (
        <tr key={EventId}>
          <td>{this.eventTypeIdToString(EventTypeId)}</td>
          <td>{moment(Date).format("MM/DD/YYYY")}</td>
          <td>{EventDescription}</td>
          <td><Button size="sm" variant="info">&#x270E;</Button></td>
          <td><Button size="sm" variant="danger" onClick={ () => { this.deleteEvent(EventId)}}>&#x2716;</Button></td>
        </tr>
      )
    })
  }

  render() {
  return (
      <div className="petProfileBody nopadding">
        <h2> Events </h2>
        <div>
          <Table size="sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </Table>
        </div>
        <div>
          <Button onClick={this.handleShow} variant="outline-dark">Add Event</Button>
          <Modal
                show={this.state.show}
                onHide={this.handleClose}
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
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" type="submit" form="AddEventForm">Add Event</Button>
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
    this.state = { EventTypeId: 0,
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

    axios.post(`http://petrecs.herokuapp.com/api/pet-events/`, data, {withCredentials: true} )
        .then(response=>{
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
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