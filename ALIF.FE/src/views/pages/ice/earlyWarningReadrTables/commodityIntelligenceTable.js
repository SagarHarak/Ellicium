import React, { useState } from 'react';
import { CCard, CCardHeader, CPagination, CPaginationItem, CSmartPagination, CSmartTable, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro';

const CommodityIntelligenceTable = () => {
    const columns = [
        {
            key: 'Market Commodity',
            _style: { maxWidth: '10%' },
        },
        // {
        // key: 'Exposure (USD M)',
        // _style: { width: '10%' },
        // },
        {
            key: 'Current Week Price',
            // _style: { width: '10%' },
        }, {
            key: '% vs. previous Week',
            // _style: { width: '10%' },
        }, {
            key: 'Delta MOM',
            // _style: { width: '10%' },
        }, {
            key: 'Delta YOY',
            // _style: { width: '10%' },
        }, {
            key: 'Current Year Peak',
            // _style: { width: '10%' },
        }, {
            key: 'Current Year Lowest',
            // _style: { width: '10%' },
        }, {
            key: 'Further Trend',
            // _style: { width: '10%' },
        }

    ]
    const usersData1 = [
        {
            'Market Commodity': 'Steel Wire Rod 1',
            // 'Exposure (USD M)': '3',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Up 5%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 2',
            // 'Exposure (USD M)': '3',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Down 10%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 3',
            // 'Exposure (USD M)': '3',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Up 5%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 4',
            // 'Exposure (USD M)': '3',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Down 10%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 5',
            // 'Exposure (USD M)': '2',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Up 5%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 6',
            // 'Exposure (USD M)': '5',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Down 10%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 7',
            // 'Exposure (USD M)': '7',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Up 5%',
            _props: { className: 'dropdown-font' },
        },
       
    ]

   let usersData2 = [
        {
            'Market Commodity': 'Steel Wire Rod 6',
            // 'Exposure (USD M)': '5',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Down 10%',
            _props: { className: 'dropdown-font' },
        },
        {
            'Market Commodity': 'Steel Wire Rod 7',
            // 'Exposure (USD M)': '7',
            'Current Week Price': '1.2',
            '% vs. previous Week': '5%',
            'Delta MOM': '12%',
            'Delta YOY': '-20%',
            'Current Year Peak': '1.7',
            'Current Year Lowest': '0.9',
            'Further Trend': 'Up 5%',
            _props: { className: 'dropdown-font' },
        },
    ]
    const [page, setPage] = useState(1)

    let usersData = page===1 ? usersData1 : usersData2 ;

    return (
        <CCard className='default-Card'>
            <CCardHeader className="cardtitle">Commodity Intelligence Radar</CCardHeader>
            <CSmartTable
                columns={columns}
                items={usersData1}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
            />
            {/* <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Market Commodity</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Current Week Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">% vs. previous Week</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Delta MOM</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Delta YOY</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Current Year Peak</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Current Year Lowest</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Further Trend</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {usersData.map((item, i) => <CTableRow key={i}>
                        <CTableHeaderCell scope="row">{item['Market Commodity']}</CTableHeaderCell>
                        <CTableDataCell>{item['Current Week Price']}</CTableDataCell>
                        <CTableDataCell>{item['% vs. previous Week']}</CTableDataCell>
                        <CTableDataCell>{item['Delta MOM']}</CTableDataCell>
                        <CTableDataCell>{item['Delta YOY']}</CTableDataCell>
                        <CTableDataCell>{item['Current Year Peak']}</CTableDataCell>
                        <CTableDataCell>{item['Current Year Lowest']}</CTableDataCell>
                        <CTableDataCell>{item['Further Trend']}</CTableDataCell>
                    </CTableRow>
                    )}
                </CTableBody>
            </CTable>
            <CSmartPagination activePage={page} pages={2} onActivePageChange={()=>setPage(page===1? 2 : 1)} /> */}
        </CCard>
    )
}

export default CommodityIntelligenceTable;