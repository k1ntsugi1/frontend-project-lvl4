
import React, { useEffect, useRef, useState } from 'react';
import { useFormik  } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

import toastes from '../../../toastes/toastes.js';
import { useSelector } from "react-redux";

import { useSocket } from '../../../hooks/index.jsx';

let filter = require("leo-profanity");

const FooterMessageField = ({t}) => {
    const { socket } = useSocket();
    const messageRef = useRef();
    const currentActiveChannelId = useSelector( (store) => store.activeChannel.currentChannelId);
    
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values, actions) => {
            const filteredMessage = filter.clean(values.message)
            socket.emit('newMessage', { message: filteredMessage, channelId: currentActiveChannelId }, (response) => {
                toastes["errorNetwork"](t);
                return;
            })
            actions.resetForm( { message: '' } )
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
                 />
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