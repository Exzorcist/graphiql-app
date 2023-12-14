import * as yup from 'yup';
import { ILocalizationProvider } from '@/types/Provider';

export const schema = ({ i18nQL, lang }: ILocalizationProvider) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(i18nQL[lang].validation.email.format)
      .required(i18nQL[lang].validation.email.required),

    password: yup
      .string()
      .required(i18nQL[lang].validation.password.required)
      .matches(/\d/, i18nQL[lang].validation.password.number)
      .matches(/[A-ZА-Я]/, i18nQL[lang].validation.password.uppercase)
      .matches(/[a-zа-я]/, i18nQL[lang].validation.password.lowercase)
      .matches(/[.:,;?!@#$%^&*_\-+=]/, i18nQL[lang].validation.password.special)
      .min(8, i18nQL[lang].validation.password.minlength),

    confirmPassword: yup
      .string()
      .required(i18nQL[lang].validation.confirmPassword.required)
      .oneOf([yup.ref('password'), ''], i18nQL[lang].validation.confirmPassword.match),
  });
};
