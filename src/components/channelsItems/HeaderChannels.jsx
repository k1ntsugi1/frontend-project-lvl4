
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import DefaultModal from '../DefaultModal.jsx';
import { useModal } from "../../hooks/index.jsx"

const HeaderChannels = ({t}) => {
    const {show, handleShow} = useModal();

    return (
      <>
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{ t("chatPage.channelsHeader") }</span>
          <Button variant="outline-info p-0" onClick={handleShow('showAddChannelModal')}>+</Button>
        </div>
         { show.showAddChannelModal 
           ? <DefaultModal impact={{ type: 'showAddChannelModal', value: null }} /> 
           
           
           : null }
       </>
    )
}

export default withTranslation()(HeaderChannels)