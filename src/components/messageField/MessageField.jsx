

import React from 'react';

import HeaderMessageField from './messageItems/HeaderMessageField.jsx';
import { BodyMessageField } from './messageItems/BodyMessageField.jsx'
import FooterMessageField from './messageItems/FooterMessageField.jsx'

export const MessageField = () => {

    return (
        <div className='p-0 col h-100 bg-white'>
            <div className='d-flex flex-column h-100'>
                <HeaderMessageField/>
                <BodyMessageField/>
                <FooterMessageField/>
            </div>
        </div>
    )
}