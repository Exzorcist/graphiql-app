import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/types/Form';

const initialState: IUser = {
  email: '',
  id: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    removeUser(state) {
      return { ...state, ...initialState };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
