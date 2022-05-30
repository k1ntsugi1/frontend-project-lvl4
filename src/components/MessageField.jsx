

import React from 'react';
import { HeaderMessageField } from './messageItems/HeaderMessageField.jsx';
import { BodyMessageField } from './messageItems/BodyMessageField.jsx'
import FooterMessageField from './messageItems/FooterMessageField.jsx'
export const MessageField = () => {
    return (
        <div className='col p-0 h-100'>
            <div className='d-flex flex-column h-100'>
                <HeaderMessageField/>
                <BodyMessageField/>
                <FooterMessageField />
            </div>
        </div>
    )
}