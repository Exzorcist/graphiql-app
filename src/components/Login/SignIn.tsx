import { signInWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';

function SignIn() {
  return (
    <div className="flex items-center justify-center align-center mt-20">
      <SignForm
        questionForLink="Don`t have an account? 👉"
        textForLink="Create an account"
        title="SignIn"
        buttonValue="Login"
        path="/registration"
        functionForUserWithEmailAndPassword={signInWithEmailAndPassword}
      />
    </div>
  );
}
export default SignIn;
