import * as yup from 'yup';
import { Localization } from '@/types/Provider';
import { signInSchema } from './signin-schema';

export const signUpSchema = (t: Localization) => {
  return signInSchema(t).shape({
    confirmPassword: yup
      .string()
      .required(t.validation.confirmPassword.required)
      .oneOf([yup.ref('password'), ''], t.validation.confirmPassword.match),
  });
};
