import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CContainer } from '@coreui/react-pro'
import PropTypes from 'prop-types'

const WhatIfAnalysis = () => {
  const token = `${localStorage.getItem("accesstoken")}`;
  const navigate = useNavigate()

  useEffect(() => {
    if (token == 'null') {
        navigate('/')
    }
}, [])

  return (
    <></>
    // <CContainer>
    //   <table
    //     className="table table-bordered"
    //     style={{
    //       height: '80vh',
    //     }}
    //   >
    //     <TableHead rowhead={['Risk', 'Subjective Impact', 'Quantified Impact', 'Actions']} />
    //     <tbody>
    //       <TableBodyRow
    //         data={[
    //           'Weather',
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#d4f1f9"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Weather',
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#fffff"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Weather',
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#d4f1f9"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Financial',
    //           ['Labour Loss', 'Production Loss'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#fffff"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Weather',
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#d4f1f9"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Financial',
    //           ['Labour Loss', 'Production Loss'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#fffff"
    //       />
    //       <TableBodyRow
    //         data={[
    //           'Weather',
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //           ['Infrastructural damage', 'Logistics', 'Labour Loss', 'Manufacturing'],
    //         ]}
    //         color="#d4f1f9"
    //       />
    //     </tbody>
    //   </table>
    // </CContainer>
  )
}

export default WhatIfAnalysis

const TableHead = ({ rowhead }) => {
  return (
    <thead>
      <tr>
        {rowhead?.map((row, index) => {
          return (
            <th className="fs-5 py-4" key={index}>
              {row}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

const TableBodyRow = ({ data, color }) => {
  return (
    <tr
      style={{
        backgroundColor: color,
      }}
    >
      <td>{data[0]}</td>
      <td>
        <ul>
          {data[1].map((table, index) => {
            return <li key={index}>{table}</li>
          })}
        </ul>
      </td>
      <td>
        <ul>
          {data[2].map((table, index) => {
            return <li key={index}>{table}</li>
          })}
        </ul>
      </td>
      <td>
        <ul>
          {data[3].map((table, index) => {
            return <li key={index}>{table}</li>
          })}
        </ul>
      </td>
    </tr>
  )
}

TableBodyRow.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
}

TableHead.propTypes = {
  rowhead: PropTypes.array,
}
