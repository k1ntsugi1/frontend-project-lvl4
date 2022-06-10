
import React, { useRef, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button} from 'react-bootstrap';


const FormSignUpField = ({t, formik, authError}) => {
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
          	<h1 className='text-center mb-4'>{t("signUpForm.header")}</h1>

            <Form.Group className="mb-4 form-floating">
                <Form.Control id="username"
                              name="username"
                              type="text" 
                              ref={usernameRef}
                              placeholder={ t("signUpForm.placeHolders.username") } 
                              onChange={handleChange}
                              value={values.username}
                              isInvalid={!!errors.username }
                              className="rounded-3"
                />
                <Form.Label htmlFor="username">{t("signUpForm.usernameField")}</Form.Label>
        		<Form.Control.Feedback type="invalid" tooltip>
  	         	    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4 form-floating">
                <Form.Control id="password"
                    		  name="password"
      						  type="password"
                      	      placeholder={ t("signUpForm.placeHolders.password") }
                      	      onChange={handleChange}
                      	      value={values.password}
                      	      isInvalid={!!errors.password}
                              className="rounded-3"
                />
                <Form.Label htmlFor="password">{ t("signUpForm.passwordField")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4 form-floating">
                <Form.Control id="confirmPassword"
                    		  name="confirmPassword"
      						  type="password"
                      	      placeholder={ t("signUpForm.placeHolders.confirmPassword") }
                      	      onChange={handleChange}
                      	      value={values.confirmPassword}
                      	      isInvalid={!!errors.confirmPassword || !!authError}
                              className="rounded-3"
                />
                <Form.Label htmlFor="confirmPassword">{ t("signUpForm.confirmPasswordField")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.confirmPassword || t(`signUpForm.errorsValidating.${authError}`)}
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="w-100" 
                    variant="outline-success" 
                    type="submit" 
                    disabled={
                        isSubmitting
                    }
            >
                {t("signUpForm.buttonSubmit")}
            </Button>
        </Form>
    )
}

export default withTranslation()(FormSignUpField)