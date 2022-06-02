

import React, { useEffect, useRef, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { useFormik  } from 'formik';
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
import { useImmer } from 'use-immer';

const SignUpPage = ({t}) => {

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

    const handlerRequest = async (values) => {
        try {
          const response = await axios.post(routes['loginPath'](), {
            username: values.username,
            password: values.password,
            repeatedPassword: values.repeatedPassword
          });
          handlerResponse(response, 'valid')
        } catch (e) {
          const { response } = e;
          console.log(response)
          handlerResponse(response, 'invalid')
        }
      };

    const formik = useFormik({
        initialValues:  { username: "", password: "", repeatedPassword: "" },
        validationSchema:  signInSchema,
        onSubmit: handlerRequest
    })

    return (
        <div className='container-fluid h-100'>
          <div className='row justify-content-center align-content-center h-100'>
            <div className='col-12 col-md-8 col-xxl-6'>
              <Card className='shadow-sm'>
                <CardBodySignInfield>
                 <FormSignUpField formik={formik} authError={authStore.authError}/>   
                </CardBodySignInfield>
              </Card>
            </div>        
          </div>
        </div>  
    )
}

export default withTranslation()(SignUpPage)