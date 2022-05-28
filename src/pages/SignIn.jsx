
import React from 'react'
import { withTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form, FormGroup, FormLabel, FormControl, Card } from 'react-bootstrap';
import * as Yup from 'yup';


const SignIn = ({t}) => {

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
        name: Yup.string().min(2).max(10).required(),
        password: Yup.string().min(2).max(10).required(),
    })

    const formik = useFormik({
        initialValues: {userName: "", password: ""},
        validationSchema: signInSchema,
        onSubmit: values => { console.log(values) }
    })
    return (
        <div className='container-fluid h-100'>
            <Card className='h-100 shadow-sm'>
                <Card.Body className='row justify-content-center align-content-center p-5'>
                <div className='col d-flex align-items-center justify-content-center'>here will be image</div>
                <Form className='col' onSubmit={formik.handleSubmit}>
                    <h2>{t("signInForm.header")}</h2>
                    <FormGroup className="mb-3">
                        <FormLabel className="sr-only" htmlFor="userName">userName</FormLabel>
                        <FormControl  id="userName"
                                      name="userName"
                                      type="text" 
                                      placeholder={ t("signInForm.placeHolders.userName") } 
                                      onChange={formik.handleChange}
                                      value={formik.values.userName} />
                        {formik.touched.userName && formik.errors.userName ? 
                            (<div>{formik.errors.userName}</div>) : null}
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel className="sr-only" htmlFor="password">Password</FormLabel>
                        <FormControl  id="password"
                                      name="password"
                                      type="text"
                                      placeholder={ t("signInForm.placeHolders.password") }
                                      onChange={formik.handleChange}
                                      value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? 
                            (<div>{formik.errors.password}</div>) : null}
                    </FormGroup>
                        <Button variant="primary" type="submit">{t("signInForm.buttonSubmit")}</Button>
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
