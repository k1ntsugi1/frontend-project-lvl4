
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Button} from 'react-bootstrap';
import { useRef, useEffect } from 'react';

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

            <Form.Group className="mb-3 form-floating">
                <Form.Control id="username"
                              name="username"
                              type="text" 
                              ref={usernameRef}
                              placeholder={ t("signUpForm.placeHolders.userName") } 
                              onChange={handleChange}
                              value={values.username}
                              isInvalid={!!errors.username }
                />
                <Form.Label htmlFor="username">{t("signUpForm.placeHolders.userName")}</Form.Label>
        		<Form.Control.Feedback type="invalid" tooltip>
  	         	    {errors.username}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 form-floating">
                <Form.Control id="password"
                    		  name="password"
      						  type="password"
                      	      placeholder={ t("signUpForm.placeHolders.password") }
                      	      onChange={handleChange}
                      	      value={values.password}
                      	      isInvalid={!!errors.password}
                />
                <Form.Label htmlFor="password">{ t("signUpForm.placeHolders.password")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 form-floating">
                <Form.Control id="confirmPassword"
                    		  name="confirmPassword"
      						  type="password"
                      	      placeholder={ t("signUpForm.placeHolders.repeatedPassword") }
                      	      onChange={handleChange}
                      	      value={values.confirmPassword}
                      	      isInvalid={!!errors.confirmPassword || !!authError}
                />
                <Form.Label htmlFor="password">{ t("signUpForm.placeHolders.confirmPassword")}</Form.Label>
                <Form.Control.Feedback type="invalid" tooltip>
                    {errors.confirmPassword || t(`signUpForm.errorsValidating.${authError}`)}
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="w-100" 
                    variant="outline-primary" 
                    type="submit" 
                    disabled={
                        isSubmitting
                     || !!errors.username 
                     || !!errors.password
                     || !!errors.confirmPassword 
                    }
            >
                {t("signUpForm.buttonSubmit")}
            </Button>
        </Form>
    )
}

export default withTranslation()(FormSignUpField)