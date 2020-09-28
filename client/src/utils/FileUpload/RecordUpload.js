// RecordUpload.js

import React, { useState, useEffect } from 'react'
import { render } from "react-dom"
import { useParams } from 'react-router';
import axios from 'axios';

// Style
import './FileUpload.css'
import Button from 'react-bootstrap/Button';

function RecordUpload() {

    //const [selectedFile, setSelectedFile] = useState(null);
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
        //setSelectedFile(e.target.files[0]);
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

            axios.post("http://localhost:5000/api/upload/record", fileData, {withCredentials: true})
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
              axios.post('http://localhost:5000/api/pet-records/', data, {withCredentials: true })
                .then((res) => {
                    console.log(res);
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
      <div id="RecordButtons"> 
        <div id="RecordSelect">      
          <Button onClick={handleClick} variant="secondary">Upload Record</Button> 
          <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} />  
        </div>

      </div>
    )
}

export default RecordUpload