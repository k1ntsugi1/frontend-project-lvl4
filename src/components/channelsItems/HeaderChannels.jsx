
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import DefaultModal from '../DefaultModal.jsx';

const HeaderChannels = ({t}) => {
  // не нравится что нжуно вводить два состояния здесь и на модалке причем одинаоквых

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

    return (
      <>
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{ t("chatPage.channelsHeader") }</span>
          <Button variant="outline-info p-0" onClick={handleShow}>+</Button>
        </div>
         { show 
           ? <DefaultModal title='addingChannel' /> 
           : null }
       </>
    )
}

export default withTranslation()(HeaderChannels)