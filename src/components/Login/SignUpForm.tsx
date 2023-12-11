/* eslint-disable import/no-extraneous-dependencies */
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Inputs } from '@/types/types';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("email should be correct (use '@')")
      .required('This field is required'),
    password1: yup
      .string()
      .required('This field is required')
      .matches(
        /[.:,;?!@#$%^&*_\-+=]/,
        "The password must contain at least one special character ('.:,;?!@#$%^&*_-+=')!"
      )
      .matches(/[A-Z]/, 'The password must contain at least one Latin capital (A-Z) letter!')
      .matches(/[a-z]/, 'The password must contain at least one Latin lowercase (a-z) letter!')
      .matches(/\d/, 'The password must contain at least one number!'),
    password2: yup
      .string()
      .required('This field is required')
      .matches(
        /[.:,;?!@#$%^&*_\-+=]/,
        "The password must contain at least one special character ('.:,;?!@#$%^&*_-+=')!"
      )
      .matches(/[A-Z]/, 'The password must contain at least one Latin capital (A-Z) letter!')
      .matches(/[a-z]/, 'The password must contain at least one Latin lowercase (a-z) letter!')
      .matches(/\d/, 'The password must contain at least one number!')
      .oneOf([yup.ref('password1')], 'Passwords are mismatched'),
  })
  .required();

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    console.log('submit done');
  };

  return (
    <div>
      <section id="content" className="flex w-auto text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-5 text-center text-2xl font-semibold text-violet-800">SignUp</h1>
          <div className="w-96">
            <label htmlFor="useremail" />
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              {...register('email')}
              type="email"
              id="useremail"
              name="email"
            />
            <div className="h-10 text-sm">
              {errors.email && <span className="text-red-500"> {errors.email.message} </span>}
            </div>
          </div>
          <div className="w-96">
            <label htmlFor="password1" />
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('password1')}
              placeholder="password"
              id="password1"
              name="password1"
              onChange={() => {
                console.log('password 1 changed');
              }}
            />
            <div className="h-10 text-sm text-red-500">
              {errors.password1 && <span> {errors.password1.message} </span>}
            </div>
          </div>
          <div className="w-96">
            <label htmlFor="password2" />
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('password2')}
              id="password2"
              placeholder="confirm your password"
              name="password2"
              onChange={() => {
                console.log('password 2 changed');
              }}
            />
            <div className="h-8 text-sm text-red-500">
              {errors.password2 && <span> {errors.password2.message} </span>}
            </div>
          </div>
          <div className="mb-5">
            <span className="text-sm">
              {' '}
              Do you have an account? 👉{' '}
              <a href="/signin" className="text-sm underline">
                {' '}
                Sign In{' '}
              </a>
            </span>
          </div>
          <input
            type="submit"
            disabled={!isValid}
            value="create an account"
            className="focus:outline-none text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          />
        </form>
      </section>
    </div>
  );
}
export default SignUpForm;
