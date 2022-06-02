
import React, { useEffect, useRef, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { Formik, useFormik  } from 'formik';
import { Button, Form, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import CardBodySignInfield from '../components/signInField/CardBodySignInField.jsx';
import CardFooterSignInField from '../components/signInField/CardFooterSignInField.jsx';
import FormSignInField from '../components/signInField/FormSignInField.jsx';
import { useImmer } from 'use-immer';


const SignIn = ({t}) => {
    const auth = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [authStore, updateAuthStore] = useImmer({ 
      authData: null,
      authError: null,
      validateAuthCounter: 0,
    });

    const handlerResponse = (response, status) => {
      switch (status) {
        case 'valid' : {
          console.log(response.data);
          updateAuthStore( (draft) => {
            draft.authData = response.data;
            draft.authError = null;
            draft.validateAuthCounter += 1;
          });
          break;
        }
        case 'invalid': {
          updateAuthStore( (draft) => {
            draft.authData = null;
            draft.authError = response.data.error;
            draft.validateAuthCounter += 1;
          });
          break;
        }
        default: {
          throw new Error(`not available status: ${status}`)
        }
      }
    };

    Yup.setLocale({
        mixed: {
            required: t("signInForm.errorsValidating.required"),
        },
        string: {
            min: t("signInForm.errorsValidating.short"),
            max: t("signInForm.errorsValidating.long"),
        }
    });

    const handlerRequest = async (values) => {
      try {
        const response = await axios.post(routes['loginPath'](), {
          username: values.username,
          password: values.password
        });
        handlerResponse(response, 'valid')
      } catch (e) {
        const { response } = e;
        console.log(response)
        handlerResponse(response, 'invalid')
      }
    };
    
    const signInSchema= Yup.object().shape({
      username: Yup.string().min(3).max(20).required(),
      password: Yup.string().min(1).max(6).required(),
    })

    const formik = useFormik({
      initialValues:  { username: "", password: "" },
      validationSchema:  signInSchema,
      onSubmit: handlerRequest
      })

    const handlerLogin = () => {
      console.log(authStore.authData)
      localStorage.setItem('userId', JSON.stringify(authStore.authData));
      auth.logIn();
      const preveousPage = location.state ? location.state.from.pathname : '/';
      navigate(preveousPage, { replace: true, state: { from: location.pathname } } )
    };

    useEffect( () => {
      console.log(authStore, 'handlerLogin')
      if (authStore.authData !== null) handlerLogin();
    }, [authStore.validateAuthCounter])

    return (
    	<>
        <div className='container-fluid h-100'>
          <div className='row justify-content-center align-content-center h-100'>
            <div className='col-12 col-md-8 col-xxl-6'>
              <Card className='shadow-sm'>
                <CardBodySignInfield>
                 <FormSignInField formik={formik} authError={authStore.authError}/>   
                </CardBodySignInfield>
                <CardFooterSignInField />
              </Card>
            </div>        
          </div>
        </div>  
      </>
  )
} 

export default withTranslation()(SignIn);
