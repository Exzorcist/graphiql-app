import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/firebase';
import { removeUser } from '@/redux/reducers/UserSlice';

function Unsubscribe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        await user.getIdToken();
      } else {
        console.log('время вашего токена истекло');
        dispatch(removeUser());
        navigate('/welcome');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate, dispatch]);
  return <div />;
}

export default Unsubscribe;
