
import React, { useEffect, useRef } from 'react';
import { useFormik  } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import {  
    actionsMessages,
    selectorsMessages,
} from '../../slices/messagesSlice.js';

const FooterMessageField = ({t}) => {
    const messageRef = useRef();

    const formik = useFormik({
        initialValues: {
            currentMessage: '',
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    useEffect(() => {
        messageRef.current.focus();
    })
    return (
        <div className='mt-auto sticky-bottom px-5 py-3'>
            <Form className='p-0 border rounded-2' onSubmit={formik.handleSubmit}>
            <InputGroup>
                <Form.Control id="message"
                              name="message"
                              ref={messageRef}
                              type="text" 
                              placeholder={t("chatPage.placeholderInput")}
                              onChange={formik.handleChange}
                              value={formik.currentMessage}
                              className="border-0 p-0 ps-2" />
                <Button className='border-0' variant="outline-primary" type="submit">?</Button>
            </InputGroup>
        </Form>
        </div>
    )
}

export default withTranslation()(FooterMessageField);