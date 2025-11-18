import { MenuItem } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}

const initialState: MenuState = {
  menu: [],
  firstCategory: TopLevelCategory.Courses,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuAC: (state, action: { payload: { menu: MenuItem[] } }) => {
      state.menu = action.payload.menu;
    },
    removeMenuAC: (state) => {
      state.menu = [];
    },
  },
});

export const { setMenuAC, removeMenuAC } = menuSlice.actions;
export default menuSlice.reducer;
