
import * as Yup from 'yup';

export const getSignUpSchema = (t) => {
    Yup.setLocale({
        mixed: {
            required: t("signUpForm.errorsValidating.required"),
        },
    });
 
    const signUpSchema= Yup.object().shape({
        username: Yup
                  .string()
                  .min(3, t("signUpForm.errorsValidating.lengthName"))
                  .max(20, t("signUpForm.errorsValidating.lengthName"))
                  .required(),
        password: Yup
                  .string()
                  .min(6, t("signUpForm.errorsValidating.lengthPassword"))
                  .required(),
        confirmPassword: Yup
                         .string()
                         .oneOf([Yup.ref('password')], t("signUpForm.errorsValidating.confirmPassword"))
      })

    return signUpSchema;
}