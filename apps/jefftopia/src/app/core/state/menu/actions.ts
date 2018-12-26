import { Action } from '@ngrx/store';

export enum ActionTypes {
    Show = 'NAV_MENU_SHOW',
    Hide = 'NAV_MENU_HIDE',
}

export class Show implements Action {
    readonly type = ActionTypes.Show;
}

export class Hide implements Action {
    readonly type = ActionTypes.Hide;
}
