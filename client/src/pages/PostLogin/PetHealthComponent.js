// PetHealthComponent.js

import React, { Component } from 'react';
import axios from 'axios';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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

export default class PetHealthComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId }
  }

  render() {
    
    //console.log("Component: 'PetHealthComponent' loaded");
    
    return (

      <div id="petHealthBodyId" hidden={true}>
          <ViewWeightComponent petid={this.state.PetId} acquired={this.props.acquired} weights={this.props.weights} fetch={this.props.fetch}/>
      </div>
    )
  }
}

class ViewWeightComponent extends Component {
  constructor(props) {
    super();
    this.state = { data: [],
                   PetId: props.petid,
                   WeightId: '',
                   showAddWeight: false,
                   showUpdateWeight: false
                };
              this.handleShowAddWeight = this.handleShowAddWeight.bind(this);
              this.handleCloseAddWeight = this.handleCloseAddWeight.bind(this);
              this.handleShowUpdateWeight = this.handleShowUpdateWeight.bind(this);
              this.handleCloseUpdateWeight = this.handleCloseUpdateWeight.bind(this); };
              updateStateWeightId(buttonWeightId) { this.setState({ WeightId: buttonWeightId }); }

  handleCloseAddWeight() {  this.setState({ showAddWeight: false }); }

  handleShowAddWeight() { this.setState({ showAddWeight: true }); }

  handleCloseUpdateWeight() { this.setState({ showUpdateWeight: false }); }

  handleShowUpdateWeight() { this.setState({ showUpdateWeight: true }); }

  componentDidMount() {
    this.setState({data: this.props.weights});
      if(this.props.acquired) {
          document.getElementById("petHealthBodyId").hidden = false;
      }
  }

  deleteWeight = async (WeightId, weight) => {
    Swal.fire({
      title: `Delete weight of ${weight} lbs?`,
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

          axios.delete(`/api/pet-weights/` + WeightId, {withCredentials: true} )
          .then(response=>{
            //console.log(response);
            //console.log("WeightId " + WeightId + " deleted sucessfully.");
            Swal.fire('Weight Deleted', '', 'success');
            this.props.fetch();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire('Oops...', "You do not have permission to delete this weight", 'error');
          })
      }
    })
  };

  render(){
    let petData = this.state.data;

    let sortedData = petData.sort(function (a, b) {
      let formattedA = moment(a.Date).local();
      let formattedB = moment(b.Date).local();
      return ( formattedA - formattedB );
    });
    
    let formattedData = [];
    
    sortedData.forEach(function (weightEntry) {
      formattedData.push({Date: moment(weightEntry.Date).local().format("M/D/YY"), Weight: weightEntry.Weight, WeightId: weightEntry.PetWeightId});
    });
    
    const dateFormatter = tickItem => moment(tickItem).local().format("M/D");
    
    return (
      <div>
      <Row>
        <Col md="auto">
          <div className="weightTableBox shadowedBox FadeIn">
          <h5> Weight </h5>
          <LineChart
              width={660} height={280}
              margin={{ top: 20, right:28, left: 10, bottom: 20, }}
              data={formattedData}
            >
              <XAxis tickFormatter={dateFormatter} dataKey="Date"/>
              <YAxis unit=" lbs"/>
              <CartesianGrid strokeDasharray="2 5" />
              <Tooltip />
              <Line type="monotone" dataKey="Weight" stroke="#8884d8" activeDot={{r: 4}} />
            </LineChart>
          </div>
        </Col>
          <div className="currentWeightBox shadowedBox FadeIn">
            Current Weight: <br />
            <div className="bigFont"> { sortedData.length > 0 && sortedData[sortedData.length - 1].Weight } <span className="lbsFont">lbs</span> </div> 
            <div className="smallFont"> { sortedData.length > 0 && moment(sortedData[sortedData.length - 1].Date).format("M/D/YY") } </div>
          </div>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
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
              <AddWeightComponent petid={this.state.PetId} fetch={this.props.fetch}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseAddWeight}>Close</Button>
                    <Button variant="primary" type="submit" form="AddWeightForm">Add Weight</Button>
            </Modal.Footer>
          </Modal>

          <Modal
                show={this.state.showUpdateWeight}
                onHide={this.handleCloseUpdateWeight}
                backdrop="static"
                keyboard={false}
          >
            <Modal.Header closeButton>
            <Modal.Title>Update Weight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UpdateWeightComponent weightid={this.state.WeightId} fetch={this.props.fetch} />
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseUpdateWeight}>Close</Button>
                    <Button variant="primary" type="submit" form="UpdateWeightForm">Update Weight</Button>
            </Modal.Footer>
          </Modal>

        <div className="FadeIn">
          <MaterialTable
            columns={[
              { title: 'Date', field: 'Date', defaultSort: 'desc', render: row => <span>{ moment(row["Date"]).format("MM/DD/YYYY") }</span> },
              { title: 'Weight', field: 'Weight', render: row => <span>{ row["Weight"] } lbs </span> },
            ]}
            data={this.state.data}
            title="Pet Weights"
            icons={tableIcons}
            actions={[
              {
                icon: UpdateRounded,
                tooltip: 'Update Weight',
                onClick: (event, rowData) => {
                  this.updateStateWeightId(rowData.PetWeightId);
                  this.handleShowUpdateWeight();
               }
              },
              {
                icon: DeleteRounded,
                tooltip: 'Delete Weight',
                onClick: (event, rowData) => this.deleteWeight(rowData.PetWeightId, rowData.Weight)
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
                          <div id="WeightButtons">
                              <div className="AddButtonContainer">
                                  <Button className="FormAddButton" onClick={this.handleShowAddWeight}>
                                    <span className="FormAddButtonText"> Add Weight </span>
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
        </div>
      </div>
    )
  }
}

class AddWeightComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.petid, Weight: '', Date: ''};
    //console.log("Component: 'AddWeightComponent' loaded");
  };

  handleWeightChange = event => {
    this.setState({Weight: event.target.value});
  }
  handleDateChange = event => {
    this.setState({Date: moment(event.target.value).local().format()});
  }
  handleSubmit = event => {
    event.preventDefault();

    const data = {
      PetId: this.state.PetId,
      Weight: this.state.Weight,
      Date: this.state.Date,
    };

      Swal.fire({
          title: 'Loading'
      });

      Swal.showLoading();

    axios.post(`/api/pet-weights/`, data, {withCredentials: true} )
        .then(response=>{
            //console.log(response);
            //console.log("Weight added successfully.");
            Swal.fire('Weight Added', '', 'success');
            this.props.fetch();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Oops...', "You do not have permission to add a weight", 'error');
      })
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="AddWeightForm" onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control name="weight" type="number" min={0} precision={2} step={0.01}
                              placeholder="Weight in lbs"
                              onChange={this.handleWeightChange}
                              required/>
                </Form.Group>
              </Col>
              <Col > 
                <Form.Group>
                    <Form.Label >Date</Form.Label>
                    <Form.Control Id="formDate" name="date" type="date" max={moment().local().format("YYYY-MM-DD")}
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

class UpdateWeightComponent extends Component {
  constructor(props) {
    super();
    this.state = { WeightId: props.weightid,
                   Weight: '',
                   Date: '' }
    //console.log("Component: 'UpdateWeightComponent' loaded for WeightId: " + this.state.WeightId);
  };

  componentDidMount() {
    axios.get(`/api/pet-weights/` + this.state.WeightId, {withCredentials: true} )
      .then(response=>{
        this.setState({ PetId: response.PetId,
                        Weight: response.data.Weight,
                        Date: response.data.Date });
      })
      .catch((error) => {
          console.log(error);
      })
  }

  handleWeightChange = event => {
    this.setState({Weight: event.target.value});
  }
  handleDateChange = event => {
    this.setState({Date: moment(event.target.value).local().format()});
  }

  handleUpdate = event => {
    event.preventDefault();

    const data = {
      WeightId: this.state.WeightId,
      Weight: this.state.Weight,
      Date: this.state.Date,
    };
      Swal.fire({
          title: 'Loading'
      });

      Swal.showLoading();
    axios.put(`/api/pet-weights/` + this.state.WeightId, data, {withCredentials: true} )
        .then(response=>{
            //console.log(response);
            //console.log("Event updated successfully.");
            Swal.fire('Weight Updated', '', 'success');
            this.props.fetch();
      })
      .catch((error) => {
        console.log(error);
        //console.log(data);
        Swal.fire('Oops...', "You do not have permission to update this weight", 'error');
      })
  }

  render() {
    return (
      <div className="formBoxAddWeight">
          <Form id="UpdateWeightForm" onSubmit={this.handleUpdate}>
            <Row>
              <Col>
                <Form.Group controlId="formWeight">
                <Form.Label>Pet weight</Form.Label>
                <Form.Control name="weight" type="number" min={0} precision={2} step={0.01}
                              placeholder="Weight"
                              defaultValue={this.state.Weight}
                              onChange={this.handleWeightChange}
                              required/>
                </Form.Group>
              </Col>
              <Col > 
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control Id="formDate" name="date" type="date" max={moment().local().format("YYYY-MM-DD")}
                              onChange={this.handleDateChange} defaultValue={this.state.Date.substr(0, 10)}
                              required/>
                </Form.Group>
              </Col>
            </Row>
          </Form>
      </div>
    )
  }
}