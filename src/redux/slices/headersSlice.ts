import { createSlice } from '@reduxjs/toolkit';

const headersSlice = createSlice({
  name: 'headers',
  initialState: {} as { [key: string]: string },
  reducers: {
    setReduxHeaders(_, action) {
      return action.payload;
    },
  },
});

export const { setReduxHeaders } = headersSlice.actions;
export const selectHeaders = (state: { headers: { [key: string]: string } }) => state.headers;

export default headersSlice.reducer;
