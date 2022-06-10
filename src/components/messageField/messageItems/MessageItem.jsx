
import React from 'react';
import cn from 'classnames';

export const MessageItem = ({message}) => {
    const { body, username, time } = message;
    const userId = JSON.parse(localStorage.getItem('userId'));
    const currentUsername = userId.username;
    const classNamesMessageField = cn(
        'px-3',
        'd-flex',
        'rounded-pill',
        'text-white',
        {
            'flex-row-reverse': username !== currentUsername,
            'green-light': username !== currentUsername,
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
        <div className='mb-2 text-break justify-content-start'>
            <span className={classNamesFlexContainer}>
                <b className='flex-shrink-0 align-self-end text-dark'>{username}</b>
                <b className='px-1 flex-shrink-0 align-self-end'> : </b>
                <span className={classNamesMessageField} style={ { 'maxWidth': '75%' } }>
                    { body }
                    <span className={classNamesDate}>
                        { time.hours }:{ time.minutes > 9 ? time.minutes : `0${time.minutes}`}
                    </span>
                </span>
            </span>
        </div>
    )
}