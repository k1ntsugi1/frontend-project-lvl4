
import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next';
import { useFormik  } from 'formik';
import { useImmer } from 'use-immer';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useAuth } from '../hooks/index.jsx';

import CardField from '../components/entranceField/CardField.jsx';
import CardBodyField from '../components/entranceField/CardBodyField.jsx';
import FormSignUpField from '../components/entranceField/signUpField/FormSignUpField.jsx'

import ajaxStore from '../components/entranceField/ajaxStore.js';

import { getSignUpSchema } from '../components/entranceField/signUpField/signUpSchema.js'
import { handlerLogin } from '../components/entranceField/handlerLogin.js';

import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";

const SignUpPage = ({t}) => {
  
  const { getStartAjaxState, handlerResponse, handlerRequest  } = ajaxStore;
  const auth = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const startStateImmer = getStartAjaxState();
  const signUpSchema = getSignUpSchema(t);

  const [authStore, updateAuthStore] = useImmer(startStateImmer);

  const formik = useFormik({
    initialValues:  { username: "", password: "", confirmPassword: "" },
    validationSchema:  signUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handlerRequest(values, 'signUpPath', handlerResponse, updateAuthStore)
  })

  useEffect( () => {
    if (authStore.authData !== null) handlerLogin(location, navigate, auth, authStore);
  }, [authStore.validateAuthCounter])

  useEffect( () => {
    dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'signup'}))
  }, [])

    return (
      <CardField>
        <CardBodyField imagePath='null'>
          <FormSignUpField formik={formik} authError={authStore.authError}/>   
        </CardBodyField>
      </CardField>

    )
}

export default withTranslation()(SignUpPage)