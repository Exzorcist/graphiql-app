import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function SignUp() {
  const { t } = useLocalizationContext();

  return (
    <SignForm
      textForLink={t.page.registration.textForLink}
      title={t.page.registration.article}
      buttonValue={t.page.registration.text}
      path="/login"
      isLogin
      functionForUserWithEmailAndPassword={createUserWithEmailAndPassword}
    />
  );
}
export default SignUp;
