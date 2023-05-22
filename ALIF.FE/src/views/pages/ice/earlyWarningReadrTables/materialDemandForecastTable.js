/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CCard, CCardHeader, CSmartPagination, CSmartTable } from '@coreui/react-pro';

function MaterialDemandForecastTable({ demandPlanningTableData }) {
    const columns = [
        {
            key: 'Item code',
            _style: { width: '90px', overflow: 'auto' },
        },
        {
            key: 'Description',
            // _style: { width: '100px', overflow: 'auto' },
        },
        {
            key: 'Grade type',
            _style: { width: '180px', overflow: 'auto' },
        },
        {
            key: 'Grade/Lot Type',
            // _style: { width: '100px', overflow: 'auto' },
        // },
        // {
        //     key: 'Category',
        //     // _style: { width: '10%' },
        // },{
        //     key: 'Part #',
        //     // _style: { width: '10%' },
        // },{
        //     key: 'Des.',
        //     // _style: { width: '10%' },
        // }, {
        //     key: 'Grade/Lot Type',
            // _style: { width: '10%' },
        }, {
            key: 'Jan',
            // _style: { width: '10%' },
        },{
            key: 'Feb',
            // _style: { width: '10%' },
        },{
            key: 'Mar',
            // _style: { width: '10%' },
        },{
            key: 'Apr',
            // _style: { width: '10%' },
        },{
            key: 'May',
            // _style: { width: '10%' },
        },{
            key: 'Jun',
            // _style: { width: '10%' },
        },{
            key: 'Jul',
            // _style: { width: '10%' },
        },{
            key: 'Aug',
            // _style: { width: '10%' },
        },{
            key: 'Sep',
            // _style: { width: '10%' },
        },{
            key: 'Oct',
            // _style: { width: '10%' },
        },{
            key: 'Nov',
            // _style: { width: '10%' },
        },{
            key: 'Dec',
            // _style: { width: '10%' },
        }
    ]
    const usersData1 = [
        {
            'Item code': '1HCWR',
            'Description': 'HIGH CARBON WIRE ROD',
            'Grade type': 'HIGH CARBON',
            'Grade/Lot Type': '1038-5.8mm',
            'Jan':'100',
            'Feb':'120',
            'Mar':'100',
            'Apr':'100',
            'May':'100',
            'Jun':'100',
            'Jul':'100',
            'Aug':'100',
            'Sep':'100',
            'Oct':'100',
            'Nov':'100',
            'Dec':'100',
            _props: { className: 'dropdown-font' },
        },
        {
            'Item code': '1HCWR',
            'Description': 'HIGH CARBON WIRE ROD',
            'Grade type': 'HIGH CARBON',
            'Grade/Lot Type': '1038-10mm',
            'Jan':'100',
            'Feb':'120',
            'Mar':'100',
            'Apr':'100',
            'May':'100',
            'Jun':'100',
            'Jul':'100',
            'Aug':'100',
            'Sep':'100',
            'Oct':'100',
            'Nov':'100',
            'Dec':'100',
            _props: { className: 'dropdown-font' },
        },
        {
            'Item code': '1HCWR',
            'Description': 'HIGH CARBON WIRE ROD',
            'Grade type': 'HIGH CARBON',
            'Grade/Lot Type': '1038-6mm',
            'Jan':'100',
            'Feb':'120',
            'Mar':'100',
            'Apr':'100',
            'May':'100',
            'Jun':'100',
            'Jul':'100',
            'Aug':'100',
            'Sep':'100',
            'Oct':'100',
            'Nov':'100',
            'Dec':'100',
            _props: { className: 'dropdown-font' },
        },
        {
            'Item code': '1HCWR',
            'Description': 'HIGH CARBON WIRE ROD',
            'Grade type': 'HIGH CARBON',
            'Grade/Lot Type': '1038-9.8mm',
            'Jan':'100',
            'Feb':'120',
            'Mar':'100',
            'Apr':'100',
            'May':'100',
            'Jun':'100',
            'Jul':'100',
            'Aug':'100',
            'Sep':'100',
            'Oct':'100',
            'Nov':'100',
            'Dec':'100',
            _props: { className: 'dropdown-font' },
        }
    ]
    // const [page, setPage] = useState(1)


    // const func = (e)=>{
    //     setPage(e)
    // }
  return (
        <CCard className='default-Card'>
            <CCardHeader className="cardtitle">Material demand forecast table</CCardHeader>
            <CSmartTable
                columns={columns}
                items={usersData1}
                // itemsPerPageSelect
                // itemsPerPage={5}
                // pagination
            />
             {/* <CSmartPagination activePage={page} pages={2} onActivePageChange={(e)=>func(e)} /> */}
        </CCard>
  )
}

export default MaterialDemandForecastTable;