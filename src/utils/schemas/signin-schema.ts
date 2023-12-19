import * as yup from 'yup';
import { Localization } from '@/types/Provider';

export const signInSchema = (t: Localization) => {
  return yup.object().shape({
    email: yup.string().email(t.validation.email.format).required(t.validation.email.required),

    password: yup
      .string()
      .required(t.validation.password.required)
      .matches(/\d/, t.validation.password.number)
      .matches(/[A-ZА-Я]/, t.validation.password.uppercase)
      .matches(/[a-zа-я]/, t.validation.password.lowercase)
      .matches(/[.:,;?!@#$%^&*_\-+=]/, t.validation.password.special)
      .min(8, t.validation.password.minlength),
  });
};
