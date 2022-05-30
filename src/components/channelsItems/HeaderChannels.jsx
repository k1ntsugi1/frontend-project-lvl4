
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const HeaderChannels = ({t}) => {
    return (
        <div className='d-flex justify-content-between mb-2 ps-4 pe-2'>
          <span>{ t("chatPage.channelsHeader") }</span>
          <Button variant="outline-info p-0">+</Button>
        </div>
    )
}

export default withTranslation()(HeaderChannels)