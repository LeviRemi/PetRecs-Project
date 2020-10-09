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
      getRecords()
  }, [])

  const handleClick = (event) => {
    hiddenFileInput.current.value = null;
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
              rowData => ({
                icon: DeleteRounded,
                tooltip: 'Delete File',
                onClick: (event, rowData) => {DeleteRecord(rowData.RecordName, rowData.PetRecordId, rowData.FileName)},
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
