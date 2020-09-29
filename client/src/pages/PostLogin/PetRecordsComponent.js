// PetRecordsComponent.js

import React, { Component } from 'react';
import axios from 'axios';

import RecordUpload from '../../utils/FileUpload/RecordUpload.js';
import MaterialTable, {MTableToolbar} from "material-table";

// MT Icons
import tableIcons from '../../utils/TableIcons.js'
import DownloadRounded from '@material-ui/icons/GetAppRounded';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

class PetRecordsComponent extends Component {
  constructor(props) {
    super();
    this.state = { PetId: props.match.params.PetId, records: [] };
    console.log("PetRecordsComponent - Using PetId: " + this.state.PetId);
  }

  DeleteRecord = async (RecordName, PetRecordId) => {
    if (window.confirm("You want to delete " + RecordName)) {
      axios.delete(`/api/pet-records/` + PetRecordId, {withCredentials: true} )
      .then(response=>{
        this.setState({records: response.data});
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
    axios.get(`/api/pet-records/pet/` + this.state.PetId, {withCredentials: true} )
      .then(response=>{
        this.setState({records: response.data});
        console.log(response.data);
      })
      .catch((error) => {
          console.log(error);
      })
  }
  
  render() {
  return (
      <div className="petProfileBody nopadding">
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            columns={[
              { title: 'Name', field: 'RecordName' },
              { title: 'Date Uploaded', field: 'UploadDate', type: 'datetime'}
            ]}
            data={this.state.records}
            title="Pet Records"
            icons={tableIcons}
            actions={[
              {
                icon: DownloadRounded,
                tooltip: 'Download File',
                onClick: (event, rowData) => this.openInNewTab(rowData.RecordUrl)
              },
              rowData => ({
                icon: DeleteRounded,
                tooltip: 'Delete File',
                onClick: (event, rowData) => {this.DeleteRecord(rowData.RecordName, rowData.PetRecordId)},
                disabled: rowData.birthYear < 2000
              })
            ]}
            options={{
              actionsColumnIndex: -1
            }}
            onRowClick={(event, rowData) => this.openInNewTab(rowData.RecordUrl)}
            // In Progress - Customizing table toolbar to include file upload buttons.
            //------------------------------------------------------------------------
            // components={{
            //   Toolbar: props => (
            //     <div>
            //       <h2 >Pet Records</h2>
            //       <div style={{padding: '0px 10px'}}>
            //         <RecordUpload value={this.state.PetId}/>
            //       </div>
                  
            //     </div>
            //   ),
            // }}
          />
        </div>
          <RecordUpload value={this.state.PetId}/>
      </div>
      
    )
  }
}

export default PetRecordsComponent