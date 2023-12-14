import * as yup from 'yup';

export const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("email should be correct (use '@')")
      .required('This field is required'),
    password: yup
      .string()
      .required('This field is required')
      .min(8, 'minimum 8 symbols')
      .matches(
        /[.:,;?!@#$%^&*_\-+=]/,
        "The password must contain at least one special character ('.:,;?!@#$%^&*_-+=')!"
      )
      .matches(/[A-ZА-Я]/, 'The password must contain at least one Сapital letter!')
      .matches(/[a-zа-я]/, 'The password must contain at least one lowercase letter!')
      .matches(/\d/, 'The password must contain at least one number!'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  })
  .required();
