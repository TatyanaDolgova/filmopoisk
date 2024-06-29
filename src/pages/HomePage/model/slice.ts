import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/providers/StoreProvider/store';

export interface FilterState {
  title: string;
  genre: string;
  year: string;
  page: number;
}

const initialState: FilterState = {
  title: '',
  genre: '',
  year: '',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    setYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setGenre, setYear, setPage } = filterSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filterSlice.reducer;
