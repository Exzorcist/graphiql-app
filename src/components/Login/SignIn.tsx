import { signInWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';

function SignIn() {
  return (
    <div className="h-screen flex items-center justify-center">
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
