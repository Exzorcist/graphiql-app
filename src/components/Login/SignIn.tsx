import { signInWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

function SignIn() {
  const { i18nQL, lang } = useLocalizationContext();

  return (
    <SignForm
      questionForLink={i18nQL[lang].page.login.questionForLink}
      textForLink={i18nQL[lang].page.login.textForLink}
      title={i18nQL[lang].page.login.article}
      buttonValue={i18nQL[lang].page.login.text}
      path="/registration"
      isLogin={false}
      functionForUserWithEmailAndPassword={signInWithEmailAndPassword}
    />
  );
}
export default SignIn;
