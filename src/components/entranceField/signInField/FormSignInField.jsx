
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

    useEffect( () => {
        usernameRef.current.focus();
    },[]);
    
    return (
        <Form noValidate  className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={handleSubmit}>
          	<h1 className='text-center mb-4'>{t("signInForm.header")}</h1>

            <Form.Group className="mb-4 form-floating">
                <Form.Control id="username"
                              name="username"
                              type="text" 
                              ref={usernameRef}
                              placeholder={ t("signInForm.placeHolders.username") } 
                              onChange={handleChange}
                              value={values.username}
                              isInvalid={!!errors.username }
                              className="rounded-3"
                />
                <Form.Label htmlFor="username">{t("signInForm.usernameField")}</Form.Label>
        		<Form.Control.Feedback type="invalid" tooltip>
  	         	    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4 form-floating">
                <Form.Control id="password"
                    		  name="password"
      						  type="password"
                      	      placeholder={ t("signInForm.placeHolders.password") }
                      	      onChange={handleChange}
                      	      value={values.password}
                      	      isInvalid={!!errors.password || !!authError}
                              className="rounded-3"
                />
                <Form.Label htmlFor="password">{ t("signInForm.passwordField")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password || t(`signInForm.errorsValidating.${authError}`)}
                </Form.Control.Feedback>
            </Form.Group>
            <Button className="w-100" 
                    variant="outline-success" 
                    type="submit" 
                    disabled={
                        isSubmitting
                    }
            >
                {t("signInForm.buttonSubmit")}
            </Button>
        </Form>
    )
}

export default withTranslation()(FormSignInField)