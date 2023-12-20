import { signOut, getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { removeUser } from '@/redux/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';

// {TODO: this function completes token's session in firebase app}
function SignOutUser() {
  const auth = getAuth();
  const result = signOut(auth);
  return result;
}

function TargetButton() {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const dispatch = useAppDispatch();
  const LogOutFunc = () => {
    SignOutUser();
    dispatch(removeUser());
  };
  if (!isAuth) {
    return (
      <button aria-label="button" type="button">
        Login
      </button>
    );
  }
  return (
    <NavLink to="login">
      <button aria-label="button" type="button" onClick={LogOutFunc}>
        Logout
      </button>
    </NavLink>
  );
}

export default TargetButton;
