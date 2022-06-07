
import React from 'react';
import cn from 'classnames';

export const MessageItem = ({message}) => {
    const { body, username } = message;
    const userId = JSON.parse(localStorage.getItem('userId'));
    const currentUsername = userId.username;
    const date = new Date();
    const classNamesMessageField = cn(
        'rounded-pill',
        'px-3',
        'text-white',
        'd-flex',
        {
            'green-light': username !== currentUsername,
            'flex-row-reverse': username !== currentUsername,
            'bg-primary': username === currentUsername
        });
    const classNamesFlexContainer = cn(
            'd-flex',
            {
                'flex-row-reverse': username === currentUsername
            });
    const classNamesDate = cn('small', 'align-self-end', 'flex-shrink-0', 'opacity-75', {
        'ps-2': username === currentUsername,
        'pe-2': username !== currentUsername,
    });
    return (
        <div className='text-break mb-2 justify-content-start'>
            <span className={classNamesFlexContainer}>
                <b className='text-dark flex-shrink-0 align-self-end'>{username}</b>
                <b className='flex-shrink-0 align-self-end px-1'> : </b>
                <span className={classNamesMessageField} style={ { 'maxWidth': '50%' } }>
                    { body }
                    <span className={classNamesDate}>
                        { date.getHours() }:{date.getMinutes()}
                    </span>
                </span>
            </span>
        </div>
    )
}