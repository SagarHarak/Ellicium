import React from 'react';
import { CCard, CCardHeader, CSmartTable } from '@coreui/react-pro';

const CompetitorTable = () => {
    const columns = [
        {
            key: 'Country_of_Origin',
            _style: { width: '10%' },
        },
        {
            key: '730630',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        },
        {
            key: '730650',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        }, {
            key: '730619',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        }, {
            key: '850132',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        }, {
            key: '854430',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        }, {
            key: '870829',
            _style: { width: '10%' },
            //_props: { color: 'primary', className: 'fw-semibold' },
        }

    ]
    const usersData1 = [
        {
            Country_of_Origin: 'Canada',
            '730630': '0%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '6%',
            '870829': '94%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        },
        {
            Country_of_Origin: 'China',
            '730630': '0%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '2%',
            '870829': '97%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        },
        {
            Country_of_Origin: 'Germany',
            '730630': '10%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '0%',
            '870829': '90%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        },
        {
            Country_of_Origin: 'Italy',
            '730630': '22%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '2%',
            '870829': '76%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        },
        {
            Country_of_Origin: 'Korea',
            '730630': '0%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '0%',
            '870829': '100%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        },
        {
            Country_of_Origin: 'Poland',
            '730630': '0%',
            '730650': '0%',
            '730619': '0%',
            '850132': '0%',
            '854430': '0%',
            '870829': '100%',
            _props: { className: 'dropdown-font' },

            // _props: { color: 'primary' },
        }
    ]

    return (
            <CCard className='default-Card'>
                <CCardHeader className="cardtitle">HS Code Analysis by Country</CCardHeader>
                <CSmartTable
                    columns={columns}
                    items={usersData1}
                />
                <div className="d-flex h-100 w-100 default-Card" >
                </div>
            </CCard>
    )
}

export default CompetitorTable;