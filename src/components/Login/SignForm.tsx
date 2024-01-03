import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { InfoForm, Inputs } from '@/types/Form';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { setUser } from '@/redux/slices/userSlice';
import { setMessage } from '@/redux/slices/globalMessageSlice';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { signUpSchema } from '@/utils/schemas/signup-schema';
import { signInSchema } from '@/utils/schemas/signin-schema';
import { cn } from '@/utils/cn';
import { IGlobalMessage } from '@/types/Message';

function SignUpForm({
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
    const loginSuccessMessage: IGlobalMessage = {
      type: 'success',
      text: t.globalMessage.success.login,
      isShown: true,
    };
    const loginErrorMessage: IGlobalMessage = {
      type: 'error',
      text: !isLogin ? t.globalMessage.error.login : t.globalMessage.error.registration,
      isShown: true,
    };

    functionForUserWithEmailAndPassword(auth, emailUser, passwordUser)
      .then(({ user }) => {
        setIsError(false);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            isAuth: true,
          })
        );
        navigate('/');
        dispatch(setMessage(loginSuccessMessage));
      })
      .catch(() => {
        setIsError(true);
        dispatch(setMessage(loginErrorMessage));
        setIsError(false);
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
        <h1 className="mb-12 text-center text-4xl font-semibold text-main sm:text-center">
          {title}
        </h1>

        <div className="grid gap-8">
          <div className="relative">
            <input
              className={cn(
                `bg-violet-50 border border-gray-300 text-gray-900 rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0`,
                errors.email && 'border-red-500 focus:border-red-500 outline-red-500'
              )}
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

            {errors.email && (
              <span className="text-red-500 text-sm absolute left-1 -bottom-0.5 translate-y-full">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              className={cn(
                `bg-violet-50 border border-gray-300 text-gray-900 rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0`,
                errors.password && 'border-red-500 focus:border-red-500 outline-red-500'
              )}
              {...register('password', {
                onChange: (e) => {
                  setPassword(e.currentTarget.value);
                },
              })}
              placeholder={t.inputData.password}
              type={!showPassword.isToggle ? 'text' : 'password'}
              name="password"
              aria-label="passwordIput"
            />

            <button
              type="button"
              aria-label="buttonEye"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={doTogglePassword}
            >
              {showPassword.isToggle ? (
                <EyeIcon className="h-6 w-6 mx-1" />
              ) : (
                <EyeSlashIcon className="h-6 w-6 mx-1" />
              )}
            </button>

            {errors.password && (
              <span className="text-red-500 text-sm absolute left-1 -bottom-0.5 translate-y-full">
                {errors.password.message}
              </span>
            )}
          </div>

          {isLogin && (
            <div className="relative">
              <input
                className={cn(
                  `bg-violet-50 border border-gray-300 text-gray-900 rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0`,
                  errors.confirmPassword && 'border-red-500 focus:border-red-500 outline-red-500'
                )}
                {...register('confirmPassword')}
                placeholder={t.inputData.confirmPassword}
                type={!showConfirmPassword.isToggle ? 'text' : 'password'}
                name="confirmPassword"
                aria-label="confirmPasswordlIput"
              />

              <button
                type="button"
                aria-label="buttonEye"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={doToggleConfirmPassword}
              >
                {showConfirmPassword.isToggle ? (
                  <EyeIcon className="h-6 w-6 mx-1" />
                ) : (
                  <EyeSlashIcon className="h-6 w-6 mx-1" />
                )}
              </button>

              {errors.confirmPassword && (
                <span className="text-red-500 text-sm absolute left-1 -bottom-0.5 translate-y-full">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}
        </div>

        <div data-element="button-wrapper" className="mt-10 flex flex-col gap-4 items-center">
          <button
            type="submit"
            aria-label="buttonLink"
            disabled={!isValid}
            className={cn(
              `focus:outline-none disabled:bg-slate-300text-white bg-main hover:bg-main/80
              focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-lg px-7 py-1.5 text-white
              transition-all duration-300 cursor-pointer w-full max-w-80`,
              !isValid && 'opacity-50 pointer-events-none'
            )}
          >
            {buttonValue}
          </button>

          <Link
            to={path}
            className={cn(
              'underline underline-offset-2 transition-opacity duration-300 hover:opacity-75',
              isError && 'text-red-400'
            )}
          >
            {textForLink}
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignUpForm;
