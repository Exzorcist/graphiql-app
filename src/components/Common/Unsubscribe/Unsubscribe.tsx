import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '@/firebase';
import { removeUser } from '@/redux/reducers/UserSlice';

function Unsubscribe() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        await user.getIdToken();
      } else {
        console.log('время вашего токена истекло');
        removeUser();
        navigate('/welcome');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);
  return <div />;
}

export default Unsubscribe;
