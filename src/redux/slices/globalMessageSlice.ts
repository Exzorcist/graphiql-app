import { createSlice } from '@reduxjs/toolkit';
import { IGlobalMessage } from '@/types/Message';

const initialState: IGlobalMessage = {
  type: 'info',
  text: '',
  isShown: false,
};

const globalMessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { ...state, ...action.payload };
    },
    hideMessage(state) {
      return { ...state, ...{ isShown: false } };
    },
  },
});

export const { setMessage, hideMessage } = globalMessageSlice.actions;
export const selectMessage = (state: { message: IGlobalMessage }) => state.message;

export default globalMessageSlice.reducer;
