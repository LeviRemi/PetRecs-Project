// RecordUpload.js

import React, { useState, useEffect } from 'react'
import { render } from "react-dom"
import { useParams } from 'react-router';
import axios from 'axios';

// Style
import './FileUpload.css'
import Button from 'react-bootstrap/Button';

function RecordUpload() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [urlpetid, setUrlpetid] = useState(useParams());

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
      hiddenFileInput.current.click();
    };


    // Handling file selection from input
    const onFileSelected = async (e) => {
        console.log("File Selected");
      if (e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    // Uploading image to Cloud Storage
    const handleFileUpload = async (e) => {
        console.log("File Uploaded");
      e.preventDefault();
  
      try {
        if (selectedFile !== '') {
          // Creating a FormData object
          let fileData = new FormData();
  
          // Adding the 'image' field and the selected file as value to our FormData object
          // Changing file name to make it unique and avoid potential later overrides
          fileData.set(
            'file',
            selectedFile,
            `${Date.now()}-${selectedFile.name}`,
          );

          const enteredFileName = prompt('Please enter file name', `${selectedFile.name}`);

          if (enteredFileName != null) {

            axios.post("/api/upload/record", fileData, {withCredentials: true})
            .then((response) => {
              console.log("upload success");
  
              
              const data = {
                  PetId: urlpetid.PetId,
                  RecordName: enteredFileName,
                  RecordUrl: response.data.fileLocation,
                  FileName: selectedFile.name,
                  UploadDate: Date.now()
                };
  
              console.log(data);
              axios.post('/api/pet-records/', data, {withCredentials: true })
                .then((res) => {
                    console.log(res);
              })
            }, (error) => {
              console.log(error);
            });
          } else {console.log("Cancelled");}
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div id="RecordButtons"> 
        <div id="RecordSelect">      
          <Button onClick={handleClick} variant="secondary">Select File</Button> 
          <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} />  
          <div id="RecordSave">
            <Button  variant="secondary" onClick={handleFileUpload}>Save</Button>   
          </div>   
        </div>

      </div>
    )
}

export default RecordUpload