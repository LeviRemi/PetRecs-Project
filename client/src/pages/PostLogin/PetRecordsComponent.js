// PetRecordsComponent.js

import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter, trackPromise } from 'react-promise-tracker';
import { useParams } from 'react-router';
import Swal from 'sweetalert2'


import MaterialTable, {MTableToolbar} from "material-table";

// MT Icons
import tableIcons from '../../utils/TableIcons.js'
import DownloadRounded from '@material-ui/icons/GetAppRounded';
import UpdateRounded from '@material-ui/icons/EditRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

// Style
import '../../utils/FileUpload/FileUpload.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FormatListBulleted } from '@material-ui/icons';

function PetRecordsComponent(props) {

  const PetId = props.match.params.PetId;
  const records = props.records;
  const [urlpetid, setUrlpetid] = useState(useParams());
  const [recordId, setRecordId] = useState(useParams());
  const [recordName, setRecordName] = useState(useParams());
  const [recordNotes, setRecordNotes] = useState(useParams());
  const [showUpdate, setShowUpdate] = useState(false);

  //this.handleShowUpdate = this.handleShowUpdate.bind(this);
  //this.handleCloseUpdate = this.handleCloseUpdate.bind(this);

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null)

  function handleShowUpdate() { setShowUpdate( true )}
  function handleCloseUpdate() { setShowUpdate( false ) }
  function updateStateRecordId(recordId, recordName, recordNotes) { 
    
    setRecordId({ recordId: recordId});
    setRecordName({ recordName: recordName });
    setRecordNotes({ recordNotes: recordNotes });  
  }

  function UpdateRecords() {
    props.fetch();
  };

  function DeleteRecord(RecordName, PetRecordId, FireReference) {
    Swal.fire({
      title: 'Delete ' + RecordName + ' record?',
      //text: "You won't be able to revert this!",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: 'light-gray',
      confirmButtonText: 'Delete'
    }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire({
        title: 'Loading'
      });

      Swal.showLoading();

      axios.post(`/api/upload/delete`, {data: FireReference}, {withCredentials: true})
      .then(response => {

        axios.delete(`/api/pet-records/` + PetRecordId, {withCredentials: true} )
        .then(response=>{
          UpdateRecords();
          Swal.fire('Record Deleted', ``, 'success');
          console.log(response.data);
        })
        .catch((error) => {
          Swal.fire('Oops...', `Record could not be deleted`, 'error');
            console.log("Firebase Response: " + response);
            console.log(error);
        })
      })
      .catch((error) => {
        Swal.fire('Oops...', `Record could not be deleted`, 'error');
        console.log(error);
      })
      
    }
  })
  };

  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  useEffect(() => {
      //getRecords()
    if(props.acquired === true) {
      document.getElementById("petRecordsBodyId").hidden = false;
    }
  }, [])

  const handleClick = (event) => {
    hiddenFileInput.current.value = null;
    hiddenFileInput.current.click();
  };



  const handleRecordNameChange = (event) => {
    records.RecordName = event.target.value;
    console.log(event.target.value);
  }

  const handleRecordNotesChange = (event) => {
    records.RecordNotes = event.target.value;
    console.log(event.target.value);
  }

  // Handling file selection from input
  const onFileSelected = async (e) => {
      console.log("File Selected");
    if (e.target.files[0]) {
      handleFileUpload(e);
    }
  };

  // Uploading image to Cloud Storage
  const handleFileUpload = async (e) => {
    console.log("File Uploaded");
    e.preventDefault();
    const fileUploaded = e.target.files[0];

    try {
      if (fileUploaded !== '') {
        // Creating a FormData object
        let fileData = new FormData();
        console.log(fileUploaded);

        // Adding the 'image' field and the selected file as value to our FormData object
        // Changing file name to make it unique and avoid potential later overrides

        const uniqueFileName = `${Date.now()}-${fileUploaded.name}`;
        fileData.set(
          'file',
          fileUploaded,
          uniqueFileName,
        );

        //const enteredFileName = prompt('Please enter file name', `${fileUploaded.name}`);

        const { value: enteredFileName } = await Swal.fire({
          title: 'Enter a file name',
          input: 'text',
          inputValue: `${fileUploaded.name}`,
          showCancelButton: true,
          reverseButtons: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }
          }
        })

        console.log(enteredFileName);

        if (enteredFileName != null) {
          Swal.fire({
            title: 'Loading'
          });

          Swal.showLoading();

          axios.post("/api/upload/record", fileData, {withCredentials: true})
          .then((response) => {
            console.log("upload success");



            const data = {
                PetId: urlpetid.PetId,
                RecordName: enteredFileName,
                RecordUrl: response.data.fileLocation,
                FileName: uniqueFileName,
                UploadDate: Date.now(),
                RecordNotes: ""
              };

            console.log(data);
            axios.post('/api/pet-records/', data, {withCredentials: true })
              .then((res) => {
                  console.log(res);
                  UpdateRecords();
                  Swal.fire('Congratulations!', `${data.RecordName} has been added!`, 'success');
            })
          }, (error) => {
            console.log(error);
          });
        } else {
          console.log("Cancelled");}
      } else {
        console.log(e.target.files[0]);}
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
      <div id="petRecordsBodyId" className="petProfileBody nopadding FadeIn" hidden={true} style={{height: "100%"}}>
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={[
              { title: 'Name', field: 'RecordName' },
              { title: 'Date Uploaded', field: 'UploadDate', type: 'datetime', defaultSort: 'desc'}
            ]}
            data={records}
            title="Pet Records"
            icons={tableIcons}
            actions={[
              {
                icon: DownloadRounded,
                tooltip: 'Download File',
                onClick: (event, rowData) => openInNewTab(rowData.RecordUrl)
              },
              {
                icon: UpdateRounded,
                tooltip: 'Update Event',
                onClick: (event, rowData) => {
                  console.log("From Table Record Id: " + rowData.PetRecordId);
                  updateStateRecordId(rowData.PetRecordId, rowData.RecordName, rowData.RecordNotes);
                  handleShowUpdate();
               }
              },
              rowData => ({
                icon: DeleteRounded,
                tooltip: 'Delete File',
                onClick: (event, rowData) => {DeleteRecord(rowData.RecordName, rowData.PetRecordId, rowData.FileName)},
                disabled: rowData.birthYear < 2000
              })
            ]}
            detailPanel={rowData => {

              if (rowData.RecordNotes == null) {
                rowData.RecordNotes = "No Notes.";
              } 

              return (
                <Form.Group controlId="formRecordNotes" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 5}}>
                    <Form.Label style={{fontSize: 16}}>Notes:</Form.Label>
                    <hr></hr>
                    <Form.Text name="recordNotes" style={{padding: 5, fontSize: 15}} >
                      {rowData.RecordNotes}
                    </Form.Text>
                    {/* <Form.Control name="recordNotes" type="textarea" as="textarea" rows={5}
                                  defaultValue={rowData.RecordNotes}
                                  onChange={handleRecordNotesChange}
                                  disabled={true}
                                  style={{}}
                                  required/> */}
                </Form.Group>
              )
            }}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [ 10 ]
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props}></MTableToolbar>
                  <div style={{padding: '0px 10px'}}>
                    <div id="RecordButtons"> 
                      <div className="FormSelect">
                        <Button className="FormAddButton" onClick={handleClick} variant="secondary">Upload Record</Button>
                        <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} />  
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
          />
          <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Update Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdateRecordComponent recordId={recordId} recordName={recordName} recordNotes={recordNotes} fetch={props.fetch}/>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
                    <Button variant="primary" type="submit" form="UpdateRecordForm">Update Record</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div> 
    )
  }

  class UpdateRecordComponent extends Component {
    constructor(props) {
      console.log(props);
      super();
      this.state = {
        RecordId: props.recordId.recordId,
        RecordName: props.recordName.recordName,
        RecordNotes: props.recordNotes.recordNotes};
        console.log("Component: 'UpdateRecordComponent' loaded");
    }

    
  
    //componentDidMount() {
    //  axios.get(`/api/pet-events/` + this.state.EventId, {withCredentials: true} )
    //    .then(response=>{
    //      this.setState({EventTypeId: response.data.EventTypeId,
    //                      EventId: response.data.EventId,
    //                      EventDescription: response.data.EventDescription,
    //                      Date: response.data.Date});
    //    })
    //    .catch((error) => {
    //        console.log(error);
    //    })
    //}
  
    handleRecordNameChange = event => {
      this.setState({RecordName: event.target.value});
      console.log(event.target.value);
    }
  
    handleRecordNotesChange = event => {
      this.setState({RecordNotes: event.target.value});
      console.log(event.target.value);
    }
  
    handleUpdate = (event) => {
    
      event.preventDefault();

      Swal.fire({
        title: 'Loading'
      });

    Swal.showLoading();
  
      const data = {
        RecordName: this.state.RecordName,
        RecordNotes: this.state.RecordNotes
      }
      console.log(data);
      console.log(this.state.RecordId);
      axios.put('/api/pet-records/' + this.state.RecordId, data, {withCredentials: true })
        .then((response) => {
          console.log("Axios response:" + response.statusText);
          Swal.fire('Congratulations!', `${data.RecordName} has been updated!`, 'success');
          this.props.fetch();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    render() {
      return (
        <div className="formBoxAddRecord">
            <Form id="UpdateRecordForm" onSubmit={this.handleUpdate}>
              <Form.Row>

                <Col>
                  <Form.Group controlId="formRecordName">
                  <Form.Label>RecordName</Form.Label>
                  <Form.Control name="recordName" type="text" min={0}
                                defaultValue={this.state.RecordName}
                                onChange={this.handleRecordNameChange}
                                required/>
                  </Form.Group>
                </Col>
              </Form.Row>
                  
              <Form.Row>
                <Col>
                  <Form.Group controlId="formRecordNotes">
                      <Form.Label>Record Notes</Form.Label>
                      <Form.Control name="recordNotes" type="textarea" as="textarea" rows={5}
                                  defaultValue={this.state.RecordNotes}
                                  onChange={this.handleRecordNotesChange}
                                  required/>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
        </div>
      )
    }
  }
export default PetRecordsComponent
