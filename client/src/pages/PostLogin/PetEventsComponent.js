// PetEventsComponent.js

import React, { Component } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class PetEventsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId,
                   events: [],
                   showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    console.log("PetEventsComponent - Using PetId: " + this.state.PetId);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  DeleteEvent = async (EventName, PetEventId) => {
    if (window.confirm("You want to delete " + EventName)) {
      axios.delete(`http://localhost:5000/api/pet-events/` + PetEventId, {withCredentials: true} )
      .then(response=>{
        this.setState({events: response.data});
        console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
    }
  };

  openInNewTab = async (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/pet-events/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({events: response.data});
        console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
  }
  
  render() {
  return (
      <div className="petProfileBody nopadding">
        <div>

        <button onClick={this.handleOpenModal}>Trigger Modal</button>
          <ReactModal 
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <AddEventComponent petid={this.state.PetId}/>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
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

    axios.post(`http://localhost:5000/api/pet-events/`, data, {withCredentials: true} )
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
      <div className="formBoxAddEvent">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="formEventType">
                <Form.Label>Event Type</Form.Label>
                <Form.Control name="eventTypeId" type="number" min={1} max={7}
                              placeholder="1"
                              size="sm"
                              onChange={this.handleEventTypeIdChange}
                              required/>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control name="date" type="date" max={moment().format("YYYY-MM-DD")}
                              size="sm"
                              onChange={this.handleDateChange}
                              required/>
                </Form.Group>
              </Col>
            </Form.Row>
                
            <Form.Row>
              <Form.Group controlId="formEventDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="eventDescription" type="textarea" as="textarea" rows="5"
                                placeholder="Enter a description of the event here..."
                                size="lg"
                                onChange={this.handleEventDescriptionChange}
                                required/>
              </Form.Group>
            </Form.Row>
            <Button type="submit"> Add Event </Button>
          </Form>
      </div>
    )
  }
}