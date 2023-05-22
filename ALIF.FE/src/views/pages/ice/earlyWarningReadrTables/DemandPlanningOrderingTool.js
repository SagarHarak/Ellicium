/* eslint-disable no-dupe-keys */
/* eslint-disable no-useless-computed-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import './style.css'
import { CButton, CCard, CCardHeader, CModal, CSmartTable, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro';

const DemandPlanningOrderingTool = ({ demandPlanningTableData }) => {
    // key values of table head
    const columns = [
        { key: 'Grade type' },
        { key: 'Source' },
        { key: 'Group' },
        { key: 'Diameter' },
        { key: 'Lot number' },
        { key: 'ALIF Part' },
    ]

    // states for set payload
    const [gradeType, setGradeType] = useState('')
    const [group, setGroup] = useState('')
    const [diameter, setDiameter] = useState('')
    const [lotNum, setLotNum] = useState('null')
    // states for modal data and visibilty
    const [modalData, setModalData] = useState({})
    const [visibleRiskModal, setVisibleRiskModal] = useState(false)

    // make payload variable
    const payLoad = {
        Grade_type: gradeType,
        Group: group,
        Diameter: diameter,
        Lot_number: lotNum
    }

    useEffect(() => {
        console.log(payLoad)
    }, [gradeType, group, diameter, lotNum])


    // functions for set payload data 
    const gradeTypeFunc = (e, item) => {
        setGradeType(gradeType===item['Grade type'] ? '' : item['Grade type'])
        e.target.style.backgroundColor = gradeType==='' ? 'gray' : null
    }
    const groupFunc = (e, item) => {
        setGroup(group===item['Group'] ? '' : item['Group'])
        e.target.style.backgroundColor = group==='' ? 'gray' : null
    }
    const diameterFunc = (e, item) => {
        setDiameter(diameter===item['Diameter'] ? '' : item['Diameter'])
        e.target.style.backgroundColor = diameter==='' ? 'gray' : null
    }
    const lotNumTypeFunc = (e, item) => {
        setLotNum(lotNum===item['Lot number'] ? 'null' : item['Lot number'])
        e.target.style.backgroundColor = lotNum==='null' ? 'gray' : null
    }

    // function for post api in send button
    const aggregate = async () => {
        await axios.post('http://localhost:3000/api/v3/demand_planning/items/aggregate', payLoad).then((response) => {
            // console.log(response?.data?.data?.records[0])
            setModalData(response?.data?.data?.demand_planning[0])
            console.log("modalData", response?.data?.data?.demand_planning[0])
            setVisibleRiskModal(true)
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <CCard className='default-Card'>
            <CModal
                visible={visibleRiskModal}
                size={'lg'}
                onClose={() => setVisibleRiskModal(false)}
                style={{ borderRadius: '0 !important' }}
            >
                <BarChart modalData={modalData} chartID={'ChartStackDekho'} />
                <CCard className="p-0 default-Card h-100 border-bottom border-5 border-bottom-success">
                    {modalData['Grade type']?
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">% of change</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Suggested action</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Recommended ↵Order Qty (MT)</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Commodity Price trend next month</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell style={{ fontSize: '14px' }} scope="row">
                                    {modalData['% of change']}
                                </CTableDataCell>
                                <CTableDataCell style={{ fontSize: '14px' }}>
                                    {modalData[' Suggested action']}
                                </CTableDataCell>
                                <CTableDataCell style={{ fontSize: '14px' }}>
                                    {/* {modalData['Lot number']} */}1571.901282
                                </CTableDataCell>
                                <CTableDataCell style={{ fontSize: '14px' }}>
                                    {modalData['Commodity Price trend next month']}
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable> : null }
                </CCard>
            </CModal>

            <CCardHeader
                style={{ display: 'flex', justifyContent: 'space-between' }}
                className="cardtitle">Demand Planning/Ordering Tool
            </CCardHeader>

            <CSmartTable
                columns={columns}
                items={demandPlanningTableData}
                columnFilter
                clickableRows
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                // onRowClick={(e) => {
                //     console.log('e',e)
                // }} 
                scopedColumns={{
                    ['Grade type']: (item, i) => {
                        return (
                            <td key={i} className="py-2"
                                onClick={(e) => gradeTypeFunc(e, item)}>
                                {item['Grade type']}
                            </td>
                        )
                    },
                    ['Group']: (item, i) => {
                        return (
                            <td key={i} className="py-2"
                                onClick={(e) => groupFunc(e, item)}>
                                {item['Group']}
                            </td>
                        )
                    },
                    ['Diameter']: (item, i) => {
                        return (
                            <td key={i} className="py-2"
                                onClick={(e) => diameterFunc(e, item)}>
                                {item['Diameter']}
                            </td>
                        )
                    },
                    ['Lot number']: (item, i) => {
                        return (
                            <td key={i} className="py-2"
                                onClick={(e) => lotNumTypeFunc(e, item)}>
                                {item['Lot number']}
                            </td>
                        )
                    },

                }}
            />
            {/* here is send button  */}
            <span style={{ textAlign: 'end' }}> <CButton
                style={{
                    background: '#5AAD46',
                    border: 0,
                    borderRadius: 0,
                    fontSize: '14px',
                    textAlign: 'center'
                }}
                onClick={aggregate}
                // disabled={gradeType || lotType}
                className="text-white"
                shape="square"
                size="sm"

            >
                send
            </CButton></span>
        </CCard>
    )
}

export default DemandPlanningOrderingTool;