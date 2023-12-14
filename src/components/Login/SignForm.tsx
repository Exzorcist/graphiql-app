import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { InfoForm, Inputs } from '@/types/Form';
import { schema } from '@/utils/schemas/schema';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { setUser } from '@/redux/reducers/UserSlice';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

function SignUpForm({
  questionForLink,
  textForLink,
  title,
  buttonValue,
  path,
  functionForUserWithEmailAndPassword,
}: InfoForm) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(emailUser: string, passwordUser: string) {
    const auth = getAuth();
    functionForUserWithEmailAndPassword(auth, emailUser, passwordUser)
      .then(({ user }) => {
        setIsError(false);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            isAuth: true,
          })
        );
        navigate('/');
      })
      .catch(() => {
        setIsError(true);
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema(useLocalizationContext())),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleRegister(email, password);
  };

  return (
    <div>
      <section id="content" className="flex w-auto text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-5 text-center text-2xl font-semibold text-[#d60590]">{title}</h1>
          <div className="w-96">
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email"
              {...register('email')}
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <div className="h-10 text-sm">
              {errors.email && <span className="text-red-500"> {errors.email.message} </span>}
            </div>
          </div>
          <div className="w-96">
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('password')}
              placeholder="password"
              name="password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <div className="h-10 text-sm text-red-500">
              {errors.password && <span> {errors.password.message} </span>}
            </div>
          </div>
          <div className="w-96">
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('confirmPassword')}
              placeholder="confirm your password"
              name="confirmPassword"
            />
            <div className="h-8 text-sm text-red-500">
              {errors.confirmPassword && <span> {errors.confirmPassword.message} </span>}
            </div>
          </div>
          <div className="mb-5">
            <span className="text-sm">
              {questionForLink}
              <Link to={path} className={clsx('text-sm underline', isError && 'text-red-400')}>
                {textForLink}
              </Link>
            </span>
          </div>
          <input
            type="submit"
            disabled={!isValid}
            value={buttonValue}
            className="focus:outline-none disabled:bg-slate-300 text-white bg-[#d60590]  hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          />
        </form>
      </section>
    </div>
  );
}
export default SignUpForm;
