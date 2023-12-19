import { signInWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function SignIn() {
  const { t } = useLocalizationContext();

  return (
    <SignForm
      questionForLink={t.page.login.questionForLink}
      textForLink={t.page.login.textForLink}
      title={t.page.login.article}
      buttonValue={t.page.login.text}
      path="/registration"
      isLogin={false}
      functionForUserWithEmailAndPassword={signInWithEmailAndPassword}
    />
  );
}
export default SignIn;
