/* eslint-disable react/prop-types */

import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.css'

const MainPopup = (props)=> {
    return (
        <>
            <Popup trigger={<span style={{ cursor:'pointer', fontWeight:'bold', fontSize:'20px'}}>...</span>}
                position="right top">
                <span style={{color:'black'}}>{props.data}</span>
            </Popup>
        </>
    )
};

export default MainPopup;