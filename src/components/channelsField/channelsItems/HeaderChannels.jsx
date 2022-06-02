
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import DefaultModal from '../../modals/DefaultModal.jsx';
import { useModal } from "../../../hooks/index.jsx"

const HeaderChannels = ({t}) => {
    const {showState, handleShow} = useModal();

    return (
      <>
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{ t("chatPage.channelsHeader") }</span>
          <Button variant="outline-info p-0" onClick={handleShow('addChannelModal')}>+</Button>
        </div>
         { showState.addChannelModal 
           ? <DefaultModal impact={{ type: 'addChannelModal', value: null }} /> 
           : null }
       </>
    )
}

export default withTranslation()(HeaderChannels)