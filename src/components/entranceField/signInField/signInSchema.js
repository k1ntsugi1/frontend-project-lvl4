
import * as Yup from 'yup';

export const getSignInSchema = (t) => {
    Yup.setLocale({
        mixed: {
            required: t("signInForm.errorsValidating.required"),
        },
    });
 
    const signInSchema= Yup.object().shape({
      username: Yup
                .string()
                .min(3, t("signInForm.errorsValidating.lengthName"))
                .max(20, t("signInForm.errorsValidating.lengthName"))
                .required(),
      password: Yup
                .string()
                .min(1, t("signInForm.errorsValidating.lengthPassword"))
                .required(),
    })

    return signInSchema;
}