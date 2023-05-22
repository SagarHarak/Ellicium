import { cilInfo } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import PropTypes from 'prop-types'

function StepCard(props) {
  return (
    <>
      <CCard
        className={
          props.show
            ? 'p-0 default-Card h-100 border-top border-5 border-top-success'
            : 'p-0 default-Card h-100 border-top border-5 border-top-white'
        }
      >
        <span style={{ fontSize: '14px', color: '#A8A7A7', paddingTop: '9px' }}>{props.step}</span>
        <span style={{ fontSize: '16px', paddingTop: '11px' }}>{props.text}</span>
        {props.show?.length > 0 && (
          <>
            {props.last ? (
              <>
                {' '}
                <span style={{ paddingTop: '50px' }}>
                  <div
                    style={{
                      backgroundColor: '#5AAD46',
                      height: '40px',
                      width: '100%',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Roboto',
                      cursor: 'pointer',

                      flex: 1,
                    }}
                    className="d-flex justify-content-center align-items-center"
                    onClick={() => props.set((state) => !state)}
                  >
                    Edit Default Configurations
                  </div>
                </span>
                <span style={{ color: '#4B5A67', fontSize: '16px', paddingTop: '22.14px' }}>
                  <CIcon
                    icon={cilInfo}
                    alt="plus"
                    width={18}
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  Default values are set based on recommendations by experts. If you would like to
                  configure the risks further you can click the above button to view advance
                  settings.
                </span>
              </>
            ) : (
              <>
                <span style={{ paddingTop: '50px' }}>
                  <CFormSelect
                    value={props.currentValue}
                    onChange={(e) => props.update(e)}
                    className="dropdown-font "
                    disabled={props.disable}
                    options={props.data}
                  />
                </span>

                <span style={{ color: '#4B5A67', fontSize: '16px', paddingTop: '22.14px' }}>
                  <CIcon
                    icon={cilInfo}
                    alt="plus"
                    width={18}
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  Temporal risk pertains to volatility in the LMP at a specific location over time;
                  Risk associated with variation in a node or zone prices over time. Temporal risk
                  arises due to changes in electricity demand and fuel prices at a specific
                  location.
                </span>
              </>
            )}
          </>
        )}
      </CCard>
    </>
  )
}
StepCard.propTypes = {
  currentValue: PropTypes.string,
  data: PropTypes.array,
  update: PropTypes.func,
  step: PropTypes.string,
  text: PropTypes.string,
  show: PropTypes.string,
  disable: PropTypes.bool,
  last: PropTypes.bool,
  set: PropTypes.func,
}
export default StepCard
