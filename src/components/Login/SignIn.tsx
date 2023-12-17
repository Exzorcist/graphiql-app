import { signInWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

function SignIn() {
  const { i18nQL, lang } = useLocalizationContext();

  return (
    <div className="flex items-center justify-center align-center mt-20">
      <SignForm
        questionForLink={i18nQL[lang].page.login.questionForLink}
        textForLink={i18nQL[lang].page.login.textForLink}
        title={i18nQL[lang].page.login.article}
        buttonValue={i18nQL[lang].page.login.text}
        path="/registration"
        isLogin={false}
        functionForUserWithEmailAndPassword={signInWithEmailAndPassword}
      />
    </div>
  );
}
export default SignIn;
