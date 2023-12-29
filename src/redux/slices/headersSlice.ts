import { createSlice } from '@reduxjs/toolkit';

type IHeaderValue = {
  header: string;
  value: string;
};

type IHeader = {
  headerValue: IHeaderValue;
  isHeader: boolean;
};

const initialState: IHeader = {
  headerValue: { header: '', value: '' },
  isHeader: false,
};

const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeader(state, action) {
      return {
        ...state,
        headerValue: {
          ...state.headerValue,
          header: action.payload,
        },
      };
    },
    setValue(state, action) {
      return {
        ...state,
        headerValue: {
          ...state.headerValue,
          value: action.payload,
        },
      };
    },
    removeHeadersValue(state, action) {
      return {
        ...state,
        headerValue: {
          ...state.headerValue,
          ...action.payload,
        },
      };
    },
    setHeaderOpen(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setHeader, setValue, removeHeadersValue, setHeaderOpen } = headersSlice.actions;

export default headersSlice.reducer;
