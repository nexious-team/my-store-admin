import React, { useState, useEffect } from "react";
import ENV from '../config/config.json'
import axios from "axios";
const Table = props => {
  const [tableData, setTableData] = useState([]);
  async function callUserApi() {
    const response = await axios.get(
      ENV.API_ENDPOINT + props.apiEndpoint,
      {
        headers: {
          "x-store": localStorage.getItem(ENV.APP_TOKEN)
        }
      }
    );
    return response;
  }
  useEffect(() => {
    callUserApi().then(response => {
      // console.log(response.data.payload);
      setTableData(response.data.payload);
      //   console.log(tableData);
    });
    // console.log(data);
  },);
  return (
    <React.Fragment>
      <table className="table">
          <thead>
          <tr>
            {props.header.map(th => (
              <th key={th}>{th}</th>
            ))}
          </tr>
          </thead>
        <tbody>
            {tableData.map(data =>(
                <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.username}</td>
                    <td>{data.role}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Table;