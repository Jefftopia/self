import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, MenuState } from '../../interfaces';

// https://ngrx.io/guide/store/selectors
export const selectMenu = (state: AppState) => state.menu;

export const selectMenuVisible = createSelector(
  selectMenu,
  (state: MenuState) => state.isMobileNavVisible
);
