
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
import CardFooterSignInField from '../components/entranceField/signInField/CardFooterSignInField.jsx'
import FormSignInField from '../components/entranceField/signInField/FormSignInField.jsx';

import ajaxStore from '../components/entranceField/ajaxStore.js';

import { getSignInSchema } from '../components/entranceField/signInField/signInSchema.js';
import { handlerLogin } from '../components/entranceField/handlerLogin.js';

import { actionsUiNavBar } from "../slices/UiNavbarSlice.js";


const SignInPage = ({t}) => {
  
    const { getStartAjaxState, handlerResponse, handlerRequest  } = ajaxStore;
    const auth = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const startStateImmer = getStartAjaxState();
    const signInSchema = getSignInSchema(t);

    const [authStore, updateAuthStore] = useImmer(startStateImmer);

    const formik = useFormik({
      initialValues:  { username: "", password: "" },
      validationSchema:  signInSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values) => handlerRequest(values, 'loginPath', handlerResponse, updateAuthStore)
    })

    useEffect( () => {
      if (authStore.authData !== null) handlerLogin(location, navigate, auth, authStore);
    }, [authStore.validateAuthCounter]);

    useEffect( () => {
      dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'signin'}))
    }, [])

    return (
    	<CardField>
        <CardBodyField imagePath="https://raw.githubusercontent.com/k1ntsugi1/layout-designer-project-lvl1/main/src/assets/images/2.png">
          <FormSignInField formik={formik} authError={authStore.authError}/>   
        </CardBodyField>
        <CardFooterSignInField />
      </CardField>
  )
} 

export default withTranslation()(SignInPage);
