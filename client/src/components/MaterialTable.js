import React, { Component } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

 const Table = () => {

    //this.state = { PetId: props.match.params.PetId, records: [] };
    
    const data = [];

    const columns = [
        {
          title: "Name",
          field: "RecordName",
        },
        {
          title: "Date",
          field: "date",
        },
      ];

    return (
        <MaterialTable title="Pet Records" data={data} columns={columns} />
      );
  };

  export default Table

