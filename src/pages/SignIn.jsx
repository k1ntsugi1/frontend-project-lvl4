
import React, { useContext  } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const t = useContext(LangContext);
console.log(t.t);

Yup.setLocale({
    mixed: {
        required: t.signInForm.errorsValidating.required,
    },
    string: {
        min: t("signInForm.errorsValidating.short"),
        max: t("signInForm.errorsValidating.long"),
    }
})

const SignInSchema= Yup.object().shape({
    name: Yup.string().min(2).max(10).required(),
    password: Yup.string().min(2).max(10).required(),
})

export const SignIn = () => {

    return (
        <div>
            <h1>{ t("signInForm.header") }</h1>
            <Formik
                initialValues={{userName: "", password: ""}}
                validationSchema={ SignInSchema }
                onSubmit={ values = () => console.log(values) }
            >
                {({errors, touched}) => (
                    <Form>
                        <Field name="userName"/>
                        { errors.userName && touched.userName ? <div>Error in Name</div> : null}
                        <Field name="password"/>
                        { errors.password && touched.password ? <div>Error in password</div> : null }
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
} 