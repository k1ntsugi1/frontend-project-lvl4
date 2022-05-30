
import React, { useEffect, useRef, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { Formik, useFormikContext  } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';
import {
    useLocation,
    useNavigate,
  } from "react-router-dom";
import { useImmer } from "use-immer";



const SignIn = ({t}) => {
    const auth = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect( () => {
        usernameRef.current.focus();
    },[]);

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

    return (
    	<>
  	    <Formik
          initialValues={ {username: "", password: ""} }
          validationSchema={ signInSchema}
          onSubmit={ async (values, actions) => {
            const { data: userId } = await axios.post(routes['loginPath'](), {
              username: values.username,
              password: values.password
            });
            //actions.resetForm({});
            localStorage.setItem('userId', JSON.stringify(userId));
            auth.logIn();
            const preveousPage = location.state ? location.state.from.pathname : '/';
            navigate(preveousPage, { replace: true, state: { from: location.pathname } } )
            }}
        >
          {({handleSubmit, isSubmitting, handleChange, values, errors}) => (
            <div className='container-fluid h-100'>
            <div className='row justify-content-center align-content-center h-100'>
              <div className='col-12 col-md-8 col-xxl-6'>
                <Card className='shadow-sm'>
                  <Card.Body className='row p-5'>
                    <div className='col d-flex align-items-center justify-content-center'>
											<img src="https://raw.githubusercontent.com/k1ntsugi1/layout-designer-project-lvl1/main/src/assets/images/2.png" className='img-fluid rounded-circle' alt="Enter"/>
										</div>
                    <Form noValidate  className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={handleSubmit}>
          	          <h1 className='text-center mb-4'>{t("signInForm.header")}</h1>
            	        <Form.Group className="mb-3 form-floating">
                        <Form.Control id="username"
                                      name="username"
                              		    type="text" 
                                      ref={usernameRef}
          	                          placeholder={ t("signInForm.placeHolders.userName") } 
                                      onChange={handleChange}
                                      value={values.username}
                                      isInvalid={!!errors.username}
                        />
              				  <Form.Label htmlFor="username">{t("signInForm.placeHolders.userName")}</Form.Label>
        		            <Form.Control.Feedback type="invalid" tooltip>
  	         	            {errors.username}
                         </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3 form-floating">
                      	<Form.Control id="password"
                    								  name="password"
      						    	              type="text"
                      	              ref={passwordRef}
                      	              placeholder={ t("signInForm.placeHolders.password") }
                      	              onChange={handleChange}
                      	              value={values.password}
                      	              isInvalid={!!errors.password}
                      	/>
                      	<Form.Label htmlFor="password">{ t("signInForm.placeHolders.password")}</Form.Label>
                      	<Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                      	</Form.Control.Feedback>
                  		</Form.Group>
                      <Button className="w-100" variant="outline-primary" type="submit" disabled={isSubmitting}>{t("signInForm.buttonSubmit")}</Button>
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
          )}
        </Formik>
    </>
  )
} 

export default withTranslation()(SignIn);
