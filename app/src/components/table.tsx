import React from 'react';
import { Table } from 'react-bootstrap';
import { Data } from '../../../shared/types'

import './table.css'


export default (props: { data: Data[] }) => {
  const { data } = props;
  return (
    <Table size="lg" responsive="lg" bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>PhoneNumber</th>
          <th>Carrier</th>
          <th>Local Format</th>
          <th>Country Code</th>
          <th>Country Prefix</th>
          <th>Country Name</th>
          <th>Location</th>
          <th>Line Type</th>
          <th>IsValid</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d: Data, index: number) => {
          return (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{d.number}</td>
              <td>{d.carrier ? d.carrier : "N/A"}</td>
              <td>{d.local_format ? d.local_format : "N/A"}</td>
              <td>{d.country_code ? d.country_code : "N/A"}</td>
              <td>{d.country_prefix ? d.country_prefix : "N/A"}</td>
              <td>{d.country_name ? d.country_name : "N/A"}</td>
              <td>{d.location ? d.location : "N/A"}</td>
              <td>{d.line_type ? d.line_type : "N/A"}</td>
              <td>{d.valid ? "YES" : "NO"}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

