
import React from 'react';
import cn from 'classnames';

export const MessageItem = ({message}) => {
    const { body, username } = message;
    const userId = JSON.parse(localStorage.getItem('userId'));
    const currentUsername = userId.username;
    const classNamesMessageField = cn(
        'rounded-pill',
        'px-3',
        'text-white',
        {
            'blue-light': username !== currentUsername,
            'bg-primary': username === currentUsername
        });
    const classNamesFlexContainer = cn(
            'd-flex',
            {
                'flex-row-reverse': username === currentUsername
            });
    return (
        <div className='text-break mb-2 justify-content-start'>
            <span className={classNamesFlexContainer}>
                <b className='text-dark flex-shrink-0 align-self-center'>{username}</b>
                <b className='flex-shrink-0 align-self-center px-1'> : </b>
                <span className={classNamesMessageField} style={ { 'max-width': '50%' } }>{ body }</span>
            </span>
        </div>
    )
}