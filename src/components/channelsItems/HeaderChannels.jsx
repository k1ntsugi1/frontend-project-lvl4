
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import DefaultModal from '../DefaultModal.jsx';
import { useModal } from "../../hooks/index.jsx"

const HeaderChannels = ({t}) => {
    const modal = useModal();

    return (
      <>
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{ t("chatPage.channelsHeader") }</span>
          <Button variant="outline-info p-0" onClick={modal.handleShow}>+</Button>
        </div>
         { modal.show 
           ? <DefaultModal title='addingChannel' /> 
           : null }
       </>
    )
}

export default withTranslation()(HeaderChannels)