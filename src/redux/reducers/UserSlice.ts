import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/types/Form';

const initialState: IUser = {
  email: null,
  id: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuth = action.payload.isAuth;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
