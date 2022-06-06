
import React from 'react';

export const MessageItem = ({message}) => {
    const { body, username } = message;
    return (
        <div className='text-break mb-2 justify-content-start'>
            <span className='d-flex'>
                <b className='text-dark flex-shrink-0 align-self-center pe-3'>{ username }: </b>
                <span className='rounded-pill bg-primary px-3 text-white'>{ body }</span>
            </span>
        </div>
    )
}