import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface FiltersState {
  search: string;
  country: string;
  page: number;
  pageSize: number;
}

const initialState: FiltersState = {
  search: '',
  country: 'all',
  page: 1,
  pageSize: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1; // reset page
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
});

export const { setSearch, setCountry, setPage, setPageSize } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
