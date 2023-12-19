import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { InfoForm, Inputs } from '@/types/Form';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { setUser } from '@/redux/reducers/UserSlice';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { signUpSchema } from '@/utils/schemas/signup-schema';
import { signInSchema } from '@/utils/schemas/signin-schema';
import { cn } from '@/utils/cn';

function SignUpForm({
  questionForLink,
  textForLink,
  title,
  buttonValue,
  path,
  isLogin,
  functionForUserWithEmailAndPassword,
}: InfoForm) {
  const { t, lang } = useLocalizationContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({ isToggle: true });
  const doTogglePassword = () => {
    setShowPassword({ isToggle: !showPassword.isToggle });
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState({ isToggle: true });
  const doToggleConfirmPassword = () => {
    setShowConfirmPassword({ isToggle: !showConfirmPassword.isToggle });
  };

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
    trigger,
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isDirty },
  } = useForm<Inputs>({
    resolver: yupResolver(isLogin ? signUpSchema(t) : signInSchema(t)),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleRegister(email, password);
  };

  useEffect(() => {
    if (isDirty) {
      Object.keys(dirtyFields).forEach((field) => trigger(field as keyof Inputs));
    }
  }, [lang, dirtyFields, isDirty, trigger]);

  return (
    <section
      className="flex items-center justify-center h-full py-10 px-5 grow text-center"
      data-element="app-form"
    >
      <form
        className="w-full max-w-md overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
        aria-label="form"
      >
        <h1 className="mb-12 text-center text-2xl font-semibold text-main sm:text-center">
          {title}
        </h1>

        <div>
          <input
            className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={t.inputData.email}
            {...register('email', {
              onChange: (e) => {
                setEmail(e.currentTarget.value);
              },
            })}
            type="email"
            name="email"
            aria-label="emailIput"
          />
          <div className="h-10 text-sm">
            {errors.email && <span className="text-red-500"> {errors.email.message} </span>}
          </div>
        </div>

        <div className="relative">
          <input
            className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register('password', {
              onChange: (e) => {
                setPassword(e.currentTarget.value);
              },
            })}
            placeholder={t.inputData.password}
            type={showPassword.isToggle ? 'text' : 'password'}
            name="password"
            aria-label="passwordIput"
          />
          {showPassword.isToggle && (
            <button
              type="button"
              aria-label="buttonEye"
              className="absolute bottom-12 right-3"
              onClick={doTogglePassword}
            >
              <EyeIcon className="h-6 w-6 mx-1" />
            </button>
          )}
          {!showPassword.isToggle && (
            <button
              type="button"
              aria-label="buttonEyeSlash"
              className="absolute bottom-12 right-3"
              onClick={doTogglePassword}
            >
              <EyeSlashIcon className="h-6 w-6 mx-1" />
            </button>
          )}

          <div className="h-10 text-sm text-red-500">
            {errors.password && <span> {errors.password.message} </span>}
          </div>
        </div>

        {isLogin && (
          <div className="relative">
            <input
              className="bg-violet-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register('confirmPassword')}
              placeholder={t.inputData.confirmPassword}
              type={showConfirmPassword.isToggle ? 'text' : 'password'}
              name="confirmPassword"
              aria-label="confirmPasswordlIput"
            />
            {showConfirmPassword.isToggle && (
              <button
                type="button"
                aria-label="buttonEye"
                className="absolute bottom-10 right-3"
                onClick={doToggleConfirmPassword}
              >
                <EyeIcon className="h-6 w-6 mx-1" />
              </button>
            )}
            {!showConfirmPassword.isToggle && (
              <button
                type="button"
                aria-label="buttonEyeSlash"
                className="absolute bottom-10 right-3"
                onClick={doToggleConfirmPassword}
              >
                <EyeSlashIcon className="h-6 w-6 mx-1" />
              </button>
            )}
            <div className="h-8 text-sm text-red-500">
              {errors.confirmPassword && <span> {errors.confirmPassword.message} </span>}
            </div>
          </div>
        )}

        <div className="mb-5">
          <span className="text-sm">
            {questionForLink}
            <Link to={path} className={cn('text-sm underline', isError && 'text-red-400')}>
              {textForLink}
            </Link>
          </span>
        </div>
        <button
          type="submit"
          aria-label="buttonLink"
          disabled={!isValid}
          className="focus:outline-none disabled:bg-slate-300text-white bg-main hover:bg-main/80 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-white"
        >
          {buttonValue}
        </button>

        <div
          className={cn(
            'text-sm translate-x-96 ml-5',
            isError && 'transition delay-150 duration-500 ease-in-out translate-x-0 bg-red-500'
          )}
        >
          {' '}
          {t.errors.error} <span className="underline">{textForLink}</span>{' '}
        </div>
      </form>
    </section>
  );
}

export default SignUpForm;
