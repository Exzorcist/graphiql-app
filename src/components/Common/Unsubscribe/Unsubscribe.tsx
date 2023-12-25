import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';

import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { setMessage } from '@/redux/slices/globalMessageSlice';
import { removeUser, selectIsAuth } from '@/redux/slices/userSlice';

function Unsubscribe() {
  const { t } = useLocalizationContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsAuth);

  const tokenExpireMessage = useMemo(
    () => ({
      type: 'info',
      text: t.globalMessage.info.tokenExpire,
      isShown: true,
    }),
    [t.globalMessage.info.tokenExpire]
  );

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        await user.getIdToken();
      } else if (isLogin) {
        dispatch(setMessage(tokenExpireMessage));
        dispatch(removeUser());
        navigate('/welcome');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, tokenExpireMessage, isLogin, navigate]);
  return <div />;
}

export default Unsubscribe;
