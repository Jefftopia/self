import { Action } from '@ngrx/store';
import { ActionTypes } from './actions';
import { MenuState } from '../../interfaces';

// can have an update function here
// export function updateSelection(state: Selection, newData: ISelectionData): Selection {
//     return new Selection({ ...state.data, ...newData });
// }

export const initialState = { isMobileNavVisible: false };

export function menuReducer(state = initialState, action: Action): MenuState {
  switch (action.type) {
    case ActionTypes.Show:
      return { isMobileNavVisible: true };

    case ActionTypes.Hide:
      return { isMobileNavVisible: false };

    default:
      return state;
  }
}
