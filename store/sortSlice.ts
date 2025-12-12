import { createSlice } from '@reduxjs/toolkit';

export enum SortEnum {
  Rating = 'Rating',
  Price = 'Price',
}

interface SortState {
  sort: SortEnum;
}

const initialState: SortState = {
  sort: SortEnum.Rating,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortAC: (state, action: { payload: { sort: SortEnum } }) => {
      state.sort = action.payload.sort;
    },
  },
});

export const { setSortAC } = sortSlice.actions;
export default sortSlice.reducer;
