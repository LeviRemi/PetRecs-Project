// PetRecordsComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter, trackPromise } from 'react-promise-tracker';
import { useParams } from 'react-router';
import Swal from 'sweetalert2'

import MaterialTable, {MTableToolbar} from "material-table";

// MT Icons
import tableIcons from '../../utils/TableIcons.js'
import DownloadRounded from '@material-ui/icons/GetAppRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

// Style
import '../../utils/FileUpload/FileUpload.css';
import Button from 'react-bootstrap/Button';

function PetRecordsComponent(props) {

  const PetId = props.match.params.PetId;
  const [records, setRecords] = useState([]);
  const [urlpetid, setUrlpetid] = useState(useParams());

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null)

  function getRecords() {
    manuallyIncrementPromiseCounter();
    axios.get(`/api/pet-records/pet/` + PetId, {withCredentials: true} )
      .then(response=>{
        setRecords(response.data);
        console.log(response.data);
        document.getElementById("petRecordsBodyId").hidden=false;

        manuallyDecrementPromiseCounter();
      })
      .catch((error) => {
          console.log(error);
          manuallyDecrementPromiseCounter();
      })
  };

  function UpdateRecords() {
    axios.get(`/api/pet-records/pet/` + PetId, {withCredentials: true} )
      .then(response=>{
        setRecords(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
  };

  function DeleteRecord(RecordName, PetRecordId) {
    if (window.confirm("You want to delete " + RecordName)) {
      axios.delete(`/api/pet-records/` + PetRecordId, {withCredentials: true} )
      .then(response=>{
        this.setState({records: response.data});
        console.log(response.data);
      })
      .catch((error) => {
        console.log(PetRecordId);
          console.log(error);
      })
    }
  };

  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  useEffect(() => {
      getRecords()
  }, [])

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

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
        fileData.set(
          'file',
          fileUploaded,
          `${Date.now()}-${fileUploaded.name}`,
        );

        const enteredFileName = prompt('Please enter file name', `${fileUploaded.name}`);

        if (enteredFileName != null) {

          axios.post("/api/upload/record", fileData, {withCredentials: true})
          .then((response) => {
            console.log("upload success");


            const data = {
                PetId: urlpetid.PetId,
                RecordName: enteredFileName,
                RecordUrl: response.data.fileLocation,
                FileName: fileUploaded.name,
                UploadDate: Date.now()
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
        } else {console.log("Cancelled");}
      } else {console.log(e.target.files[0]);}
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
      <div id="petRecordsBodyId" className="petProfileBody nopadding" hidden='true' style={{height: "100%"}}>
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={[
              { title: 'Name', field: 'RecordName' },
              { title: 'Date Uploaded', field: 'UploadDate', type: 'datetime'}
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
              rowData => ({
                icon: DeleteRounded,
                tooltip: 'Delete File',
                onClick: (event, rowData) => {DeleteRecord(rowData.RecordName, rowData.PetRecordId)},
                disabled: rowData.birthYear < 2000
              })
            ]}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [ 10 ]
            }}
            onRowClick={(event, rowData) => openInNewTab(rowData.RecordUrl)}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props}></MTableToolbar>
                  <div style={{padding: '0px 10px'}}>
                    <div id="RecordButtons"> 
                      <div id="RecordSelect">      
                        <Button onClick={handleClick} variant="secondary">Upload Record</Button> 
                        <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} />  
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

export default PetRecordsComponent
