import React from 'react'
import "./WhatApp.css"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton } from '@mui/material';

const WhatApp = () => {
    return (
        <div className='whatsApp'>
         <a href="https://wa.me/message/RVVZMCKQGHOCG1" target={"_blank"} rel="noreferrer" >
            <IconButton>
                <WhatsAppIcon />
            </IconButton>
            </a>  
        </div>
    )
}

export default WhatApp