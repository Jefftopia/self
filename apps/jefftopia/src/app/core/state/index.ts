import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../interfaces';
import { menuReducer } from './menu/reducers';

export const REDUCERS: ActionReducerMap<AppState> = {
    menu: menuReducer
}

export const DEFAULT_STATE: AppState = {
    menu: { isMobileNavVisible: false }
};
