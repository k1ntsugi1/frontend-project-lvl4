
import * as Yup from 'yup';

export const getSignUpSchema = (t) => {
    Yup.setLocale({
        mixed: {
            required: t("signUpForm.errorsValidating.required"),
        },
        string: {
            min: t("signUpForm.errorsValidating.short"),
            max: t("signUpForm.errorsValidating.long"),
        }
    });
 
    const signUpSchema= Yup.object().shape({
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().min(1).max(6).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], t("signUpForm.errorsValidating.confirmPassword"))
      })

    return signUpSchema;
}