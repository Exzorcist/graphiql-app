import { AppDispatch, RootState } from '@/redux/store';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils/type-guards';
import { setMessage } from '../globalMessageSlice';
import { getFetchErrorMsg } from './utils';

export const handleFetchErrorThunk =
  (error: unknown) => (dispatch: AppDispatch, getState: () => RootState) => {
    if (isFetchBaseQueryError(error)) {
      dispatch(
        setMessage({
          type: 'error',
          isShown: true,
          text: getFetchErrorMsg(error, getState().localization),
        })
      );
    } else if (isErrorWithMessage(error)) {
      dispatch(setMessage({ type: 'error', isShown: true, text: error.message }));
    }
  };
