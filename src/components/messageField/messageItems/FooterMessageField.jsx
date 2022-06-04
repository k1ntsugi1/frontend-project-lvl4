
import React, { useEffect, useRef} from 'react';
import { useFormik  } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

import toastes from '../../../toastes/toastes.js';
import { useSelector } from "react-redux";

import { useSocket, useBadWords } from '../../../hooks/index.jsx';

const FooterMessageField = ({t}) => {
    const { socket } = useSocket();
    const { filterBadWords } = useBadWords()
    const messageRef = useRef();
    const currentActiveChannelId = useSelector( (store) => store.activeChannel.currentChannelId);
    
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: (values, actions) => {
            const filteredMessage = filterBadWords.clean(values.message)
            if(filterBadWords.check(values.message)) toastes["badWord"](t)

            socket.emit('newMessage', { message: filteredMessage, channelId: currentActiveChannelId }, (response) => {
                if(response.status !== 'ok') {
                    toastes["errorNetwork"](t);
                    //return;
                }
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
                <Button className=' btn-group-vertical' 
                        variant="outline-info"
                        type="submit"
                        disabled={formik.values.message === '' || formik.isSubmitting}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                        </path>
                    </svg>
                    <span className="visually-hidden">send</span>  
                </Button>
            </InputGroup>
        </Form>
        </div>
    )
}

export default withTranslation()(FooterMessageField);