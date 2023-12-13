import { createUserWithEmailAndPassword } from 'firebase/auth';
import SignForm from './SignForm';

function SignUp() {
  return (
    <div className="flex items-center justify-center mt-20">
      <SignForm
        questionForLink="Do you have an account? 👉"
        textForLink="Sign In"
        title="SignUp"
        buttonValue="Create an account"
        path="/login"
        functionForUserWithEmailAndPassword={createUserWithEmailAndPassword}
      />
    </div>
  );
}
export default SignUp;
