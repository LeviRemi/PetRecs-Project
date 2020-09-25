// PetRecordsComponent.js

import React, { Component } from 'react';
import RecordUpload from '../../utils/FileUpload/RecordUpload.js';

class PetRecordsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId };
    console.log("PetRecordsComponent - Using PetId: " + this.state.PetId);
  }
  render() {
  return (
      <div className="petProfileBody nopadding">
          <RecordUpload value={this.state.PetId}/>
      </div>
      
    )
  }
}

export default PetRecordsComponent