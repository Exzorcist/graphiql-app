import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Language } from '@/types/Provider';

const localizationSlice = createSlice({
  name: 'localization',
  initialState: 'eng' as Language,
  reducers: {
    setLocalization(_, action: PayloadAction<Language>) {
      return action.payload;
    },
  },
  selectors: {
    selectLocalization: (state) => state,
  },
});

export const { setLocalization } = localizationSlice.actions;
export const { selectLocalization } = localizationSlice.selectors;

export default localizationSlice.reducer;
