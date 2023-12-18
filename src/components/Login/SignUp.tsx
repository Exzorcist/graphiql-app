import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

function SignUp() {
  const { i18nQL, lang } = useLocalizationContext();

  return (
    <SignForm
      questionForLink={i18nQL[lang].page.registration.questionForLink}
      textForLink={i18nQL[lang].page.registration.textForLink}
      title={i18nQL[lang].page.registration.article}
      buttonValue={i18nQL[lang].page.registration.text}
      path="/login"
      isLogin
      functionForUserWithEmailAndPassword={createUserWithEmailAndPassword}
    />
  );
}
export default SignUp;
