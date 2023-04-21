import {
    CButton, CCard, CCardBody, CCol, CRow, CNavItem, CNavLink, CNav, CTabContent, CTabPane, CInputGroup,
    CFormInput, CImage, CListGroup,
} from '@coreui/react-pro'
import {
    cilDataTransferDown, cilDataTransferUp, cilCircle, cilDelete, cilMediaStepBackward,
    cilMediaStepForward, cilArrowRight, cilArrowLeft, cilInfo, cilPencil, cilTrash
} from '@coreui/icons'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import wallet from '../../../../assets/Wallet.png'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import downsortsvg from '../../../../assets/downsortsvg.svg'
import * as xlsx from 'xlsx';
import { uploadProductsDataFromExcel } from 'src/redux/async'
import XLSX from 'sheetjs-style'
import * as FileSaver from 'file-saver'
import { reset } from 'src/redux/slices/Config/datamanageexcel.slice';

const dummyColumns = [
    {
        'company_id': '',
        'company_name': '',
        'is_default': ''
    }
]

const DataManagement1 = () => {
    const [activeKey, setActiveKey] = useState(1)
    const [next, setNext] = useState(1)
    const [apiNext, setApiNext] = useState(1)
    const [erpNext, setErpNext] = useState(1)
    const [details, setDetails] = useState([])
    const [csvArray, setCsvArray] = useState([]);
    const [flag, setFlag] = useState(false)
    const token = `${localStorage.getItem("accesstoken")}`;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { exceluploadloader, exceluploaderror, exceluploadconfirm } = useSelector((state) => state.excelupload)
    const DownSort = () => {
        return <img src={downsortsvg} alt="" width="20px" className="mx-2" />
    }
    const first_page = <CIcon icon={cilMediaStepBackward} />
    const last_page = <CIcon icon={cilMediaStepForward} />
    const nexticon = <CIcon icon={cilArrowRight} />
    const previous = <CIcon icon={cilArrowLeft} />

    const columns2 = [
        {
            id: 'Company ID',
            name: 'company_id',
            selector: (row) => row.company_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            id: 'Company Name',
            name: 'company_name',
            selector: (row) => row.company_name,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            id: 'is_default',
            name: 'Is Default',
            selector: (row) => row.is_default,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {

            cell: (ev) =>
                <><CButton disabled onClick={(e) => { editRow(ev) }} style={{
                    backgroundColor: '#5AAD46',
                    // height: '40px',
                    // width: '76px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    cursor: 'pointer',
                    marginRight: '10%',
                    // flex: 1,
                    borderRadius: '0%',
                }}><CIcon icon={cilPencil}></CIcon></CButton>
                    <CButton onClick={(e) => { deleteRow(ev) }} style={{
                        backgroundColor: '#5AAD46',
                        // height: '40px',
                        // width: '76px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Roboto',
                        cursor: 'pointer',
                        marginRight: '10%',
                        // flex: 1,
                        borderRadius: '0%',
                    }}><CIcon icon={cilTrash}></CIcon></CButton></>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ]

    const customStyles = {
        rows: {
            style: {
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '16px',
                background: '#161a1e',
                color: '#A8B6C2',
                maxWidth: '100%',
                whiteSpace: 'normal',
                overflow: 'none',
                minHeight: '50px',
            },
        },
        headCells: {
            style: {
                background: '#1d2328',
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '19px',
            },
        },
        pagination: {
            style: {
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '16px',
                background: '#1d2328',
                color: '#A8B6C2',
                // maxWidth: '100%',
                whiteSpace: 'normal',
                overflow: 'none',
                minHeight: '50px',
            },
        }
    }

    const columns = [
        {
            name: 'id',
            selector: (row) => row.id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'product_id',
            selector: (row) => row.product_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'product_name',
            selector: (row) => row.product_name,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'component_id',
            selector: (row) => row.component_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'component_name',
            selector: (row) => row.component_name,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'shipper_id',
            selector: (row) => row.shipper_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'shipper_company_name',
            selector: (row) => row.shipper_company_name,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'shipper_tier',
            selector: (row) => row.shipper_tier,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'consignee_id',
            selector: (row) => row.consignee_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'consignee_company_name',
            selector: (row) => row.consignee_company_name,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'month',
            selector: (row) => row.month,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'year',
            selector: (row) => row.year,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'invoice_quantity',
            selector: (row) => row.invoice_quantity,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'invoice_amount',
            selector: (row) => row.invoice_amount,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'risk_type',
            selector: (row) => row.risk_type,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'score',
            selector: (row) => row.score,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'risk_level',
            selector: (row) => row.risk_level,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'home_port_id',
            selector: (row) => row.home_port_id,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'country',
            selector: (row) => row.country,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'lat',
            selector: (row) => row.lat,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'lng',
            selector: (row) => row.lng,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'is_default',
            selector: (row) => row.is_default,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'quarter',
            selector: (row) => row.quarter,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'years',
            selector: (row) => row.years,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'product_category',
            selector: (row) => row.product_category,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
        {
            name: 'iso2',
            selector: (row) => row.iso2,
            sortable: true,
            //   width: '200px',
            style: {
                cursor: 'pointer',
            },
        },
    ]

    const filetype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = '.xlsx'
    const filename = 'UploadExcelTemplate'
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(dummyColumns);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: filetype });
        FileSaver.saveAs(data, filename + fileExtension)
    }

    useEffect(() => {
        if (token == 'null') {
            navigate('/')
        }
    }, [])

    const handleOnChange = (e) => {
        // setFile(e.target.files[0]);
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setCsvArray(json)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }

    };

    const editRow = () => {
    }

    const deleteRow = (e) => {
        let arr = []
        csvArray.forEach((el) => {
            if (e.__rowNum__ != el.__rowNum__) {
                arr.push(el)
            }
        })
        setCsvArray(arr)
    }

    const submitExcelData = () => {
        dispatch(uploadProductsDataFromExcel(csvArray))
        setFlag(true)
    }

    useEffect(() => {
        if (exceluploadconfirm || exceluploaderror) {
            if (flag) {
                if (exceluploaderror) {
                    alert('Excel Upload Unsuccessful!!!')
                }
                else {
                    alert('Excel Upload successful!')
                    setCsvArray([])
                    setNext(1)
                }
                setFlag(false)
                dispatch(reset())
            }
        }
    }, [exceluploadconfirm, exceluploaderror, exceluploadloader])

    return (
        <>
            <CRow>
                <CCard className="default-Card h-100 ">
                    <CCardBody>
                        <span className="cardtitle">Data Management</span>
                        <br />
                        <span style={{ fontSize: '14px', color: '#4B5A67' }}>
                            Select your Data source from the options provided. Based on the selections, the steps might change.
                        </span>
                        <br />
                        <br />

                        <CNav variant="pills" role="tablist" >
                            <CNavItem>
                                <CNavLink className='nav2'
                                    style={{ width: '200px' }}
                                    // href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Excel
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='nav2'
                                    style={{ width: '200px' }}
                                    // href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >
                                    API
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink className='nav2'
                                    style={{ width: '200px' }}
                                    // href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    ERP
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <br />
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}
                            // style={{ alignContent: 'center', alignItems: 'center' }}
                            >
                                {next === 1 ? <>
                                    <CRow>
                                        <CCol>
                                            <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                    <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; Download
                                                </span>
                                                {/* <span style={{ fontSize: '14px', color: '#A8A7A7', }}>

                                                    &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                </span> */}
                                            </CCard>
                                        </CCol>
                                        <CCol>
                                            <CCard className="p-0 default-Card h-100 border-top border-5" >
                                                <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                    <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Upload
                                                </span>
                                                {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                    &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                </span> */}

                                            </CCard>
                                        </CCol>
                                        <CCol>
                                            <CCard className="p-0 default-Card h-100 border-top border-5">
                                                <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                    <CIcon style={{ color: '#5AAD46' }} icon={cilCircle}></CIcon>  &nbsp; Review and Submit
                                                </span>
                                                {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                    &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                </span> */}

                                            </CCard>
                                        </CCol>
                                    </CRow>

                                    <CImage src={wallet} style={{ marginLeft: '38%' }}></CImage>
                                    <br />
                                    <CButton shape="rounded-0" style={{
                                        marginLeft: '40%', color: '#AEC836',
                                        borderColor: '#AEC836', backgroundColor: '#24252f'
                                    }}
                                        onClick={() => { exportToExcel() }}
                                    >
                                        Download Template &nbsp;
                                        <CIcon icon={cilDataTransferDown}></CIcon>
                                    </CButton>

                                    <span
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            padding: '20px',
                                            paddingRight: '10px',
                                            paddingTop: '100px'
                                        }}
                                    >

                                    </span>
                                    {/* <span> */}
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <CButton style={{
                                            backgroundColor: '#5AAD46',
                                            // height: '40px',
                                            // width: '76px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            fontFamily: 'Roboto',
                                            cursor: 'pointer',
                                            marginRight: '10%',
                                            // flex: 1,
                                            borderRadius: '0%'
                                        }}
                                            onClick={() => { setNext(2) }}
                                        >Next</CButton>
                                    </div>
                                    {/* </span> */}

                                </> :
                                    next === 2 ?
                                        <>
                                            <CRow>
                                                <CCol>
                                                    <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                        <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                            <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; Download
                                                        </span>
                                                        {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                            &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                        </span> */}
                                                    </CCard>
                                                </CCol>
                                                <CCol>
                                                    <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                        <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                            <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Upload
                                                        </span>
                                                        {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                            &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                        </span> */}

                                                    </CCard>
                                                </CCol>
                                                <CCol>
                                                    <CCard className="p-0 default-Card h-100 border-top border-5">
                                                        <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                            <CIcon style={{ color: '#5AAD46' }} icon={cilCircle}></CIcon>  &nbsp; Review and Submit
                                                        </span>
                                                        {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                            &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                        </span> */}

                                                    </CCard>
                                                </CCol>
                                            </CRow>
                                            <CImage src={wallet} style={{ marginLeft: '38%' }}></CImage>
                                            <br />

                                            <CFormInput shape="rounded-0" type="file" id="excelFileInput" accept='.xlsx' onChange={handleOnChange} style={{
                                                textAlign: "center", width: '25%', marginLeft: '36%',
                                                color: '#AEC836', borderColor: '#AEC836', borderRadius: '0%',
                                                backgroundColor: '#24252f'
                                            }} />
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    padding: '20px',
                                                    paddingRight: '10px',
                                                    paddingTop: '100px'
                                                }}
                                            >

                                            </span>
                                            {/* <span> */}
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton className="me-md-2"
                                                    style={{
                                                        backgroundColor: '#5AAD46',
                                                        // height: '40px',
                                                        // width: '76px',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        fontFamily: 'Roboto',
                                                        cursor: 'pointer',
                                                        marginRight: '30px',
                                                        // flex: 1,
                                                        borderRadius: '0%'
                                                    }}
                                                    onClick={() => { setNext(1) }}>
                                                    Back
                                                </CButton>
                                                {csvArray.length > 0 ?
                                                    <CButton style={{
                                                        backgroundColor: '#5AAD46',
                                                        // height: '40px',
                                                        // width: '76px',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        fontFamily: 'Roboto',
                                                        cursor: 'pointer',
                                                        marginRight: '10%',
                                                        // flex: 1,
                                                        borderRadius: '0%'
                                                    }}
                                                        onClick={() => { setNext(3) }}>Next</CButton>
                                                    : <CButton disabled style={{
                                                        backgroundColor: '#5AAD46',
                                                        // height: '40px',
                                                        // width: '76px',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        fontFamily: 'Roboto',
                                                        cursor: 'pointer',
                                                        marginRight: '10%',
                                                        // flex: 1,
                                                        borderRadius: '0%',
                                                    }}
                                                        onClick={() => { setNext(3) }}>Next</CButton>
                                                }
                                            </div>
                                        </> :
                                        next === 3 ?
                                            <>
                                                <CRow>
                                                    <CCol>
                                                        <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                            <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                                <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; Download
                                                            </span>
                                                            {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                                &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                            </span> */}
                                                        </CCard>
                                                    </CCol>
                                                    <CCol>
                                                        <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                            <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                                <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Upload
                                                            </span>
                                                            {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                                &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                            </span> */}

                                                        </CCard>

                                                    </CCol>
                                                    <CCol>
                                                        <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success">
                                                            <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                                <CIcon style={{ color: '#5AAD46' }} icon={cilCircle}></CIcon>  &nbsp; Review and Submit
                                                            </span>
                                                            {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                                &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                            </span> */}

                                                        </CCard>
                                                    </CCol>

                                                </CRow>
                                                <br />
                                                <CRow>
                                                    <DataTable
                                                        className="mt-2"
                                                        responsive
                                                        paginationIconFirstPage={first_page}
                                                        paginationIconLastPage={last_page}
                                                        paginationIconNext={nexticon}
                                                        paginationIconPrevious={previous}
                                                        columns={columns2}
                                                        data={csvArray}
                                                        customStyles={customStyles}
                                                        pagination={true}
                                                        sortIcon={<DownSort />}
                                                    />
                                                </CRow>
                                                <br />
                                                {/* <CButton shape="rounded-0" style={{ marginLeft: '40%', color: '#AEC836', borderColor: '#AEC836', backgroundColor: '#24252f' }}
                                                    onClick={() => { setNext(1); setCsvArray([]) }}>
                                                    Cancel
                                                </CButton>
                                                <CButton shape="rounded-0" style={{ marginLeft: '2%', color: '#AEC836', borderColor: '#AEC836', backgroundColor: '#24252f' }}
                                                    onClick={() => { submitExcelData() }}>
                                                    Submit
                                                </CButton> */}
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                                    <CButton style={{
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        // width: '25%',
                                                        borderRadius: '0%',
                                                        backgroundColor: '#21252B',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        fontFamily: 'Roboto',
                                                        // flex: 1,
                                                    }}
                                                        onClick={() => { setNext(1); setCsvArray([]) }}
                                                    >Cancel</CButton>
                                                    {csvArray.length > 0 ?
                                                        <CButton style={{
                                                            backgroundColor: '#5AAD46',
                                                            // height: '40px',
                                                            // width: '25%',
                                                            color: 'white',
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            fontFamily: 'Roboto',
                                                            cursor: 'pointer',
                                                            // flex: 1,
                                                            borderRadius: '0%'
                                                        }}
                                                            onClick={() => { submitExcelData() }}
                                                        >Submit</CButton>
                                                        : <CButton disabled style={{
                                                            backgroundColor: '#5AAD46',
                                                            // height: '40px',
                                                            // width: '25%',
                                                            color: 'white',
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            fontFamily: 'Roboto',
                                                            cursor: 'pointer',
                                                            // flex: 1,
                                                            borderRadius: '0%'
                                                        }}>Submit</CButton>}
                                                </div>
                                            </>
                                            : <></>}
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                                {apiNext === 1 ? <>
                                    <CRow>
                                        <CCol>
                                            <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                    <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; API credentials
                                                </span>
                                                {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                    &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                </span> */}
                                            </CCard>
                                        </CCol>
                                        <CCol>
                                            <CCard className="p-0 default-Card h-100 border-top border-5" >
                                                <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                    <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Review and Submit
                                                </span>
                                                {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                    &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                </span> */}

                                            </CCard>
                                        </CCol>
                                    </CRow>
                                    <br />
                                    <br />
                                    <CInputGroup className="mb-3" style={{
                                        width: '20%', marginLeft: '35%',
                                        borderRadius: '0px'
                                    }}>
                                        {/* <CInputGroupText id="basic-addon1">@</CInputGroupText> */}
                                        <CFormInput placeholder="Paste API URL here" aria-label="Username"
                                            aria-describedby="basic-addon1" style={{ borderRadius: '0%' }} />
                                    </CInputGroup>
                                    <br />
                                    <CInputGroup className="mb-3" style={{ width: '20%', marginLeft: '35%' }}>
                                        <CFormInput placeholder="Paste API token here" aria-label="Username"
                                            aria-describedby="basic-addon1" style={{ borderRadius: '0%' }} />
                                    </CInputGroup>
                                    <br />
                                    <CButton shape="rounded-0" style={{
                                        marginLeft: '40%', color: '#AEC836', borderColor: '#AEC836',
                                        backgroundColor: '#24252f'
                                    }}>
                                        Validate
                                    </CButton>
                                    <span
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            padding: '20px',
                                            paddingRight: '10px',
                                            paddingTop: '100px'
                                        }}
                                    >

                                    </span>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <CButton style={{
                                            backgroundColor: '#5AAD46',
                                            // height: '40px',
                                            // width: '76px',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            fontFamily: 'Roboto',
                                            cursor: 'pointer',
                                            marginRight: '10%',
                                            // flex: 1,
                                            borderRadius: '0%'
                                        }}
                                            onClick={() => { setApiNext(2) }}
                                        >Next</CButton>
                                    </div>
                                </> :
                                    apiNext === 2 ?
                                        <><CRow>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; API credentials
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}
                                                </CCard>
                                            </CCol>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success " >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Review and Submit
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}

                                                </CCard>
                                            </CCol>
                                        </CRow>
                                            <br />
                                            <CRow>
                                                <DataTable
                                                    className="mt-2"
                                                    responsive
                                                    columns={[]}
                                                    data={[]}
                                                    customStyles={customStyles}
                                                    pagination={true}
                                                    sortIcon={<DownSort />}
                                                    // rowsPerPage={5}
                                                    itemsPerPage={5}
                                                />

                                            </CRow>
                                            <br />
                                            <CButton shape="rounded-0" style={{ marginLeft: '40%', color: '#AEC836', borderColor: '#AEC836', backgroundColor: '#24252f' }}>
                                                Submit
                                            </CButton>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton style={{
                                                    backgroundColor: '#5AAD46',
                                                    // height: '40px',
                                                    // width: '76px',
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    fontFamily: 'Roboto',
                                                    cursor: 'pointer',
                                                    marginRight: '10%',
                                                    // flex: 1,
                                                    borderRadius: '0%'
                                                }}
                                                    onClick={() => { setApiNext(1) }}
                                                >Back</CButton>
                                            </div>
                                        </> : <></>
                                }

                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                                {erpNext === 1 ?
                                    <>
                                        <CRow>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; ERP credentials
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}
                                                </CCard>
                                            </CCol>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5" >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Review and Submit
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}

                                                </CCard>
                                            </CCol>
                                        </CRow>
                                        <br />
                                        <br />
                                        <CInputGroup className="mb-3" style={{
                                            width: '20%', marginLeft: '35%',
                                            borderRadius: '0px'
                                        }}>
                                            <CFormInput placeholder="Client" aria-label="Username"
                                                aria-describedby="basic-addon1" style={{ borderRadius: '0%' }} />
                                        </CInputGroup>
                                        <br />
                                        <CInputGroup className="mb-3" style={{ width: '20%', marginLeft: '35%' }}>
                                            <CFormInput placeholder="UserID" aria-label="Username"
                                                aria-describedby="basic-addon1" style={{ borderRadius: '0%' }} />
                                        </CInputGroup>
                                        <br />
                                        <CInputGroup className="mb-3" style={{ width: '20%', marginLeft: '35%' }}>
                                            <CFormInput placeholder="Password" aria-label="Username"
                                                aria-describedby="basic-addon1" style={{ borderRadius: '0%' }} />
                                        </CInputGroup>
                                        <br />
                                        <CButton shape="rounded-0" style={{ marginLeft: '40%', color: '#AEC836', borderColor: '#AEC836', backgroundColor: '#24252f' }}>
                                            Submit
                                        </CButton>
                                        <span
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                padding: '20px',
                                                paddingRight: '10px',
                                                paddingTop: '100px'
                                            }}
                                        >

                                        </span>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <CButton style={{
                                                backgroundColor: '#5AAD46',
                                                // height: '40px',
                                                // width: '76px',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                fontFamily: 'Roboto',
                                                cursor: 'pointer',
                                                marginRight: '10%',
                                                // flex: 1,
                                                borderRadius: '0%'
                                            }}
                                                onClick={() => { setErpNext(2) }}
                                            >Next</CButton>
                                        </div>
                                    </> : <>
                                        <CRow>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>
                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferDown}></CIcon>  &nbsp; ERP credentials
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>
                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}
                                                </CCard>
                                            </CCol>
                                            <CCol>
                                                <CCard className="p-0 default-Card h-100 border-top border-5 border-top-success" >
                                                    <span style={{ fontSize: '16px', paddingTop: '11px' }}>

                                                        <CIcon style={{ color: '#5AAD46' }} icon={cilDataTransferUp}></CIcon> &nbsp; Review and Submit
                                                    </span>
                                                    {/* <span style={{ fontSize: '14px', color: '#A8A7A7' }}>

                                                        &nbsp; &nbsp; &nbsp; &nbsp;  Optional Label
                                                    </span> */}

                                                </CCard>
                                            </CCol>
                                        </CRow>
                                        <br />
                                        <CRow>
                                            <DataTable
                                                className="mt-2"
                                                responsive
                                                columns={[]}
                                                data={[]}
                                                customStyles={customStyles}
                                                pagination={true}
                                                sortIcon={<DownSort />}
                                                // rowsPerPage={5}
                                                itemsPerPage={5}
                                            />
                                        </CRow>
                                        <br />
                                        <CButton shape="rounded-0" style={{ marginLeft: '40%', color: '#AEC836', borderColor: '#AEC836', backgroundColor: '#24252f' }}>
                                            Submit
                                        </CButton>
                                        <span>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <CButton style={{
                                                    backgroundColor: '#5AAD46',
                                                    // height: '40px',
                                                    // width: '76px',
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    fontFamily: 'Roboto',
                                                    cursor: 'pointer',
                                                    marginRight: '10%',
                                                    // flex: 1,
                                                    borderRadius: '0%'
                                                }}
                                                    onClick={() => { setErpNext(1) }}
                                                >Back</CButton>
                                            </div>
                                        </span>
                                    </>
                                }
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CRow>

        </>
    )
}

export default DataManagement1
