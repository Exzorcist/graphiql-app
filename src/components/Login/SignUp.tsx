import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

function SignUp() {
  const { i18nQL, lang } = useLocalizationContext();

  return (
    <div className="flex items-center justify-center mt-20">
      <SignForm
        questionForLink={i18nQL[lang].page.registration.questionForLink}
        textForLink={i18nQL[lang].page.registration.textForLink}
        title={i18nQL[lang].page.registration.article}
        buttonValue={i18nQL[lang].page.registration.text}
        path="/login"
        isLogin
        functionForUserWithEmailAndPassword={createUserWithEmailAndPassword}
      />
    </div>
  );
}
export default SignUp;
