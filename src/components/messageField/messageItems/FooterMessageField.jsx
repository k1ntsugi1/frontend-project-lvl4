
import React, { useEffect, useRef, useState } from 'react';
import { useFormik  } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import {  
    actionsMessages,
    selectorsMessages,
} from '../../../slices/messagesSlice.js';

import { useSocket } from '../../../hooks/index.jsx';



const FooterMessageField = ({t}) => {
    const { socket } = useSocket();
    const [statusNetwork, setStatusNetwork] = useState('ok')
    const messageRef = useRef();
    const dispath = useDispatch()
    
    const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values, actions) => {
            socket.emit('newMessage', values, (socket) => {
                socket.status !== 'ok' ? setStatusNetwork('error') : setStatusNetwork('ok');
                return;
            })
            socket.once('newMessage', (messageWithId) => {
                const { id, message } = messageWithId;
                const newMessage = {
                    body: message,
                    channelId: currentActiveChannelId,
                    username: JSON.parse(localStorage.getItem('userId')).username, 
                    id,
                }
                dispath(actionsMessages.addMessage(newMessage));
                actions.resetForm( { message: '' } )
            })
        }
    });

    useEffect(() => {
        messageRef.current.focus();
    })

    return (
        <div className='mt-auto sticky-bottom px-5 py-3'>
            <Form noValidate className='p-0 border rounded-2' onSubmit={formik.handleSubmit}>
            <InputGroup>
                <Form.Control id="message"
                              name="message"
                              ref={messageRef}
                              type="text" 
                              placeholder={t("chatPage.placeholderInput")}
                              onChange={formik.handleChange}
                              value={formik.values.message}
                              className="border-0 p-0 ps-2"
                              isInvalid={statusNetwork === 'error'} />
                <Button className='border-0' 
                        variant="outline-primary"
                        type="submit"
                        disabled={formik.values.message === '' || formik.isSubmitting}>
                    ?
                </Button>
            </InputGroup>
        </Form>
        </div>
    )
}

export default withTranslation()(FooterMessageField);