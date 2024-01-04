import * as yup from 'yup';
import { Locale } from '@/locale/locale';

export const signInSchema = (t: Locale) => {
  return yup.object().shape({
    email: yup.string().email(t.validation.email.format).required(t.validation.email.required),

    password: yup
      .string()
      .required(t.validation.password.required)
      .matches(/(?=\p{N})/gu, t.validation.password.number)
      .matches(/(?=\p{Lu})/gu, t.validation.password.uppercase)
      .matches(/(?=\p{Ll})/gu, t.validation.password.lowercase)
      .matches(/(?=[\p{S}\p{P}])/gu, t.validation.password.special)
      .min(8, t.validation.password.minlength),
  });
};
