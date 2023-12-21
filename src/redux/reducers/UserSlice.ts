import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/types/Form';

const initialState: IUser = {
  email: '',
  id: '',
  token: '',
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
export const selectIsAuth = (state: { userReducer: IUser }) => state.userReducer.isAuth;

export default userSlice.reducer;
