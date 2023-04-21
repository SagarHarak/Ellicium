import { CCardBody, CCardHeader, CFormRange, CFormSelect, CMultiSelect } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function ModalDropDown(props) {
  const [id, setId] = useState()
  const [value, setValue] = useState()
  let newdata = props.data.slice(1, props.data.length)
  useEffect(() => {
    setId(newdata[0].id)
  }, [])
  const submit = () => {
    props.close((state) => !state)
  }

  const edit=(value,id)=>{
    props.set(new Map(props.currentValue.set(id, value)));

  }
  return (
    <>
      <CCardBody className="p-2">
        <CCardHeader>
          <span className="cardtitle">{newdata[0].risk_category}</span>
          <br />
          <span style={{ fontSize: '16px', color: '#4B5A67' }}>{newdata[0].risk_type}</span>
        </CCardHeader>
        <span style={{ display: 'flex', paddingTop: '20px', flexDirection: 'column' }}>
          <table>
            {newdata.map((item, key) => (
              <tbody key={key}>
                {item.type === 'range' ? (
                  <tr style={{ width: '100%' }}>
                    <td className="py-4 px-4">
                      <span style={{ fontSize: '16px' }}>{item.name}</span>
                    </td>
                    <td>
                      <div
                        className="range customtooltip"
                        style={{
                          '--step':
                            Number(item.options.split(',')[item.options.split(',').length - 1]) /
                            10,
                          '--min': Number(item.options.split(',')[0]),
                          '--max': Number(
                            item.options.split(',')[item.options.split(',').length - 1],
                          ),
                        }}
                      >
                        {value && (
                          <span className="customtooltiptext">{value ? value : item.value}</span>
                        )}
                        <CFormRange
                          min={Number(item.options.split(',')[0])}
                          max={Number(item.options.split(',')[item.options.split(',').length - 1])}
                          step="0.5"
                          defaultValue={Number(item.value)}
                          id="customRange1"
                          onChange={(e) => {
                            edit(e.target.value,item.id)
                            setValue(e.target.value)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className=" py-4">
                      <span style={{ fontSize: '16px' }}>{item.name}</span>
                    </td>
                    <td>
                      <span>
                        <CFormSelect
                          onChange={(e)=>edit(e.target.value,item.id)}
                          className="dropdown-font"
                          //  disabled={props.disable}
                          required
                          options={[{ label: 'Select a value' }, ...item.options.split(',')]}
                        />
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
          </table>
        </span>

        <span
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: '20px',
            paddingRight: '10px',
            paddingTop: '25px',
          }}
        >
          <span>
            <div
              style={{
                backgroundColor: '#21252B',
                height: '40px',
                width: '152px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Roboto',
                cursor: 'pointer',

                flex: 1,
              }}
              className="d-flex justify-content-center align-items-center"
              onClick={() => props.close((state) => !state)}
            >
              Cancel
            </div>
          </span>
          <span>
            <div
              style={{
                backgroundColor: '#5AAD46',
                height: '40px',
                width: '152px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Roboto',
                cursor: 'pointer',

                flex: 1,
              }}
              className="d-flex justify-content-center align-items-center"
              onClick={submit}
            >
              Save
            </div>
          </span>
        </span>
      </CCardBody>
    </>
  )
}
ModalDropDown.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
  options: PropTypes.array,
  set: PropTypes.func,
  risk_category: PropTypes.string,
  risk_type: PropTypes.string,
  close: PropTypes.func,
  currentValue: PropTypes.object,
}

export default ModalDropDown
