// FileUpload.js

import React, { useState, useEffect } from 'react'
import { render } from "react-dom"
import { useParams } from 'react-router';
import axios from 'axios';

// Style
import './FileUpload.css'
import Button from 'react-bootstrap/Button';

function FileUpload() {

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
        setSelectedFile(e.target.files[0], handleFileUpload);
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
            'image',
            selectedFile,
            `${Date.now()}-${selectedFile.name}`,
          );

          axios.post("http://localhost:5000/api/upload", fileData, {withCredentials: true})
          .then((response) => {

            console.log(response);
            axios.put('http://localhost:5000/api/pets/' + urlpetid.PetId, {"ProfileUrl": response.data.fileLocation}, {Params: {id: urlpetid.PetId}, withCredentials: true })
              .then((res) => {
                  console.log(res);
            })
          }, (error) => {
            console.log(error);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
//<button onClick={handleFileUpload}>Save</button> 
    return (
      <div id="UploadButtons"> 
        <div>        
          <Button onClick={handleClick} variant="secondary">Upload Image</Button>
          <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} />      
        </div>
        <div id="FileUploadSave">
          <Button  variant="secondary" onClick={handleFileUpload}>Save</Button> 
          
        </div>
      </div>
    )
}

export default FileUpload