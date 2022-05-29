
import React from 'react'
import { withTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';
import {
    useLocation,
    useNavigate,
  } from "react-router-dom";

import Popup from 'reactjs-popup';


const SignIn = ({t}) => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    Yup.setLocale({
        mixed: {
            required: t("signInForm.errorsValidating.required"),
        },
        string: {
            min: t("signInForm.errorsValidating.short"),
            max: t("signInForm.errorsValidating.long"),
        }
    })
    
    const signInSchema= Yup.object().shape({
        username: Yup.string().min(2).max(10).required(),
        password: Yup.string().min(2).max(10).required(),
    })

    const formik = useFormik({
        initialValues: {username: "", password: ""},
        validationSchema: signInSchema,
        onSubmit: async (values) => {
            const { data: token } = await axios.post(routes['loginPath'](), {
                username: values.username,
                password: values.password
            });
            localStorage.setItem('userId', JSON.stringify(token));
            auth.logIn();

            const preveousPageHref = location.state.from.pathname;
            navigate(preveousPageHref, { replace: true, state: { from: location } } )
        }
    })
    return (
    <div className='container-fluid h-100'>
    <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
            <Card className='shadow-sm'>
                <Card.Body className='row p-5 m-4'>
                    <div className='col d-flex align-items-center justify-content-center'>here will be image</div>
                    <Form className='col' onSubmit={formik.handleSubmit}>
                        <h1 className='text-center'>{t("signInForm.header")}</h1>
                        <Form.Group className="mb-3 form-floating">
                            <Form.Control id="username"
                                      name="username"
                                      type="text" 
                                      placeholder={ t("signInForm.placeHolders.userName") } 
                                      onChange={formik.handleChange}
                                      value={formik.values.username} />
                            <Form.Label htmlFor="username">{t("signInForm.placeHolders.userName")}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3 form-floating">
                            <Form.Control id="password"
                                      name="password"
                                      type="text"
                                      placeholder={ t("signInForm.placeHolders.password") }
                                      onChange={formik.handleChange}
                                      value={formik.values.password}/>
                            <Form.Label htmlFor="password">{ t("signInForm.placeHolders.password")}</Form.Label>
                        </Form.Group>
                        <Popup trigger={
                                <Button className="w-100" variant="outline-primary" type="submit">{t("signInForm.buttonSubmit")}</Button>
                               }
                               position='bottom'
                               on={['hover', 'focus']}
                               contentStyle={{ marginTop: '5px',
                                               padding: "0 5px 0 5px",
                                               color: 'white',
                                               textAlign: 'center',
                                               backgroundColor: '#ff0000',
                                               borderRadius: '10px',
                                               opacity: '90%' }}>
                            {formik.errors.username && <div>{t("signInForm.usernameField")}: { formik.errors.username }</div>} 
                            {formik.errors.password && <div>{t("signInForm.passwordField")}: { formik.errors.password }</div>}
                        </Popup>
                        
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <div className='text-center'>
                        <span>{t("signInForm.footer.labelSignUp")}</span>{' '}
                        <a href='#'>{t("signInForm.footer.hrefToSignUp")}</a>
                        </div>
                    </Card.Footer>
            </Card>
        </div>
    </div>
    </div>
    )
} 

export default withTranslation()(SignIn);
