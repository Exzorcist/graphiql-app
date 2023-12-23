import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/firebase';

import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { setMessage } from '@/redux/reducers/GlobalMessageSlice';
import { removeUser, selectIsAuth } from '@/redux/reducers/UserSlice';
// import { IGlobalMessage } from '@/types/Message';

function Unsubscribe() {
  const { t } = useLocalizationContext();
  const dispatch = useDispatch();
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
      } else {
        if (isLogin) {
          dispatch(setMessage(tokenExpireMessage));
        }

        dispatch(removeUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, tokenExpireMessage]);
  return <div />;
}

export default Unsubscribe;
