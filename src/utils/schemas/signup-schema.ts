import * as yup from 'yup';
import { Locale } from '@/locale/locale';
import { signInSchema } from './signin-schema';

export const signUpSchema = (t: Locale) => {
  return signInSchema(t).shape({
    confirmPassword: yup
      .string()
      .required(t.validation.confirmPassword.required)
      .oneOf([yup.ref('password'), ''], t.validation.confirmPassword.match),
  });
};
