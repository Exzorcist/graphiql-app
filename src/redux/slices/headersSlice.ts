import { createSlice } from '@reduxjs/toolkit';

type IHeaderValue = {
  header: string;
  value: string;
};

type IHeader = {
  headerValue: IHeaderValue;
  headers: { [key: string]: string };
};

const initialState: IHeader = {
  headerValue: { header: '', value: '' },
  headers: {},
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
    setHeadersObj(state, action) {
      return {
        ...state,
        headers: {
          ...state.headers,
          ...action.payload,
        },
      };
    },
    setClearHeaders(state, action) {
      return {
        ...state,
        headers: {
          ...action.payload,
        },
      };
    },
    updateHeadersObj(state, action) {
      return {
        ...state,
        headers: {
          ...action.payload,
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
  },
});

export const {
  setHeader,
  setValue,
  removeHeadersValue,
  setHeadersObj,
  setClearHeaders,
  updateHeadersObj,
} = headersSlice.actions;

export default headersSlice.reducer;
