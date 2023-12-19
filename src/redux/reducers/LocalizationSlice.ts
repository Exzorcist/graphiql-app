import { createSlice } from '@reduxjs/toolkit';
import { Language } from '@/types/Provider';

const LocalizationSlice = createSlice({
  name: 'localization',
  initialState: 'eng' as Language,
  reducers: {
    setLocalization(_, action) {
      return action.payload;
    },
  },
});

export const { setLocalization } = LocalizationSlice.actions;
export const selectLocalization = (state: { language: Language }) => state.language;

export default LocalizationSlice.reducer;
