
import * as Yup from 'yup';

export const getSignInSchema = (t) => {
    Yup.setLocale({
        mixed: {
            required: t("signInForm.errorsValidating.required"),
        },
        string: {
            min: t("signInForm.errorsValidating.short"),
            max: t("signInForm.errorsValidating.long"),
        }
    });
 
    const signInSchema= Yup.object().shape({
      username: Yup.string().min(3).max(20).required(),
      password: Yup.string().min(1).max(6).required(),
    })

    return signInSchema;
}