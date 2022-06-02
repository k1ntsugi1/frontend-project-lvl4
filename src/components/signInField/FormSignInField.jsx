
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button} from 'react-bootstrap';
import { useRef, useEffect } from 'react';

const FormSignInField = ({t, formik, authError}) => {
    const usernameRef = useRef();
    const {
        handleSubmit, 
        handleChange,
        values,
        errors, 
        isSubmitting } = formik;
    //const { errorUsername, errorPassword, errorNetwork } = errorStore;
    useEffect( () => {
        usernameRef.current.focus();
    },[]);
    return (
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
                              isInvalid={!!errors.username }
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
                      	      placeholder={ t("signInForm.placeHolders.password") }
                      	      onChange={handleChange}
                      	      value={values.password}
                      	      isInvalid={!!errors.password || !!authError}
                />
                <Form.Label htmlFor="password">{ t("signInForm.placeHolders.password")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password || t(`signInForm.errorsValidating.${authError}`)}
                </Form.Control.Feedback>
            </Form.Group>
            <Button className="w-100" 
                    variant="outline-primary" 
                    type="submit" 
                    disabled={
                        isSubmitting
                     || !!errors.password 
                     || !!errors.password 
                    }
            >
                {t("signInForm.buttonSubmit")}
            </Button>
        </Form>
    )
}

export default withTranslation()(FormSignInField)