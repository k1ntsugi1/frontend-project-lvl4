
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
            const { data: token } = await axios.post('/api/v1/login', {
                username: values.username,
                password: values.password
            });
            localStorage.setItem('userId', token);
            const preveousPageHref = location.state.from.pathname;
            console.log(preveousPageHref);
            navigate(preveousPageHref, { replace: true, state: { from: location.pathname } } )
        }
    })
    return (
        <div className='container-fluid h-100'>
            <Card className='h-100 shadow-sm'>
                <Card.Body className='row justify-content-center align-content-center p-5'>
                <div className='col d-flex align-items-center justify-content-center'>here will be image</div>
                <Form className='col' onSubmit={formik.handleSubmit}>
                    <h2>{t("signInForm.header")}</h2>
                    <Form.Group className="mb-3">
                        <Form.Label className="sr-only" htmlFor="username">username</Form.Label>
                        <Form.Control id="username"
                                      name="username"
                                      type="text" 
                                      placeholder={ t("signInForm.placeHolders.userName") } 
                                      onChange={formik.handleChange}
                                      value={formik.values.username} />
                        {formik.errors.username && <Form.Text className='text-danger'>{formik.errors.username}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="sr-only" htmlFor="password">Password</Form.Label>
                        <Form.Control id="password"
                                      name="password"
                                      type="text"
                                      placeholder={ t("signInForm.placeHolders.password") }
                                      onChange={formik.handleChange}
                                      value={formik.values.password}/>
                        {formik.errors.password && <Form.Text className='text-danger'>{formik.errors.password}</Form.Text>}
                    </Form.Group>
                        <Button variant="primary" type="submit" className={ (formik.errors.username || formik.errors.password) ? 'disabled' : null }>{t("signInForm.buttonSubmit")}</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <div className='text-center'>
                    {t("signInForm.footer.labelSignUp")}
                    <a href='#'>{t("signInForm.footer.hrefToSignUp")}</a>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
} 

export default withTranslation()(SignIn);
