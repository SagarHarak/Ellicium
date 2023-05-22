import React from 'react'
import PropTypes from 'prop-types'
import { CImage, CLink, CTooltip } from '@coreui/react-pro'
import helpicon from '../../../../assets/Help.png'

function ToolTip(props) {
  return (
    <CTooltip   className="rounded-0 lh-1  bg-dark p-2 w-25"  content={props.text}>
    <CLink> <CImage src={helpicon} style={{ height:'15px',width:'15px'}} ></CImage> </CLink>
  </CTooltip>
  )
}
ToolTip.propTypes = {
    currentValue: PropTypes.string,
    data: PropTypes.array,
    update: PropTypes.func,
    step:PropTypes.string,
    text: PropTypes.string,
    show: PropTypes.string,
    disable:PropTypes.string,
    last:PropTypes.bool,
    set: PropTypes.func,
  }
export default ToolTip