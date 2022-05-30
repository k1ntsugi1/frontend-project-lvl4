
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { withTranslation } from 'react-i18next';

const Prompt = ({t}) => {

    return (
        <div className="me-2" >
            <Popup trigger={
                    <Button variant="outline-secondary" className='rounded-circle'>?</Button>
                    }
                    position='bottom'
                    on={['hover', 'focus']}
                    contentStyle={{ marginTop: '2px',
                             padding: "2px",
                             color: '#00022f',
                             textAlign: 'center',
                             backgroundColor: '#e8e8e8',
                             borderRadius: '10px',
                             opacity: '90%' }}>
                <div>
                    Prompt    
                </div>              
            </Popup>
      </div>
    )
}

export default withTranslation()(Prompt);