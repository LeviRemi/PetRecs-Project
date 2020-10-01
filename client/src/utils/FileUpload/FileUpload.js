// FileUpload.js

import React, { useState, useEffect } from 'react'
import { render } from "react-dom"
import { useParams } from 'react-router';
import axios from 'axios';

// Style
import './FileUpload.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as swal from "sweetalert2";

function FileUpload(props) {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [urlpetid, setUrlpetid] = useState(useParams());

    const handleCloseUpload = () => props.closeModal();

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
        setFileName(e.target.files[0].name);
      }
    };
  
    // Uploading image to Cloud Storage
    const handleFileUpload = async (e) => {
        console.log("File Uploaded");
      e.preventDefault();

      console.log("last 3 =", fileName.substr(fileName.length - 3).toLowerCase());

      if (fileName.substr(fileName.length - 3).toLowerCase() !== "png" && "jpg") {
          swal.fire("Oops...", "We only accept jpg or png files", "error");
          return;
      }
  
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
          console.log(fileData);
          axios.post("/api/upload", fileData, {withCredentials: true})
          .then((response) => {
            axios.put('/api/pets/' + urlpetid.PetId, {"ProfileUrl": response.data.fileLocation}, {Params: {id: urlpetid.PetId}, withCredentials: true })
              .then((res) => {
                    swal.fire("Congratulations!", "Profile picture updated", "success");
                    props.closeModal();
                  console.log(res);
            })
          }, (error) => {
              swal.fire("Oops...", `Error uploading file ${fileName}`, "error");
            console.log(error);
          });
        }
      } catch (error) {
          swal.fire("Oops...", "No file was selected", "error");
        console.log(error);
      }
    };
//<button onClick={handleFileUpload}>Save</button> 
    return (
      <div id="UploadButtons">
          <Modal.Body>
              <div>
                  <br />
                  <Button onClick={handleClick} variant="secondary">Select Image</Button>
                  <input type="file" ref={hiddenFileInput} className="custom-file-input" onChange={onFileSelected} style={{display: "none"}} />
                  <p id="fileChosen">File Selected: {fileName || "none"}</p>
              </div>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpload}>Close</Button>
              <Button variant="primary" onClick={handleFileUpload}>Save Profile Picture</Button>
          </Modal.Footer>
      </div>
    )
}

export default FileUpload